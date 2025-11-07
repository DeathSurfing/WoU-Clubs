import clientPromise from "@/lib/mongodb";
import redis from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const relatedTo = searchParams.get("relatedTo");

    const client = await clientPromise;
    const db = client.db("woxsen");
    const eventsCol = db.collection("events");

    // Common projection (lean fields only)
    const fullProjection = {
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
    };

    // 🧠 Generate cache key
    const cacheKey = relatedTo
      ? `events:related:${relatedTo}`
      : `events:latest`;

    // 1️⃣ Try Redis cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json(JSON.parse(cached), {
        headers: { "X-Cache": "HIT" },
      });
    }

    // 2️⃣ Fetch from MongoDB
    if (relatedTo) {
      const baseEvent = await eventsCol.findOne(
        { id: relatedTo },
        { projection: { _id: 0, id: 1, clubId: 1, category: 1 } }
      );

      if (!baseEvent)
        return NextResponse.json([], { headers: { "X-Cache": "MISS" } });

      const relatedEvents = await eventsCol
        .find(
          {
            id: { $ne: relatedTo },
            $or: [
              { clubId: baseEvent.clubId },
              { category: baseEvent.category },
            ],
          },
          { projection: fullProjection }
        )
        .limit(8)
        .toArray();

      // 3️⃣ Store in Redis for 10 minutes
      await redis.setex(cacheKey, 600, JSON.stringify(relatedEvents));

      return NextResponse.json(relatedEvents, {
        headers: { "X-Cache": "MISS" },
      });
    }

    // Default: latest events list
    const events = await eventsCol
      .find({}, { projection: fullProjection })
      .sort({ startDate: -1, startTime: 1 })
      .limit(20)
      .toArray();

    await redis.setex(cacheKey, 600, JSON.stringify(events));

    return NextResponse.json(events, { headers: { "X-Cache": "MISS" } });
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    return NextResponse.json(
      { error: "Error fetching events" },
      { status: 500 }
    );
  }
}
