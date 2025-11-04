import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const client = await clientPromise;
    const db = client.db("woxsen");

    const query = category ? { category: { $regex: `^${category}$`, $options: "i" } } : {};

    const clubs = await db.collection("clubs").find(query).toArray();

    return NextResponse.json(clubs);
  } catch (error) {
    console.error("Error fetching clubs:", error);
    return NextResponse.json({ error: "Error fetching clubs" }, { status: 500 });
  }
}
