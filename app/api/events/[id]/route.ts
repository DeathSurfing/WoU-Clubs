import clientPromise from "@/lib/mongodb";
import redis from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("📥 [API] Fetch event by id:", id);

    const cacheKey = `event:${id}`;

    // 1️⃣ Try Redis cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json(JSON.parse(cached), {
        headers: { "X-Cache": "HIT" },
      });
    }

    // 2️⃣ Fallback → MongoDB
    const client = await clientPromise;
    const db = client.db("woxsen");

    const event = await db.collection("events").findOne(
      { id },
      {
        projection: {
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
        },
      }
    );

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // 3️⃣ Store in Redis for 10 minutes (600s)
    await redis.setex(cacheKey, 600, JSON.stringify(event));

    return NextResponse.json(event, {
      headers: { "X-Cache": "MISS" },
    });
  } catch (error) {
    console.error("❌ API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
