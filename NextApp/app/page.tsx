"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Users, Award, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ClubCard from "@/components/club-card"
import { clubsData } from "@/data/clubs"
import { councilData } from "@/data/student-council"
import Link from "next/link"
import Image from "next/image"

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
          style={{ backgroundImage: "url('/University Backdrop.webp?height=1080&width=1920')" }}
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
            <Button 
              className="w-full bg-[#EE495C] hover:bg-[#EE495C]/90 text-white" 
              size="lg" 
              asChild
            >
              <a href="#student-council">Student Council</a>
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900/10 dark:hover:bg-white/10" 
              size="lg" 
              asChild
            >
              <a href="#explore">Explore Clubs</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Student Council Section */}
      <section id="student-council" className="py-16 bg-gradient-to-r from-[#EE495C]/5 to-[#EE495C]/10">
        <div className="container">
          <div className="mb-12 text-center">
            <div className="flex flex-col items-center justify-center">
            <div className="relative h-24 w-24 mb-6">
              {/* Light mode image */}
              <div className="dark:hidden">
                  <Image
                    src="/SCLogoLight.webp?height=100&width=100&text=SC"
                    alt="Student Council Logo"
                    fill
                    className="object-contain"
                  />
                </div>
  
              {/* Dark mode image */}
              <div className="hidden dark:block">
                  <Image
                    src="/SCLogoDark.webp?height=100&width=100&text=SC"
                    alt="Student Council Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Student Council</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Meet the dedicated student leaders who represent and advocate for the Woxsen University student body
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 items-center">
            <motion.div
              className="rounded-lg overflow-hidden border shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[400px] w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <Image
                  src="/CouncilLead.webp?height=800&width=600&text=Student+Council"
                  alt="Student Council"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 z-20 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Leadership Structure</h3>
                  <p className="mb-4">Explore our hierarchical council organization</p>
                  <Button 
                    variant="outline" 
                    className="
                      border-primary text-primary hover:bg-primary hover:text-primary-foreground
                      dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black
                    " 
                    asChild
                  >
                    <Link href="/student-council">View Structure</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col space-y-4"
              >
                <h3 className="text-2xl font-bold">Student Representation</h3>
                <p className="text-muted-foreground">
                  Our Student Council serves as the voice of the student body, advocating for student interests and
                  facilitating communication between students and administration.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#EE495C]" />
                    <span>{councilData.children?.length || 4} Departments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#EE495C]" />
                    <span>15+ Council Members</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">Featured Leaders</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      name: councilData.name,
                      title: councilData.title,
                      image: "/placeholder.svg?height=100&width=100&text=President",
                    },
                    {
                      name: councilData.children?.[0]?.name || "Priya Patel",
                      title: councilData.children?.[0]?.title || "VP Academic Affairs",
                      image: "/placeholder.svg?height=100&width=100&text=VP",
                    },
                  ].map((leader, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full flex-shrink-0">
                        <Image
                          src={leader.image || "/placeholder.svg"}
                          alt={leader.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{leader.name}</h4>
                        <p className="text-xs text-muted-foreground">{leader.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex justify-end"
              >
                <Button className="bg-[#EE495C] hover:bg-[#EE495C]/90" asChild>
                  <Link href="/student-council" className="flex items-center">
                    Meet the Council
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
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

