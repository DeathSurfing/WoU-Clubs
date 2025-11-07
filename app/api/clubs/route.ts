import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import redis from "@/lib/redis";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const client = await clientPromise;
    const db = client.db("woxsen");

    // Normalize category key
    const normalizedCategory = category?.toLowerCase() || "all";
    const cacheKey = `clubs:${normalizedCategory}`;

    // 1️⃣ Try Redis cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json(JSON.parse(cached), {
        headers: { "X-Cache": "HIT" },
      });
    }

    // 2️⃣ Fallback → MongoDB
    const query = category ? { category: normalizedCategory } : {};

    const clubs = await db
      .collection("clubs")
      .find(query)
      .project({
        _id: 0,
        id: 1,
        name: 1,
        category: 1,
        logo: 1,
        image: 1,
        coverImage: 1,
        description: 1,
        shortDescription: 1,
        email: 1,
        memberCount: 1,
        location: 1,
        joinUrl: 1,
        updatedAt: 1,
        createdAt: 1,
      })
      .sort({ name: 1 })
      .toArray();

    // 3️⃣ Cache in Redis for 15 minutes
    await redis.setex(cacheKey, 900, JSON.stringify(clubs));

    return NextResponse.json(clubs, {
      headers: { "X-Cache": "MISS" },
    });
  } catch (error) {
    console.error("❌ Error fetching clubs:", error);
    return NextResponse.json(
      { error: "Error fetching clubs" },
      { status: 500 }
    );
  }
}
