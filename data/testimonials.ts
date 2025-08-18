export interface Testimonial {
    id: string
    name: string
    role: string
    department?: string
    year?: string
    image?: string
    quote: string
    featured?: boolean
  }
  
  export const testimonialData: Testimonial[] = [
    // {
    //   id: "testimonial-1",
    //   name: "Priya Sharma",
    //   role: "Student",
    //   department: "Business Administration",
    //   year: "Final Year",
    //   image: "/placeholder.svg?height=200&width=200&text=Priya",
    //   quote:
    //     "Being part of the Student Council has been the most rewarding experience of my university life. I've developed leadership skills, made lifelong friends, and had the opportunity to make a real difference on campus. The council truly empowers students to shape their university experience.",
    //   featured: true,
    // },
  ]
  