import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("woxsen");
    const clubs = await db.collection("clubs").find({}).toArray();
    return NextResponse.json(clubs);
  } catch (error) {
    console.error("Error fetching clubs:", error);
    return NextResponse.json({ error: "Error fetching clubs" }, { status: 500 });
  }
}
