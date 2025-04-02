"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { format, parseISO } from "date-fns"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Event } from "@/types/event"
import { clubsData } from "@/data/clubs"

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  // Find the club that's hosting this event
  const club = clubsData.find((club) => club.id === event.clubId)

  // Format date and time
  const formattedDate = format(parseISO(event.startDate), "MMM dd, yyyy")
  const startTime = event.startTime ? format(parseISO(`2023-01-01T${event.startTime}`), "h:mm a") : ""
  const endTime = event.endTime ? format(parseISO(`2023-01-01T${event.endTime}`), "h:mm a") : ""

  // Check if event is happening today
  const isToday = format(parseISO(event.startDate), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")

  // Check if event is in the past
  const isPast = parseISO(event.endDate || event.startDate) < new Date()

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={event.image || "/placeholder.svg?height=300&width=500&text=Event"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute right-2 top-2 flex flex-col gap-2">
            <Badge className={isPast ? "bg-muted-foreground" : isToday ? "bg-green-500" : "bg-[#EE495C]"}>
              {isPast ? "Past" : isToday ? "Today" : "Upcoming"}
            </Badge>
            {event.category && (
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                {event.category}
              </Badge>
            )}
          </div>
        </div>

        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="line-clamp-2">{event.title}</CardTitle>
              <CardDescription className="mt-1">Hosted by {club?.name || "Woxsen University"}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{formattedDate}</span>
            </div>

            {(startTime || endTime) && (
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>
                  {startTime}
                  {endTime ? ` - ${endTime}` : ""}
                </span>
              </div>
            )}

            <div className="flex items-center text-sm">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          <p className="line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/events/${event.id}`}>Learn More</Link>
          </Button>
          <Button size="sm" className="bg-[#EE495C] hover:bg-[#EE495C]/90" asChild>
            <Link href={event.registrationLink || `https://forms.woxsen.edu.in/event-registration?id=${event.id}`}>
              Register
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

