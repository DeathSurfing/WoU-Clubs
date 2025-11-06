import { format, parseISO, isAfter } from "date-fns"
import EventPageContent from "@/components/events/event-page-content"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/events/${id}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    return { title: "Event Not Found" }
  }

  const event = await res.json()
  return { title: event.title || "Event Details" }
}

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/events/${id}`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold">Event not found</h1>
        <p className="text-muted-foreground mt-2">
          This event may have been removed or doesn't exist.
        </p>
      </div>
    )
  }

  const event = await res.json()

  // Format helpers
  const formattedStartDate = format(parseISO(event.startDate), "MMMM dd, yyyy")
  const formattedEndDate = event.endDate ? format(parseISO(event.endDate), "MMMM dd, yyyy") : null

  const startTime = event.startTime || ""
  const endTime = event.endTime || ""
  const isUpcoming = isAfter(parseISO(event.endDate || event.startDate), new Date())

  const isRegistrationOpen =
    !event.registrationDeadline ||
    isAfter(parseISO(event.registrationDeadline), new Date())

  return (
    <EventPageContent
      event={event}
      club={event.club}
      formattedStartDate={formattedStartDate}
      formattedEndDate={formattedEndDate}
      startTime={startTime}
      endTime={endTime}
      isUpcoming={isUpcoming}
      isRegistrationOpen={isRegistrationOpen}
    />
  )
}
