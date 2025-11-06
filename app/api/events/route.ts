import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const relatedTo = searchParams.get("relatedTo");

    const client = await clientPromise;
    const eventsCol = client.db("woxsen").collection("events");

    // projection contains all useful event fields from your schema
    const fullProjection = {
      _id: 0,
      id: 1,
      title: 1,
      description: 1,
      image: 1,
      startDate: 1,
      startTime: 1,
      endDate: 1,
      endTime: 1,
      location: 1,
      category: 1,
      clubId: 1,
      registerUrl: 1,
      isFeatured: 1,
      createdAt: 1,
      updatedAt: 1,
    };

    if (relatedTo) {
      const baseEvent = await eventsCol.findOne(
        { id: relatedTo },
        { projection: { _id: 0, id: 1, clubId: 1, category: 1 } }
      );

      if (!baseEvent) return NextResponse.json([], { status: 200 });

      const relatedEvents = await eventsCol
        .find(
          {
            id: { $ne: relatedTo },
            $or: [{ clubId: baseEvent.clubId }, { category: baseEvent.category }],
          },
          { projection: fullProjection }
        )
        .limit(8)
        .toArray();

      return NextResponse.json(relatedEvents, { status: 200 });
    }

    // default: return a lean list of events (most recent first)
    const events = await eventsCol
      .find({}, { projection: fullProjection })
      .sort({ startDate: -1, startTime: 1 })
      .limit(20)
      .toArray();

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Error fetching events" }, { status: 500 });
  }
}
