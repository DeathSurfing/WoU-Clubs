import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("📥 [API] /api/events/[id] called with ID:", id);

    const client = await clientPromise;
    const db = client.db("woxsen");

    // 🔍 Try to find by numeric/string id instead of _id
    const event = await db.collection("events").findOne({ id: id });

    console.log("📦 Event fetched:", event);

    if (!event) {
      console.warn("⚠️ Event not found for ID:", id);
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("❌ Error in /api/events/[id]:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
