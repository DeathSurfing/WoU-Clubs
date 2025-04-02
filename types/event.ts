export interface Event {
  id: string
  title: string
  description: string
  startDate: string // ISO format: YYYY-MM-DD
  endDate?: string // ISO format: YYYY-MM-DD
  startTime?: string // 24-hour format: HH:MM
  endTime?: string // 24-hour format: HH:MM
  location: string
  category: string
  clubId: string
  image?: string
  registrationLink?: string
  registrationDeadline?: string // ISO format: YYYY-MM-DD
  capacity?: number
  attendees?: number
  isVirtual?: boolean
  virtualLink?: string
  isFeatured?: boolean
}

