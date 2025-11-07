import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function GET() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_SECOND_URL ||
    process.env.NEXT_PUBLIC_ADMIN_PANEL ||
    "http://localhost:3000" // fallback for local dev

  // 🧩 API endpoints to refetch (server-side cache regeneration)
  const apiEndpoints = [
    "/api/student-council",
    "/api/clubs",
    "/api/events",
  ]

  // 🧠 Frontend pages to revalidate (Next.js ISR)
  const pagePaths = [
    "/student-council",
    "/clubs",
    "/events",
  ]

  const results: {
    endpoint: string
    status: string
    message?: string
  }[] = []

  console.log("♻️ Prewarm triggered – regenerating API + page caches...")

  // 1️⃣ Refresh API caches
  for (const endpoint of apiEndpoints) {
    const fullUrl = `${BASE_URL}${endpoint}?revalidate=1`
    try {
      console.log(`⚡ Regenerating cache for: ${fullUrl}`)
      const res = await fetch(fullUrl, {
        method: "GET",
        cache: "no-store",
        headers: { "x-prewarm-trigger": "true" },
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

  // 2️⃣ Revalidate frontend pages (Next.js ISR)
  console.log("🧱 Revalidating frontend pages via ISR...")
  for (const path of pagePaths) {
    try {
      await revalidatePath(path)
      console.log(`✅ Revalidated page: ${path}`)
    } catch (err: any) {
      console.error(`❌ Failed to revalidate page: ${path}`, err)
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
