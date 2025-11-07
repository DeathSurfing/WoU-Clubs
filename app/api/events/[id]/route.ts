import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import redis from "@/lib/redis"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params // ✅ await the params

  const cacheKey = `event:${id}`

  try {
    // 1️⃣ Try Redis cache first
    try {
      const cached = await redis.get(cacheKey)
      if (cached) {
        return NextResponse.json(JSON.parse(cached), {
          headers: { "X-Cache": "HIT" },
        })
      }
    } catch (redisError) {
      console.warn("⚠️ Redis unavailable — skipping cache:", redisError)
    }

    // 2️⃣ Fetch from MongoDB
    const client = await clientPromise
    const db = client.db("woxsen")

    const projection = {
      _id: 0,
      id: 1,
      title: 1,
      description: 1,
      image: 1,
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
    }

    const event = await db.collection("events").findOne({ id }, { projection })

    if (!event) {
      console.warn(`❌ Event not found: ${id}`)
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // ✅ Inject image CDN path
    event.image = event.id ? `/api/images/events/${event.id}` : null

    // 3️⃣ Cache result for 10 minutes
    redis
      .setex(cacheKey, 600, JSON.stringify(event))
      .catch((err) => console.warn("⚠️ Redis cache set failed:", err))

    return NextResponse.json(event, { headers: { "X-Cache": "MISS" } })
  } catch (error) {
    console.error(`💥 [API ERROR] Event fetch failed for ${id}:`, error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
