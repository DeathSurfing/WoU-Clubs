import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import redis from "@/lib/redis"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    if (!slug) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
    }

    const id = decodeURIComponent(slug).toLowerCase()
    const cacheKey = `club:${id}`

    console.log(`🏛️ [API] Fetching Club → ${id}`)

    // 1️⃣ Try Redis cache first
    try {
      const cached = await redis.get(cacheKey)
      if (cached) {
        console.log(`⚡ Cache HIT → ${cacheKey}`)
        return NextResponse.json(JSON.parse(cached), {
          headers: { "X-Cache": "HIT" },
        })
      }
    } catch (e) {
      console.warn("⚠️ Redis unavailable — skipping cache:", e)
    }

    // 2️⃣ Fetch from MongoDB
    const client = await clientPromise
    const db = client.db("woxsen")

    const projection = {
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
    } as const

    const club = await db.collection("clubs").findOne({ id }, { projection })

    if (!club) {
      console.warn(`❌ No club found for slug: ${id}`)
      return NextResponse.json({ error: "Club not found" }, { status: 404 })
    }

    // 3️⃣ Inject CDN image URLs (unified image route)
    const cdnUrl = `/api/images/clubs/${club.id}`
    const transformed = {
      ...club,
      logo: cdnUrl,
      image: cdnUrl,
      coverImage: cdnUrl,
    }

    // 4️⃣ Cache in Redis for 15 minutes (non-blocking)
    redis
      .setex(cacheKey, 900, JSON.stringify(transformed))
      .catch((err) => console.warn("⚠️ Redis cache set failed:", err))

    console.log(`✅ [API] Club fetched from MongoDB → ${club.name}`)

    return NextResponse.json(transformed, {
      headers: {
        "X-Cache": "MISS",
        "Cache-Control": "public, max-age=60, stale-while-revalidate=120",
      },
    })
  } catch (err) {
    console.error("💥 [API ERROR] Club fetch failed:", err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
