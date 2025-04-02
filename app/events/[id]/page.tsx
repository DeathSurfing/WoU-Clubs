"use client"

import { useEffect, useState } from "react"
import { notFound, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { format, parseISO, isAfter } from "date-fns"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Share2, ExternalLink, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { eventsData } from "@/data/events"
import { clubsData } from "@/data/clubs"
import type { Event } from "@/types/event"
import EventCard from "@/components/events/event-card"

export default function EventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([])
  const [isCopied, setIsCopied] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Find the event
    const foundEvent = eventsData.find((e) => e.id === params.id)

    if (foundEvent) {
      setEvent(foundEvent)

      // Find related events (same category or same club)
      const related = eventsData
        .filter(
          (e) =>
            e.id !== params.id &&
            (e.category === foundEvent.category || e.clubId === foundEvent.clubId) &&
            isAfter(parseISO(e.startDate), new Date()),
        )
        .slice(0, 3)

      setRelatedEvents(related)
    }

    setIsLoading(false)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-lg">Loading event information...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return notFound()
  }

  // Find the club that's hosting this event
  const club = clubsData.find((club) => club.id === event.clubId)

  // Format date and time
  const formattedStartDate = format(parseISO(event.startDate), "MMMM dd, yyyy")
  const formattedEndDate = event.endDate ? format(parseISO(event.endDate), "MMMM dd, yyyy") : null
  const startTime = event.startTime ? format(parseISO(`2023-01-01T${event.startTime}`), "h:mm a") : ""
  const endTime = event.endTime ? format(parseISO(`2023-01-01T${event.endTime}`), "h:mm a") : ""

  // Check if event is in the future
  const isUpcoming = isAfter(parseISO(event.startDate), new Date())

  // Check if registration is still open
  const isRegistrationOpen = !event.registrationDeadline || isAfter(parseISO(event.registrationDeadline), new Date())

  // Share event function
  const shareEvent = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href)
        setIsCopied(true)
        toast({
          title: "Link copied to clipboard",
          description: "You can now share this event with others",
        })

        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setIsCopied(false)
        }, 2000)
      } catch (err) {
        toast({
          title: "Failed to copy",
          description: "Please try again or copy the URL manually",
          variant: "destructive",
        })
      }
    }
  }

  // Generate calendar links
  const generateGoogleCalendarLink = () => {
    const startDateTime = event.startTime ? `${event.startDate}T${event.startTime}` : event.startDate

    const endDateTime =
      event.endTime && event.startDate
        ? `${event.startDate}T${event.endTime}`
        : event.endDate
          ? event.endDate
          : event.startDate

    const details = encodeURIComponent(event.description)
    const location = encodeURIComponent(event.location)
    const title = encodeURIComponent(event.title)

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateTime.replace(/-/g, "")}/${endDateTime.replace(/-/g, "")}&details=${details}&location=${location}`
  }

  // Generate ICS file content
  const generateIcsFile = () => {
    const startDateTime = event.startTime
      ? `${event.startDate.replace(/-/g, "")}T${event.startTime.replace(/:/g, "")}00`
      : `${event.startDate.replace(/-/g, "")}T000000`

    const endDateTime =
      event.endTime && event.startDate
        ? `${event.startDate.replace(/-/g, "")}T${event.endTime.replace(/:/g, "")}00`
        : event.endDate
          ? `${event.endDate.replace(/-/g, "")}T000000`
          : startDateTime

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `SUMMARY:${event.title}`,
      `DTSTART:${startDateTime}`,
      `DTEND:${endDateTime}`,
      `LOCATION:${event.location}`,
      `DESCRIPTION:${event.description}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n")

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `${event.title.replace(/\s+/g, "-")}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${event.image || "/placeholder.svg?height=800&width=1600&text=Event"}')` }}
        ></div>
        <div className="container relative z-20 flex h-full flex-col justify-end pb-12 text-white">
          <Button
            variant="ghost"
            className="mb-4 w-fit text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to events
          </Button>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className={!isUpcoming ? "bg-muted-foreground" : "bg-[#EE495C]"}>
              {!isUpcoming ? "Past Event" : "Upcoming Event"}
            </Badge>
            {event.category && (
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                {event.category}
              </Badge>
            )}
            {event.isFeatured && (
              <Badge variant="outline" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                Featured
              </Badge>
            )}
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{event.title}</h1>
          <p className="max-w-2xl text-lg text-white/90">Hosted by {club?.name || "Woxsen University"}</p>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="mb-4 text-2xl font-bold">About the Event</h2>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>

                <Separator />

                <div>
                  <h2 className="mb-4 text-2xl font-bold">Event Details</h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="mt-1 h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-medium">Date</h3>
                          <p className="text-muted-foreground">
                            {formattedStartDate}
                            {formattedEndDate && formattedEndDate !== formattedStartDate && <> to {formattedEndDate}</>}
                          </p>
                        </div>
                      </div>

                      {(startTime || endTime) && (
                        <div className="flex items-start gap-3">
                          <Clock className="mt-1 h-5 w-5 text-primary" />
                          <div>
                            <h3 className="font-medium">Time</h3>
                            <p className="text-muted-foreground">
                              {startTime}
                              {endTime ? ` - ${endTime}` : ""}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-1 h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-medium">Location</h3>
                          <p className="text-muted-foreground">{event.location}</p>
                          {event.isVirtual && event.virtualLink && (
                            <a
                              href={event.virtualLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 flex items-center text-primary hover:underline"
                            >
                              Join virtually <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      {(event.capacity || event.attendees) && (
                        <div className="flex items-start gap-3">
                          <Users className="mt-1 h-5 w-5 text-primary" />
                          <div>
                            <h3 className="font-medium">Attendance</h3>
                            <p className="text-muted-foreground">
                              {event.attendees ? `${event.attendees} registered` : ""}
                              {event.capacity ? ` / ${event.capacity} capacity` : ""}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {club && (
                  <>
                    <Separator />

                    <div>
                      <h2 className="mb-4 text-2xl font-bold">Organized by</h2>
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-full">
                          <Image
                            src={club.image || "/placeholder.svg?height=100&width=100"}
                            alt={club.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">{club.name}</h3>
                          <p className="text-muted-foreground">{club.shortDescription}</p>
                          <Link
                            href={`/clubs/${club.id}`}
                            className="mt-1 inline-block text-sm text-primary hover:underline"
                          >
                            View club profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2" onClick={shareEvent}>
                    {isCopied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                    {isCopied ? "Copied!" : "Share Event"}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Add to Calendar
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => window.open(generateGoogleCalendarLink(), "_blank")}>
                        Google Calendar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={generateIcsFile}>Apple Calendar / Outlook (.ics)</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            </div>

            <div>
              <div className="rounded-lg border p-6 sticky top-24">
                <h2 className="mb-4 text-xl font-bold">{isUpcoming ? "Register for this Event" : "Event has ended"}</h2>

                {isUpcoming && (
                  <>
                    <div className="mb-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span>{formattedStartDate}</span>
                      </div>

                      {(startTime || endTime) && (
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-muted-foreground" />
                          <span>
                            {startTime}
                            {endTime ? ` - ${endTime}` : ""}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {event.registrationDeadline && (
                      <p className="mb-4 text-sm text-muted-foreground">
                        Registration closes on {format(parseISO(event.registrationDeadline), "MMMM dd, yyyy")}
                      </p>
                    )}

                    <Button
                      className="w-full bg-[#EE495C] hover:bg-[#EE495C]/90"
                      disabled={!isRegistrationOpen}
                      asChild
                    >
                      <a
                        href={event.registrationLink || `https://forms.woxsen.edu.in/event-registration?id=${event.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {isRegistrationOpen ? "Register Now" : "Registration Closed"}
                      </a>
                    </Button>

                    <p className="mt-4 text-center text-sm text-muted-foreground">
                      {event.capacity
                        ? `Limited to ${event.capacity} participants`
                        : "Open for all Woxsen University students"}
                    </p>
                  </>
                )}

                {!isUpcoming && (
                  <div className="text-center">
                    <p className="mb-6 text-muted-foreground">
                      This event has already taken place. Check out our upcoming events below.
                    </p>
                    <Button asChild>
                      <Link href="/events">View Upcoming Events</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="bg-muted/50 py-12">
          <div className="container">
            <h2 className="mb-8 text-2xl font-bold">Related Events You Might Like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedEvents.map((relatedEvent, index) => (
                <motion.div
                  key={relatedEvent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EventCard event={relatedEvent} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

