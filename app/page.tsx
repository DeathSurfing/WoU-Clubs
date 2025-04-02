"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ClubCard from "@/components/club-card"
import { clubsData } from "@/data/clubs"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Get unique categories from club data
  const categories = ["All", ...Array.from(new Set(clubsData.map((club) => club.category)))].sort()

  const filteredClubs = clubsData.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All" || club.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 dark:from-black/80 dark:to-black/60 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/placeholder.svg?height=1080&width=1920')" }}
        ></div>
        <div className="container relative z-20 mx-auto px-4 text-center text-white">
          <motion.h1
            className="mb-6 text-4xl font-bold leading-tight tracking-tighter md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Your Passion at <span className="text-[#EE495C]">Woxsen</span>
          </motion.h1>
          <motion.p
            className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join our diverse community of clubs and activities to enhance your university experience
          </motion.p>
          <motion.div
            className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button className="w-full bg-[#EE495C] hover:bg-[#EE495C]/90 text-white" size="lg" asChild>
              <a href="#explore">Explore Clubs</a>
            </Button>
            <Button variant="outline" className="w-full border-white text-white hover:bg-white/10" size="lg" asChild>
              <a href="/about">Learn More</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section id="explore" className="py-16 bg-muted/50">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Explore Our Clubs</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Discover the perfect club to match your interests and enhance your university experience
            </p>
          </div>

          <div className="mx-auto mb-12 max-w-xl">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative md:col-span-3">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search clubs by name, category or keyword..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
          </div>

          {/* Club Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClubs.length > 0 ? (
              filteredClubs.slice(0, 6).map((club, index) => (
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
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium mb-2">No clubs found</h3>
                <p className="text-muted-foreground">Try adjusting your search query</p>
              </div>
            )}
          </div>

          {filteredClubs.length > 6 && (
            <div className="mt-8 text-center">
              <Button asChild className="bg-[#EE495C] hover:bg-[#EE495C]/90">
                <a href="/clubs">View All Clubs</a>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Club Categories</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Explore clubs by category to find the perfect match for your interests
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["Academic", "Arts", "Literary", "Cultural", "Sports", "Media", "Social"].map((category, index) => (
              <motion.div
                key={category}
                className="group relative overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-10"></div>
                <div
                  className="h-64 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('/placeholder.svg?height=400&width=300&text=${category}')` }}
                ></div>
                <div className="absolute bottom-0 left-0 z-20 p-6 text-white">
                  <h3 className="mb-2 text-2xl font-bold">{category}</h3>
                  <p className="mb-4 text-sm text-gray-200">Explore {category.toLowerCase()} clubs and activities</p>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black" asChild>
                    <a href={`/categories/${category.toLowerCase()}`}>View Clubs</a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#EE495C] py-16 text-white">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Ready to Join a Club?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-white/90">
            Take the first step towards an enriching university experience by joining one of our many clubs
          </p>
          <Button size="lg" className="bg-white text-[#EE495C] hover:bg-white/90" asChild>
            <a href="/contact">Get Started</a>
          </Button>
        </div>
      </section>
    </div>
  )
}

