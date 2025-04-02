"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CategoriesPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the home page's categories section
    router.push("/#categories")
  }, [router])

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
        <p className="mt-4 text-lg">Redirecting to categories...</p>
      </div>
    </div>
  )
}

