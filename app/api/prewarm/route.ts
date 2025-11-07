import { NextResponse } from "next/server"

export async function GET() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_SECOND_URL ||
    process.env.NEXT_PUBLIC_ADMIN_PANEL ||
    "http://localhost:3000" // fallback for local dev

  const endpoints = [
    "/api/student-council",
    "/api/clubs",
    "/api/events",
  ]

  const results: {
    endpoint: string
    status: string
    message?: string
  }[] = []

  console.log("♻️ Prewarm triggered – regenerating caches...")

  for (const endpoint of endpoints) {
    const fullUrl = `${BASE_URL}${endpoint}?revalidate=1`
    try {
      console.log(`⚡ Regenerating cache for: ${fullUrl}`)
      const res = await fetch(fullUrl, {
        method: "GET",
        cache: "no-store",
        headers: {
          "x-prewarm-trigger": "true", // optional custom header
        },
      })

      if (!res.ok) {
        console.error(`❌ Failed (${res.status}) for ${endpoint}`)
        results.push({
          endpoint,
          status: "error",
          message: `HTTP ${res.status}`,
        })
        continue
      }

      // Try to parse JSON for debugging
      let data: any = null
      try {
        data = await res.json()
      } catch {
        data = null
      }

      console.log(`✅ Cache regenerated for ${endpoint}`)
      results.push({
        endpoint,
        status: "success",
        message: `Regenerated (${data ? "with JSON" : "no data"})`,
      })
    } catch (err: any) {
      console.error(`💥 Exception while regenerating ${endpoint}`, err)
      results.push({
        endpoint,
        status: "error",
        message: err?.message || "Unknown error",
      })
    }
  }

  console.log("🧩 Prewarm complete. Summary:", results)

  return NextResponse.json({
    success: true,
    regenerated: results.filter((r) => r.status === "success").length,
    failed: results.filter((r) => r.status === "error").length,
    details: results,
  })
}
