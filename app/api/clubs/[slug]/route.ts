import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    console.log("🟡 Awaiting params...")
    const resolvedParams = await params
    console.log("🔍 Fetching club with slug:", resolvedParams.slug)

    const client = await clientPromise
    const db = client.db("woxsen")

    const club = await db.collection("clubs").findOne({ id: resolvedParams.slug })

    if (!club) {
      console.log("⚠️ Club not found for slug:", resolvedParams.slug)
      return NextResponse.json({ error: "Club not found" }, { status: 404 })
    }

    console.log("✅ Club found:", club.name)
    return NextResponse.json(club)
  } catch (error) {
    console.error("❌ Error fetching club:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
