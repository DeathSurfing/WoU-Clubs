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
import { format } from "date-fns"
import type { Club } from "@/types/club"
import type { Event } from "@/types/event"
import ClubCard from "@/components/club-card"

export default function ClubPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params)
  const [club, setClub] = useState<Club | null>(null)
  const [clubEvents, setClubEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("about")

  // ✅ Track page view
  useEffect(() => {
    if (unwrappedParams?.id) {
      window.umami?.track("club_page_view", { club_id: unwrappedParams.id })
    }
  }, [unwrappedParams.id])

  useEffect(() => {
    async function fetchClubData() {
      try {
        console.log("🔹 Fetching club:", unwrappedParams.id)
        const [clubRes, eventsRes] = await Promise.all([
          fetch(`/api/clubs/${unwrappedParams.id}`, { cache: "no-store" }),
          fetch(`/api/events?clubId=${unwrappedParams.id}`, { cache: "no-store" }),
        ])

        if (!clubRes.ok) throw new Error(`Club fetch failed (${clubRes.status})`)
        if (!eventsRes.ok) throw new Error(`Events fetch failed (${eventsRes.status})`)

        const clubData = await clubRes.json()
        const eventsData = await eventsRes.json()

        setClub(clubData)
        setClubEvents(eventsData)
      } catch (err) {
        console.error("💥 Error fetching club or events:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClubData()
  }, [unwrappedParams.id])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    window.umami?.track("club_tab_switch", { tab, club_id: club?.id })
  }

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
            onClick={() => window.umami?.track("club_back_to_all_click", { club_id: club.id })}
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
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="mb-8">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="members">Members</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                </TabsList>

                {/* About Tab */}
                <TabsContent value="about" className="space-y-6">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h2 className="mb-4 text-2xl font-bold">About the Club</h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      <p>{club.description}</p>
                      <h3>Our Mission</h3>
                      <p>
                        {club.mission ||
                          "To provide students with opportunities to develop skills, pursue interests, and build a community around shared passions."}
                      </p>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Events Tab */}
                <TabsContent value="events" className="space-y-6">
                  <h2 className="mb-4 text-2xl font-bold">Upcoming Events</h2>
                  {clubEvents.length ? (
                    clubEvents.map((event, index) => (
                      <motion.div
                        key={index}
                        className="rounded-lg border p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        data-umami-event="club_event_card_view"
                        data-umami-event-title={event.title}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Calendar className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(event.startDate), "MMMM d, yyyy")}
                              {event.location && ` • ${event.location}`}
                            </p>
                            <p className="mt-2">{event.description}</p>
                            {event.image && (
                              <div className="mt-4 relative h-48 w-full rounded-lg overflow-hidden">
                                <Image src={event.image} alt={event.title} fill className="object-cover" />
                              </div>
                            )}
                            <Button
                              className="mt-4 bg-[#EE495C] hover:bg-[#EE495C]/90"
                              size="sm"
                              asChild
                              data-umami-event="club_event_register_click"
                              data-umami-event-eventtitle={event.title}
                            >
                              <a href={event.registerUrl || "#"} target="_blank">
                                Register
                              </a>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No upcoming events right now. Check back soon!</p>
                  )}
                </TabsContent>

                {/* Members Tab */}
                <TabsContent value="members" className="space-y-6">
                  <h2 className="mb-4 text-2xl font-bold">Club Members</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {club.members?.length ? (
                      club.members.map((member, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-4 rounded-lg border p-4"
                          data-umami-event="club_member_view"
                          data-umami-event-name={member.name}
                        >
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
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">Member information not available.</p>
                    )}
                  </div>
                </TabsContent>

                {/* Gallery Tab */}
                <TabsContent value="gallery" className="space-y-6">
                  <h2 className="mb-4 text-2xl font-bold">Gallery</h2>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {club.gallery?.length ? (
                      club.gallery.map((image, index) => (
                        <motion.div
                          key={index}
                          className="relative aspect-square overflow-hidden rounded-lg"
                          whileHover={{ scale: 1.02 }}
                          data-umami-event="club_gallery_image_view"
                          data-umami-event-index={index + 1}
                        >
                          <Image
                            src={image || "/placeholder.svg?height=300&width=300"}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No gallery images available.</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div>
              <div className="rounded-lg border p-6 sticky top-24">
                <h2 className="mb-4 text-xl font-bold" id="join">
                  Join This Club
                </h2>
                <div className="mb-6 space-y-4">
                  {club.memberCount && (
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span>{club.memberCount || "25+"} members</span>
                    </div>
                  )}

                  {club.meetingSchedule && (
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>Meets {club.meetingSchedule}</span>
                    </div>
                  )}

                  {club.location && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>{club.location}</span>
                    </div>
                  )}

                  {club.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <a
                        href={`mailto:${club.email}`}
                        className="hover:text-primary"
                        onClick={() => window.umami?.track("club_email_click", { email: club.email })}
                      >
                        {club.email}
                      </a>
                    </div>
                  )}
                </div>

                <Button
                  className="w-full bg-[#EE495C] hover:bg-[#EE495C]/90"
                  asChild
                  data-umami-event="club_apply_click"
                  data-umami-event-clubname={club.name}
                >
                  <a href={club.joinUrl || "/noregistrationrequired"}>Apply to Join</a>
                </Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Open for all Woxsen University students
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
