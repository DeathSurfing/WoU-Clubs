"use client"

import { useEffect, useState, use } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Mail, MapPin, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { clubsData } from "@/data/clubs"
import type { Club } from "@/types/club"
import ClubCard from "@/components/club-card"

export default function ClubPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params)
  const [club, setClub] = useState<Club | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching
    const foundClub = clubsData.find((c) => c.id === unwrappedParams.id)
    setClub(foundClub || null)
    setIsLoading(false)
  }, [unwrappedParams.id])

  if (isLoading) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-lg">Loading club information...</p>
        </div>
      </div>
    )
  }

  if (!club) {
    return notFound()
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${club.coverImage || "/placeholder.svg?height=800&width=1600"}')` }}
        ></div>
        <div className="container relative z-20 flex h-full flex-col justify-end pb-12 text-white">
          <Link
            href="/clubs"
            className="mb-4 inline-flex items-center text-sm font-medium text-white/80 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all clubs
          </Link>
          <Badge className="mb-4 w-fit bg-[#EE495C]">{club.category}</Badge>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{club.name}</h1>
          <p className="max-w-2xl text-lg text-white/90">{club.shortDescription}</p>
        </div>
      </section>

      {/* Club Details */}
      <section className="py-12">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="mb-8">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="mb-4 text-2xl font-bold">About the Club</h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p>{club.description}</p>
                      <h3>Our Mission</h3>
                      <p>
                        {club.mission ||
                          "To provide students with opportunities to develop skills, pursue interests, and build a community around shared passions."}
                      </p>
                      <h3>What We Do</h3>
                      <ul>
                        {club.activities?.map((activity, index) => <li key={index}>{activity}</li>) || (
                          <>
                            <li>Regular meetings and workshops</li>
                            <li>Special events and competitions</li>
                            <li>Collaborative projects</li>
                            <li>Skill development sessions</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="events" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="mb-4 text-2xl font-bold">Upcoming Events</h2>
                    <div className="space-y-6">
                      {club.events?.map((event, index) => (
                        <div key={index} className="rounded-lg border p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold">{event.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {event.date} • {event.location}
                              </p>
                              <p className="mt-2">{event.description}</p>
                              <Button className="mt-4 bg-[#EE495C] hover:bg-[#EE495C]/90" size="sm">
                                Register
                              </Button>
                            </div>
                          </div>
                        </div>
                      )) || <p className="text-muted-foreground">No upcoming events at the moment. Check back soon!</p>}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="members" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="mb-4 text-2xl font-bold">Club Members</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {club.members?.map((member, index) => (
                        <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                          <div className="relative h-12 w-12 overflow-hidden rounded-full">
                            <Image
                              src={member.avatar || "/placeholder.svg?height=100&width=100"}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      )) || <p className="col-span-full text-muted-foreground">Member information not available.</p>}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="gallery" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="mb-4 text-2xl font-bold">Gallery</h2>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {club.gallery?.map((image, index) => (
                        <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={image || "/placeholder.svg?height=300&width=300"}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      )) || <p className="col-span-full text-muted-foreground">No gallery images available.</p>}
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <div className="rounded-lg border p-6 sticky top-24">
                <h2 className="mb-4 text-xl font-bold" id="join">
                  Join This Club
                </h2>
                <div className="mb-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>{club.memberCount || "25+"} members</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>Meets {club.meetingSchedule || "weekly"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{club.location || "Main Campus, Room 101"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <a href={`mailto:${club.email || "clubs@woxsen.edu.in"}`} className="hover:text-primary">
                      {club.email || "clubs@woxsen.edu.in"}
                    </a>
                  </div>
                </div>
                <Button className="w-full bg-[#EE495C] hover:bg-[#EE495C]/90" asChild>
                  <a href={club.joinUrl || `https://forms.woxsen.edu.in/club-join?id=${club.id}`}>Apply to Join</a>
                </Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Open for all Woxsen University students
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Clubs */}
      <section className="bg-muted/50 py-12">
        <div className="container">
          <h2 className="mb-8 text-2xl font-bold">Similar Clubs You Might Like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clubsData
              .filter((c) => c.category === club.category && c.id !== club.id)
              .slice(0, 3)
              .map((relatedClub, index) => (
                <motion.div
                  key={relatedClub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ClubCard club={relatedClub} />
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}