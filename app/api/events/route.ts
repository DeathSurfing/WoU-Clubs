import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("woxsen");
    const { searchParams } = new URL(request.url);
    const relatedTo = searchParams.get("relatedTo");

    console.log("🔍 [API] /api/events called, relatedTo =", relatedTo);

    if (relatedTo) {
      // Fetch the base event first
      const baseEvent = await db.collection("events").findOne({ id: relatedTo });
      if (!baseEvent) {
        console.warn("⚠️ [API] Base event not found for relatedTo:", relatedTo);
        return NextResponse.json([], { status: 200 });
      }

      // Fetch related events (same club or category)
      const relatedEvents = await db
        .collection("events")
        .find({
          id: { $ne: relatedTo },
          $or: [
            { clubId: baseEvent.clubId },
            { category: baseEvent.category },
          ],
        })
        .toArray();

      console.log(`✅ Found ${relatedEvents.length} related events`);
      return NextResponse.json(relatedEvents, { status: 200 });
    }

    // If no relatedTo query param, return all events
    const events = await db.collection("events").find({}).toArray();
    console.log(`✅ Returning all ${events.length} events`);
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    return NextResponse.json({ error: "Error fetching events" }, { status: 500 });
  }
}
