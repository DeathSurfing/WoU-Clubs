import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import redis from "@/lib/redis"

export const revalidate = 600 // optional static hint for ISR if deployed on Vercel

export async function GET() {
  const cacheKey = "studentcouncil:all"

  try {
    // ✅ 1. Try Redis cache first
    const cached = await redis.get(cacheKey)
    if (cached) {
      return NextResponse.json(JSON.parse(cached), {
        headers: { "X-Cache": "HIT" },
      })
    }

    // ✅ 2. Connect to Mongo
    const client = await clientPromise
    const db = client.db("woxsen")

    // ✅ 3. Fetch only essential data (no photo base64)
    const members = await db
      .collection("studentcouncil")
      .find(
        { isActive: { $ne: false } }, // optional filter for inactive entries
        {
          projection: {
            _id: 0,
            id: 1,
            name: 1,
            role: 1,
            department: 1,
            year: 1,
            photoPosition: 1,
            bio: 1,
            quote: 1,
            email: 1,
            linkedin: 1,
            twitter: 1,
            updatedAt: 1,
          },
        }
      )
      .sort({ sortOrder: 1, photoPosition: 1 })
      .toArray()

    // ✅ 4. Transform: inject CDN URL instead of base64
    const transformed = members.map((m) => ({
      ...m,
      photo: `/api/images/studentcouncil/${m.id}`,
    }))

    // ✅ 5. Cache in Redis (10 min = 600s)
    await redis.setex(cacheKey, 600, JSON.stringify(transformed))

    return NextResponse.json(transformed, {
      headers: { "X-Cache": "MISS" },
    })
  } catch (err) {
    console.error("[StudentCouncil API Error]", err)
    return NextResponse.json(
      { error: "Failed to fetch student council" },
      { status: 500 }
    )
  }
}
