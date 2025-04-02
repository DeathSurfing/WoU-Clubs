export interface Club {
  id: string
  name: string
  category: string
  shortDescription: string
  description: string
  image?: string
  coverImage?: string
  mission?: string
  activities?: string[]
  events?: {
    title: string
    date: string
    location: string
    description: string
  }[]
  members?: {
    name: string
    role: string
    avatar?: string
  }[]
  gallery?: string[]
  memberCount?: string
  meetingSchedule?: string
  location?: string
  email?: string
  joinUrl?: string
}

