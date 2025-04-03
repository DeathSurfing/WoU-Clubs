import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
import { EventModel } from "@/models/Event";

export async function GET() {
  try {
    await connectToDatabase();
    const events = await EventModel.find();
    return NextResponse.json(events);
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
