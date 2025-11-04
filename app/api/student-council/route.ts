import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("woxsen"); // change if your DB name differs
    const members = await db.collection("studentcouncil").find({}).toArray();

    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching student council:", error);
    return NextResponse.json({ error: "Failed to fetch student council" }, { status: 500 });
  }
}
