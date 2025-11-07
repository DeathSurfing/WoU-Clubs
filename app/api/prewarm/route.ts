import { NextResponse } from "next/server";

export async function GET() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_SECOND_URL ||
    "http://localhost:3000"; // fallback for local dev

  const endpoints = [
    "/api/student-council",
    "/api/clubs",
    "/api/events",
  ];

  for (const endpoint of endpoints) {
    const fullUrl = `${BASE_URL}${endpoint}`;
    try {
      await fetch(fullUrl, { cache: "no-store" });
      console.log(`✅ Warmed ${fullUrl}`);
    } catch (err) {
      console.error(`❌ Failed to warm ${fullUrl}`, err);
    }
  }

  return NextResponse.json({ success: true });
}
