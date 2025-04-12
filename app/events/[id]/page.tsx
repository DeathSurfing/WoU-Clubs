import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { eventsData } from "@/data/events"
import { clubsData } from "@/data/clubs"
import { format, parseISO, isAfter } from 'date-fns'
import EventPageContent from './EventPageContent'
import type { Event, Club } from "@/types/event"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const event = eventsData.find((e) => e.id === params.id)
  if (!event) return {
    title: "Event Not Found",
    description: "The event you're looking for doesn't exist",
  }

  const club = clubsData.find((club) => club.id === event.clubId)
  
  return {
    title: `${event.title} | Woxsen Events`,
    description: event.description || 'Join this event at Woxsen University',
    openGraph: {
      title: event.title,
      description: event.description || '',
      url: `https://woxsen.edu.in/events/${event.id}`,
      siteName: 'Woxsen University',
      images: [event.image || "/default-event-image.jpg"],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.description || '',
      images: [event.image || "/default-event-image.jpg"],
    },
  }
}

export default function EventPage({ params }: { params: { id: string } }) {
  const event = eventsData.find((e) => e.id === params.id)
  if (!event) notFound()

  const club = clubsData.find((c) => c.id === event.clubId)
  
  // Pre-calculate values to pass to client component
  const formattedStartDate = format(parseISO(event.startDate), "MMMM dd, yyyy")
  const formattedEndDate = event.endDate ? format(parseISO(event.endDate), "MMMM dd, yyyy") : null
  const startTime = event.startTime ? format(parseISO(`2023-01-01T${event.startTime}`), "h:mm a") : ""
  const endTime = event.endTime ? format(parseISO(`2023-01-01T${event.endTime}`), "h:mm a") : ""
  const isUpcoming = isAfter(parseISO(event.startDate), new Date())
  const isRegistrationOpen = !event.registrationDeadline || isAfter(parseISO(event.registrationDeadline), new Date())

  return (
    <EventPageContent 
      event={event}
      club={club}
      formattedStartDate={formattedStartDate}
      formattedEndDate={formattedEndDate}
      startTime={startTime}
      endTime={endTime}
      isUpcoming={isUpcoming}
      isRegistrationOpen={isRegistrationOpen}
    />
  )
}