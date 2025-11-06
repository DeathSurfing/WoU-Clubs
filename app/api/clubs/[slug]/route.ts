import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    if (!slug) return NextResponse.json({ error: "Invalid slug" }, { status: 400 })

    const client = await clientPromise
    const db = client.db("woxsen")

    const club = await db.collection("clubs").findOne(
      { id: slug.toLowerCase() }, // ✅ Ensure case match
      {
        projection: {
          _id: 0,
          id: 1,
          name: 1,
          category: 1,
          description: 1,
          logo: 1,
          image: 1,
          coverImage: 1,
          socials: 1,
          members: 1,
        },
      }
    )

    if (!club) return NextResponse.json({ error: "Club not found" }, { status: 404 })

    return NextResponse.json(club)
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
