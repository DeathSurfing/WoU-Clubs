import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import redis from "@/lib/redis"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")

    // Normalize category
    const normalizedCategory = category?.toLowerCase() || "all"
    const cacheKey = `clubs:${normalizedCategory}`


    // 1️⃣ Try Redis cache first
    try {
      const cached = await redis.get(cacheKey)
      if (cached) {
        return NextResponse.json(JSON.parse(cached), {
          headers: { "X-Cache": "HIT" },
        })
      }
    } catch (err) {
      console.warn("⚠️ Redis unavailable — skipping cache:", err)
    }

    // 2️⃣ Fetch from MongoDB
    const client = await clientPromise
    const db = client.db("woxsen")

    const query = category ? { category: normalizedCategory } : {}

    const projection = {
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
    }

    const clubs = await db
      .collection("clubs")
      .find(query, { projection })
      .sort({ name: 1 })
      .toArray()

    // 3️⃣ Inject CDN-style image URLs
    const transformed = clubs.map((club) => ({
      ...club,
      logo: club.id ? `/api/images/clubs/${club.id}` : null,
      image: club.id ? `/api/images/clubs/${club.id}` : null,
      coverImage: club.id ? `/api/images/clubs/${club.id}` : null,
    }))

    // 4️⃣ Cache in Redis (non-blocking)
    redis
      .setex(cacheKey, 900, JSON.stringify(transformed))
      .catch((err) => console.warn("⚠️ Redis cache set failed:", err))


    return NextResponse.json(transformed, {
      headers: { "X-Cache": "MISS" },
    })
  } catch (error) {
    console.error("💥 [API ERROR] Fetching clubs failed:", error)
    return NextResponse.json(
      { error: "Error fetching clubs" },
      { status: 500 }
    )
  }
}
