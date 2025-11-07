"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ClubCard from "@/components/club-card"

export default function ExploreClubs({ initialClubs }: { initialClubs: any[] }) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(initialClubs.map((c) => c.category))).filter(Boolean)],
    [initialClubs]
  )

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return initialClubs.filter(
      (club) =>
        (category === "All" || club.category === category) &&
        (club.name.toLowerCase().includes(q) ||
          club.description.toLowerCase().includes(q) ||
          club.category.toLowerCase().includes(q))
    )
  }, [search, category, initialClubs])

  return (
    <section id="explore" className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Explore Our Clubs</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">Discover the perfect club to match your interests.</p>
        </div>

        {/* Filters */}
        <div className="mx-auto mb-12 max-w-xl">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative md:col-span-3">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search clubs..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Club Grid */}
        {filtered.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, 6).map((club) => (
              <ClubCard key={club._id ?? club.id} club={club} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">No clubs found.</div>
        )}

        {filtered.length > 6 && (
          <div className="mt-8 text-center">
            <Button className="bg-[#EE495C] hover:bg-[#EE495C]/90" asChild>
              <a href="/clubs">View All Clubs</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
