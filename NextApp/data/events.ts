import type { Event } from "@/types/event"

// Helper function to add days to a date
const addDays = (date: Date, days: number): string => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result.toISOString().split("T")[0]
}

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0]
const yesterday = addDays(new Date(), -1)
const tomorrow = addDays(new Date(), 1)
const nextWeek = addDays(new Date(), 7)
const lastWeek = addDays(new Date(), -7)

export const eventsData: Event[] = [
  // Upcoming Events
  {
    id: "tech-talk-ai",
    title: "Tech Talk: The Future of AI & Machine Learning",
    description:
      "Join us for an insightful discussion on the latest trends and future prospects in AI and machine learning. Industry experts will share their knowledge and experiences.",
    startDate: tomorrow,
    startTime: "14:00",
    endTime: "16:00",
    location: "Tech Building, Auditorium",
    category: "Technology",
    clubId: "technology-club",
    image: "/placeholder.svg?height=300&width=500&text=AI+Tech+Talk",
    isFeatured: true,
  },
  {
    id: "design-workshop",
    title: "UI/UX Design Workshop",
    description:
      "Learn the fundamentals of user interface and user experience design in this hands-on workshop. Bring your laptop and be ready to create!",
    startDate: addDays(new Date(), 3),
    startTime: "10:00",
    endTime: "15:00",
    location: "Design Building, Room 202",
    category: "Design",
    clubId: "visual-communication-club",
    image: "/placeholder.svg?height=300&width=500&text=Design+Workshop",
  },
  {
    id: "entrepreneurship-panel",
    title: "Entrepreneurship Panel: From Idea to Startup",
    description:
      "Successful entrepreneurs share their journeys and insights on how to transform innovative ideas into thriving startups.",
    startDate: addDays(new Date(), 5),
    startTime: "16:00",
    endTime: "18:30",
    location: "Business School, Conference Hall",
    category: "Business",
    clubId: "entrepreneurship-club",
    image: "/placeholder.svg?height=300&width=500&text=Entrepreneurship+Panel",
  },
  {
    id: "cultural-fest",
    title: "Annual Cultural Festival: Expressions",
    description:
      "A celebration of diverse cultures through music, dance, art, and food. Join us for a day full of performances and activities.",
    startDate: nextWeek,
    endDate: addDays(new Date(), 9),
    location: "University Campus, Main Grounds",
    category: "Cultural",
    clubId: "cultural-club",
    image: "/placeholder.svg?height=300&width=500&text=Cultural+Festival",
    isFeatured: true,
  },
  {
    id: "finance-seminar",
    title: "Financial Literacy Seminar",
    description:
      "Learn essential financial skills for personal and professional success. Topics include budgeting, investing, and financial planning.",
    startDate: addDays(new Date(), 10),
    startTime: "11:00",
    endTime: "13:00",
    location: "Business School, Room 105",
    category: "Finance",
    clubId: "finwiz-club",
    image: "/placeholder.svg?height=300&width=500&text=Finance+Seminar",
  },
  {
    id: "photography-exhibition",
    title: "Photography Exhibition: Campus Life",
    description: "An exhibition showcasing photographs that capture the essence of campus life at Woxsen University.",
    startDate: addDays(new Date(), 12),
    endDate: addDays(new Date(), 14),
    location: "Arts Building, Gallery",
    category: "Arts",
    clubId: "photography-club",
    image: "/placeholder.svg?height=300&width=500&text=Photography+Exhibition",
  },

  // Today's Events
  {
    id: "debate-competition",
    title: "Inter-College Debate Competition",
    description:
      "A platform for students to showcase their debating skills and critical thinking on contemporary issues.",
    startDate: today,
    startTime: "10:00",
    endTime: "16:00",
    location: "Academic Block, Seminar Hall 2",
    category: "Literary",
    clubId: "debate-club",
    image: "/placeholder.svg?height=300&width=500&text=Debate+Competition",
  },
  {
    id: "music-jam",
    title: "Open Mic & Music Jam Session",
    description: "Showcase your musical talent or enjoy performances by fellow students in this casual jam session.",
    startDate: today,
    startTime: "18:00",
    endTime: "21:00",
    location: "Cultural Center, Music Room",
    category: "Cultural",
    clubId: "music-club",
    image: "/placeholder.svg?height=300&width=500&text=Music+Jam",
  },
  {
    id: "coding-challenge",
    title: "Coding Challenge: Hack the Problem",
    description:
      "Test your programming skills with challenging problems and compete with fellow coders for exciting prizes.",
    startDate: today,
    startTime: "14:00",
    endTime: "20:00",
    location: "Tech Building, Computer Lab",
    category: "Technology",
    clubId: "technology-club",
    image: "/placeholder.svg?height=300&width=500&text=Coding+Challenge",
  },

  // Past Events
  {
    id: "fashion-show",
    title: "Annual Fashion Show: Trends 2023",
    description:
      "A showcase of student designs and fashion trends, featuring collections created by Woxsen's fashion design students.",
    startDate: lastWeek,
    endDate: lastWeek,
    startTime: "18:00",
    endTime: "21:00",
    location: "Design Building, Main Hall",
    category: "Arts",
    clubId: "fashion-club",
    image: "/placeholder.svg?height=300&width=500&text=Fashion+Show",
  },
  {
    id: "sports-tournament",
    title: "Inter-House Sports Tournament",
    description:
      "A week-long sports competition featuring various games including cricket, basketball, football, and athletics.",
    startDate: addDays(new Date(), -14),
    endDate: addDays(new Date(), -7),
    location: "Sports Complex",
    category: "Sports",
    clubId: "sports-club",
    image: "/placeholder.svg?height=300&width=500&text=Sports+Tournament",
  },
  {
    id: "book-club-meeting",
    title: "Book Club Discussion: 'The Midnight Library'",
    description: "Join us for an engaging discussion on Matt Haig's bestselling novel 'The Midnight Library'.",
    startDate: yesterday,
    startTime: "16:00",
    endTime: "18:00",
    location: "Library, Discussion Room",
    category: "Literary",
    clubId: "literature-club",
    image: "/placeholder.svg?height=300&width=500&text=Book+Club",
  },
  {
    id: "alumni-networking",
    title: "Alumni Networking Event",
    description:
      "Connect with Woxsen alumni working in various industries and learn from their experiences and insights.",
    startDate: addDays(new Date(), -3),
    startTime: "17:00",
    endTime: "20:00",
    location: "Business School, Atrium",
    category: "Networking",
    clubId: "entrepreneurship-club",
    image: "/placeholder.svg?height=300&width=500&text=Alumni+Networking",
  },
  {
    id: "dance-workshop",
    title: "Contemporary Dance Workshop",
    description: "Learn contemporary dance techniques from professional dancers in this interactive workshop.",
    startDate: addDays(new Date(), -2),
    startTime: "15:00",
    endTime: "17:00",
    location: "Cultural Center, Dance Studio",
    category: "Cultural",
    clubId: "dance-club",
    image: "/placeholder.svg?height=300&width=500&text=Dance+Workshop",
  },
  {
    id: "sustainability-talk",
    title: "Sustainability Talk: Green Campus Initiatives",
    description: "Learn about ongoing and upcoming sustainability initiatives at Woxsen and how you can contribute.",
    startDate: addDays(new Date(), -5),
    startTime: "11:00",
    endTime: "13:00",
    location: "Science Building, Room 301",
    category: "Social",
    clubId: "sustainability-club",
    image: "/placeholder.svg?height=300&width=500&text=Sustainability+Talk",
  },

  // More Upcoming Events
  {
    id: "hackathon",
    title: "48-Hour Hackathon: Innovate for Impact",
    description:
      "A 48-hour coding marathon where teams develop solutions for real-world problems. Open to all skill levels.",
    startDate: addDays(new Date(), 15),
    endDate: addDays(new Date(), 17),
    location: "Tech Building, Innovation Hub",
    category: "Technology",
    clubId: "technology-club",
    image: "/placeholder.svg?height=300&width=500&text=Hackathon",
    isFeatured: true,
  },
  {
    id: "film-screening",
    title: "Student Film Festival",
    description: "A showcase of short films created by Woxsen students, followed by Q&A sessions with the filmmakers.",
    startDate: addDays(new Date(), 20),
    startTime: "16:00",
    endTime: "21:00",
    location: "Arts Building, Screening Room",
    category: "Cultural",
    clubId: "film-club",
    image: "/placeholder.svg?height=300&width=500&text=Film+Festival",
  },
  {
    id: "robotics-demo",
    title: "Robotics Demonstration Day",
    description: "See the latest robotics projects developed by Woxsen students and interact with the robots.",
    startDate: addDays(new Date(), 25),
    startTime: "10:00",
    endTime: "16:00",
    location: "Tech Building, Robotics Lab",
    category: "Technology",
    clubId: "ai-robotics-club",
    image: "/placeholder.svg?height=300&width=500&text=Robotics+Demo",
  },
  {
    id: "career-fair",
    title: "Annual Career Fair",
    description:
      "Connect with potential employers, explore internship opportunities, and attend career development workshops.",
    startDate: addDays(new Date(), 30),
    endDate: addDays(new Date(), 31),
    location: "Business School, Multiple Venues",
    category: "Networking",
    clubId: "entrepreneurship-club",
    image: "/placeholder.svg?height=300&width=500&text=Career+Fair",
  },
]

