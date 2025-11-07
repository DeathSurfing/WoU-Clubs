import { headers } from "next/headers"
import { format, parseISO, isAfter } from "date-fns"
import EventPageContent from "@/components/events/event-page-content"

// ✅ Must be async when calling headers()
async function getBaseUrl() {
  const h = await headers()
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000"
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https")
  return `${proto}://${host}`
}

// ✅ Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const base = process.env.NEXT_PUBLIC_BASE_URL || (await getBaseUrl())

  const res = await fetch(`${base}/api/events/${encodeURIComponent(id)}`, { cache: "no-store" })

  if (!res.ok) {
    return { title: "Event Not Found | Woxsen University" }
  }

  const event = await res.json()

  return {
    title: `${event.title || "Event Details"} | Woxsen University`,
    description:
      event.description ||
      "Learn more about this event hosted by Woxsen University’s vibrant student community.",
    openGraph: {
      title: event.title,
      description: event.description,
      images: event.image ? [event.image] : undefined,
      url: `${base}/events/${id}`,
      type: "article",
    },
    alternates: { canonical: `${base}/events/${id}` },
  }
}

// ✅ Main Event Page
export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const base = process.env.NEXT_PUBLIC_BASE_URL || (await getBaseUrl())

  const res = await fetch(`${base}/api/events/${encodeURIComponent(id)}`, { cache: "no-store" })

  if (!res.ok) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold">Event not found</h1>
        <p className="text-muted-foreground mt-2">
          This event may have been removed or doesn’t exist.
        </p>
      </div>
    )
  }

  const event = await res.json()

  const formattedStartDate = format(parseISO(event.startDate), "MMMM dd, yyyy")
  const formattedEndDate = event.endDate ? format(parseISO(event.endDate), "MMMM dd, yyyy") : null
  const startTime = event.startTime || ""
  const endTime = event.endTime || ""
  const isUpcoming = isAfter(parseISO(event.endDate || event.startDate), new Date())

  const isRegistrationOpen =
    !event.registrationDeadline || isAfter(parseISO(event.registrationDeadline), new Date())

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
