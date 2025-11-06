import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("📥 [API] Fetch event by id:", id);

    const client = await clientPromise;
    const db = client.db("woxsen");

    const event = await db.collection("events").findOne(
      { id },
      {
        projection: {
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
        },
      }
    );

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("❌ API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
