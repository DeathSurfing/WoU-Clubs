"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import ClubCard from "@/components/club-card"
import { clubsData } from "@/data/clubs"

// Get unique categories from club data
const categories = ["All", ...Array.from(new Set(clubsData.map((club) => club.category)))].sort()

export default function ClubsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredClubs, setFilteredClubs] = useState(clubsData)
  const [activeCategories, setActiveCategories] = useState<string[]>([])

  useEffect(() => {
    let filtered = clubsData

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (club) =>
          club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          club.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category dropdown
    if (selectedCategory !== "All") {
      filtered = filtered.filter((club) => club.category === selectedCategory)
    }

    // Filter by active category badges
    if (activeCategories.length > 0) {
      filtered = filtered.filter((club) => activeCategories.includes(club.category))
    }

    setFilteredClubs(filtered)
  }, [searchQuery, selectedCategory, activeCategories])

  // Toggle category filter
  const toggleCategory = (category: string) => {
    if (activeCategories.includes(category)) {
      setActiveCategories(activeCategories.filter((c) => c !== category))
    } else {
      setActiveCategories([...activeCategories, category])
    }
    // Reset dropdown selection when using badges
    setSelectedCategory("All")
  }

  return (
    <div className="pt-24">
      <div className="container">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">All Clubs</h1>
          <p className="text-muted-foreground">Explore all the clubs available at Woxsen University</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="relative md:col-span-3">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clubs by name or keyword..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value)
              // Clear active category badges when using dropdown
              setActiveCategories([])
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter Badges */}
        <div className="mb-8 flex flex-wrap gap-2">
          <div className="flex items-center mr-2">
            <Filter className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          {categories
            .filter((c) => c !== "All")
            .map((category) => (
              <Badge
                key={category}
                variant={activeCategories.includes(category) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          {activeCategories.length > 0 && (
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setActiveCategories([])}>
              Clear filters
            </Button>
          )}
        </div>

        {/* Club Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {filteredClubs.length > 0 ? (
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
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                  setActiveCategories([])
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>

        {/* Pagination (simplified) */}
        {filteredClubs.length > 0 && (
          <div className="flex justify-center pb-12">
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button variant="outline" size="icon" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="icon">
                2
              </Button>
              <Button variant="outline" size="icon">
                3
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

