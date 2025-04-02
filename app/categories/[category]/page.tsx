"use client"

import { useEffect, useState } from "react"
import { notFound, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ClubCard from "@/components/club-card"
import { clubsData } from "@/data/clubs"
import type { Club } from "@/types/club"

// Get unique categories from club data (lowercase for URL matching)
const validCategories = Array.from(new Set(clubsData.map((club) => club.category.toLowerCase())))

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [clubs, setClubs] = useState<Club[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Format category for display (capitalize first letter)
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1)

  useEffect(() => {
    if (!validCategories.includes(params.category.toLowerCase())) {
      return
    }

    // Filter clubs by category
    const categoryClubs = clubsData.filter((club) => club.category.toLowerCase() === params.category.toLowerCase())
    setClubs(categoryClubs)
    setIsLoading(false)
  }, [params.category])

  if (!validCategories.includes(params.category.toLowerCase()) && !isLoading) {
    return notFound()
  }

  const filteredClubs = clubs.filter(
    (club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="pt-24">
      <div className="container">
        <div className="mb-6">
          <Button variant="ghost" className="mb-4 flex items-center text-sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">{category} Clubs</h1>
          <p className="text-muted-foreground">
            Explore all {params.category.toLowerCase()} clubs at Woxsen University
          </p>
        </div>

        {/* Search */}
        <div className="mb-12 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={`Search ${params.category} clubs...`}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Club Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-lg border p-4 space-y-4">
                <div className="h-48 w-full bg-muted animate-pulse rounded-md"></div>
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded-md"></div>
                <div className="h-4 w-full bg-muted animate-pulse rounded-md"></div>
                <div className="h-4 w-full bg-muted animate-pulse rounded-md"></div>
                <div className="h-4 w-2/3 bg-muted animate-pulse rounded-md"></div>
                <div className="flex justify-between">
                  <div className="h-9 w-24 bg-muted animate-pulse rounded-md"></div>
                  <div className="h-9 w-24 bg-muted animate-pulse rounded-md"></div>
                </div>
              </div>
            ))
          ) : filteredClubs.length > 0 ? (
            filteredClubs.map((club, index) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ClubCard club={club} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h3 className="text-xl font-medium mb-2">No clubs found</h3>
              <p className="text-muted-foreground">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

