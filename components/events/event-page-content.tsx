"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  ExternalLink,
  Check,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import EventCard from "@/components/events/event-card"
import type { Event, Club } from "@/types/event"
import { isAfter, parseISO, format } from "date-fns"

interface EventPageContentProps {
  event: Event
  club?: Club
  formattedStartDate: string
  formattedEndDate: string | null
  startTime: string
  endTime: string
  isUpcoming: boolean
  isRegistrationOpen: boolean
}

export default function EventPageContent({
  event,
  club,
  formattedStartDate,
  formattedEndDate,
  startTime,
  endTime,
  isUpcoming,
  isRegistrationOpen,
}: EventPageContentProps) {
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([])
  const [isCopied, setIsCopied] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // ✅ Track when event page is viewed
  useEffect(() => {
    if (event?.title) {
      window.umami?.track("event_view", {
        title: event.title,
        category: event.category,
        club: club?.name,
      })
    }
  }, [event, club])

  // ✅ Fetch related events dynamically
  useEffect(() => {
    const fetchRelatedEvents = async () => {
      try {
        const res = await fetch("/api/events")
        const allEvents = await res.json()
        const related = allEvents
          .filter(
            (e: any) =>
              e._id !== event._id &&
              (e.category === event.category || e.clubId === event.clubId) &&
              isAfter(parseISO(e.startDate), new Date())
          )
          .slice(0, 3)

        setRelatedEvents(related)
      } catch (err) {
        console.error("Error loading related events:", err)
      }
    }
    fetchRelatedEvents()
  }, [event._id, event.category, event.clubId])

  const shareEvent = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setIsCopied(true)
      window.umami?.track("event_share", { title: event.title })
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this event with others",
      })
      setTimeout(() => setIsCopied(false), 2000)
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
      })
    }
  }

  const handleBackClick = () => {
    window.umami?.track("event_back_click", { from: "event_page" })
    if (window.history.length > 1) router.back()
    else router.push("/events")
  }

  const generateGoogleCalendarLink = () => {
    const eventStartDate = event.startDate
    const startDateTime = event.startTime
      ? `${eventStartDate}T${event.startTime}:00`
      : `${eventStartDate}T00:00:00`

    const endDateTime = event.endTime
      ? `${eventStartDate}T${event.endTime}:00`
      : event.endDate
      ? `${event.endDate}T23:59:59`
      : `${eventStartDate}T23:59:59`

    const details = encodeURIComponent(event.description || "")
    const location = encodeURIComponent(event.location || "")
    const title = encodeURIComponent(event.title || "")
    const formatForGoogle = (dateTime: string) => dateTime.replace(/[-:]/g, "") + "Z"

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatForGoogle(
      startDateTime
    )}/${formatForGoogle(endDateTime)}&details=${details}&location=${location}`
  }

  const generateIcsFile = () => {
    const eventStartDate = event.startDate
    const startDateTime = event.startTime
      ? `${eventStartDate.replace(/-/g, "")}T${event.startTime.replace(/:/g, "")}00`
      : `${eventStartDate.replace(/-/g, "")}T000000`

    const endDateTime = event.endTime
      ? `${eventStartDate.replace(/-/g, "")}T${event.endTime.replace(/:/g, "")}00`
      : event.endDate
      ? `${event.endDate.replace(/-/g, "")}T235959`
      : `${eventStartDate.replace(/-/g, "")}T235959`

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
    link.setAttribute(
      "download",
      `${event.title.replace(/\s+/g, "-").replace(/[^\w-]/g, "")}.ics`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    window.umami?.track("event_add_to_calendar", { title: event.title })
  }

  const registrationUrl =
    event.registerUrl || event.registrationURL || event.registerLink || ""
  const needsRegistration = registrationUrl.trim() !== ""

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${event.image || "/placeholder.svg?height=800&width=1600&text=Event"}')`,
          }}
        />
        <div className="container relative z-20 flex h-full flex-col justify-end pb-12 text-white">
          <Button
            variant="ghost"
            className="mb-4 w-fit text-white/80 hover:text-white hover:bg-white/10"
            onClick={handleBackClick}
            data-umami-event="event_back_click"
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

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="mb-4 text-2xl font-bold">About the Event</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </motion.div>

              <Separator />

              {/* Event Info */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="mb-4 text-2xl font-bold">Event Details</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      <Calendar className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Date</h3>
                        <p className="text-muted-foreground">
                          {formattedStartDate}
                          {formattedEndDate && formattedEndDate !== formattedStartDate && (
                            <> to {formattedEndDate}</>
                          )}
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

                  <div>
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="mt-1 h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Share + Calendar */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={shareEvent}
                  data-umami-event="event_share"
                >
                  {isCopied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                  {isCopied ? "Copied!" : "Share Event"}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" data-umami-event="event_calendar_open">
                      Add to Calendar
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem
                      onClick={() => {
                        window.open(generateGoogleCalendarLink(), "_blank")
                        window.umami?.track("event_add_to_google_calendar", { title: event.title })
                      }}
                    >
                      Google Calendar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={generateIcsFile}>
                      Apple / Outlook (.ics)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="rounded-lg border p-6 sticky top-24">
                <h2 className="mb-4 text-xl font-bold">
                  {isUpcoming ? "Event Information" : "Event has ended"}
                </h2>

                {isUpcoming ? (
                  <>
                    {needsRegistration && (
                      <Button
                        className="w-full bg-[#EE495C] hover:bg-[#EE495C]/90"
                        disabled={!isRegistrationOpen}
                        asChild
                        data-umami-event="event_register_click"
                        onClick={() =>
                          window.umami?.track("event_register_click", {
                            title: event.title,
                            url: registrationUrl,
                          })
                        }
                      >
                        <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
                          {isRegistrationOpen ? "Register Now" : "Registration Closed"}
                        </a>
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="text-center">
                    <p className="mb-6 text-muted-foreground">
                      This event has already taken place.
                    </p>
                    <Button asChild>
                      <Link href="/events" data-umami-event="event_back_to_events">
                        View Upcoming Events
                      </Link>
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
                  key={relatedEvent._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() =>
                    window.umami?.track("related_event_click", {
                      title: relatedEvent.title,
                      category: relatedEvent.category,
                    })
                  }
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
