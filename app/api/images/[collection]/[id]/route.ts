import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import redis from "@/lib/redis"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  try {
    const { collection, id } = await params

    const allowed = ["clubs", "events", "studentcouncil"]
    if (!allowed.includes(collection)) {
      console.error("❌ Invalid collection:", collection)
      return NextResponse.json({ error: "Invalid collection" }, { status: 400 })
    }

    const cacheKey = `image:${collection}:${id}`

    // 1️⃣ Try Redis cache first
    const cached = await redis.get(cacheKey)
    if (cached) {
      return new NextResponse(Buffer.from(cached, "base64"), {
        headers: { "Content-Type": "image/webp", "X-Cache": "HIT" },
      })
    }


    // 2️⃣ MongoDB lookup
    const client = await clientPromise
    const db = client.db("woxsen")
    const doc = await db.collection(collection).findOne({ id })

    if (!doc) {
      console.error(`❌ No document found for ${collection}/${id}`)
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    // 3️⃣ Detect image field
    const base64Field =
      doc.photo ||
      doc.image ||
      doc.coverImage ||
      doc.bannerImage ||
      doc.thumbnail ||
      null

    if (!base64Field) {
      console.error("⚠️ Document found but no image field present.")
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }


    const base64 = base64Field.replace(/^data:image\/\w+;base64,/, "")
    await redis.setex(cacheKey, 86400, base64)

    return new NextResponse(Buffer.from(base64, "base64"), {
      headers: { "Content-Type": "image/webp", "X-Cache": "MISS" },
    })
  } catch (err: any) {
    console.error("🔥 [Image API Error]", err)
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    )
  }
}
