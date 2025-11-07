import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import redis from "@/lib/redis"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const relatedTo = searchParams.get("relatedTo")

    const cacheKey = relatedTo ? `events:related:${relatedTo}` : `events:latest`

    // 1️⃣ Try Redis cache
    const cached = await redis.get(cacheKey)
    if (cached) {
      return NextResponse.json(JSON.parse(cached), {
        headers: { "X-Cache": "HIT" },
      })
    }

    // 2️⃣ MongoDB query
    const client = await clientPromise
    const db = client.db("woxsen")
    const eventsCol = db.collection("events")

    // ⚡ Minimal projection (skip heavy base64 fields)
    const projection = {
      _id: 0,
      id: 1,
      title: 1,
      description: 1,
      startDate: 1,
      startTime: 1,
      endDate: 1,
      endTime: 1,
      location: 1,
      category: 1,
      clubId: 1,
      registerUrl: 1,
      isFeatured: 1,
      createdAt: 1,
      updatedAt: 1,
      // ❌ image excluded to avoid fetching base64
    }

    let results

    if (relatedTo) {
      // 🔹 Find related events
      const baseEvent = await eventsCol.findOne(
        { id: relatedTo },
        { projection: { id: 1, clubId: 1, category: 1 } }
      )

      if (!baseEvent)
        return NextResponse.json([], { headers: { "X-Cache": "MISS" } })

      results = await eventsCol
        .find(
          {
            id: { $ne: relatedTo },
            $or: [
              { clubId: baseEvent.clubId },
              { category: baseEvent.category },
            ],
          },
          { projection }
        )
        .limit(8)
        .toArray()
    } else {
      // 🔹 Latest events
      results = await eventsCol
        .find({}, { projection })
        .sort({ startDate: -1, startTime: 1 })
        .limit(20)
        .toArray()
    }

    // 3️⃣ Inject prebuilt CDN URLs (no need to fetch images)
    const transformed = results.map((event) => ({
      ...event,
      image: `/api/images/events/${event.id}`,
    }))

    // 4️⃣ Cache in Redis for 10 minutes
    await redis.setex(cacheKey, 600, JSON.stringify(transformed))

    return NextResponse.json(transformed, {
      headers: { "X-Cache": "MISS" },
    })
  } catch (error) {
    console.error("❌ Error fetching events:", error)
    return NextResponse.json(
      { error: "Error fetching events" },
      { status: 500 }
    )
  }
}
