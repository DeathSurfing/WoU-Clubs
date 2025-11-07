"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function CategoriesPage() {
  const router = useRouter()
  const [redirecting, setRedirecting] = useState(true)

  useEffect(() => {
    // Track redirect event
    window.umami?.track("categories_redirect_page_view")

    // Redirect to home page categories section
    const timeout = setTimeout(() => {
      router.push("/#categories")
    }, 300) // short delay to ensure tracking event logs

    // Cleanup
    return () => clearTimeout(timeout)
  }, [router])

  // Optional fallback message if redirect delays
  useEffect(() => {
    const timer = setTimeout(() => setRedirecting(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
        <p className="mt-4 text-lg">
          {redirecting ? "Redirecting to categories..." : "Still redirecting... please wait or go to home."}
        </p>
      </div>
    </div>
  )
}
