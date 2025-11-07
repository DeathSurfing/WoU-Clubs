import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import redis from "@/lib/redis";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!slug)
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });

    const cacheKey = `club:${slug.toLowerCase()}`;

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

    const club = await db.collection("clubs").findOne(
      { id: slug.toLowerCase() },
      {
        projection: {
          _id: 0,
          id: 1,
          name: 1,
          category: 1,
          description: 1,
          shortDescription: 1,
          logo: 1,
          image: 1,
          coverImage: 1,
          socials: 1,
          members: 1,
          email: 1,
          joinUrl: 1,
          location: 1,
          updatedAt: 1,
          createdAt: 1,
        },
      }
    );

    if (!club)
      return NextResponse.json({ error: "Club not found" }, { status: 404 });

    // 3️⃣ Cache for 15 minutes (900 s)
    await redis.setex(cacheKey, 900, JSON.stringify(club));

    return NextResponse.json(club, {
      headers: { "X-Cache": "MISS" },
    });
  } catch (err) {
    console.error("❌ [API] Club fetch error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
