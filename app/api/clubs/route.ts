import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const client = await clientPromise;
    const db = client.db("woxsen");

    const query = category ? { category: category.toLowerCase() } : {};

    const clubs = await db
      .collection("clubs")
      .find(query)
      .project({ name: 1, id: 1, category: 1, logo: 1, image: 1, description: 1 }) // ✅ image field added
      .toArray();

    return NextResponse.json(clubs);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching clubs" }, { status: 500 });
  }
}
