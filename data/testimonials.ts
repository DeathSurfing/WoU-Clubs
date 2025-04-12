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
    {
      id: "testimonial-1",
      name: "Priya Sharma",
      role: "Student",
      department: "Business Administration",
      year: "Final Year",
      image: "/placeholder.svg?height=200&width=200&text=Priya",
      quote:
        "Being part of the Student Council has been the most rewarding experience of my university life. I've developed leadership skills, made lifelong friends, and had the opportunity to make a real difference on campus. The council truly empowers students to shape their university experience.",
      featured: true,
    },
    {
      id: "testimonial-2",
      name: "Rahul Mehta",
      role: "Former Council President",
      department: "Computer Science",
      year: "Alumni, 2023",
      image: "/placeholder.svg?height=200&width=200&text=Rahul",
      quote:
        "My time as Student Council President taught me more about leadership, conflict resolution, and project management than any class ever could. These skills have been invaluable in my career. Current students should definitely consider getting involved with the council - it's a transformative experience.",
      featured: true,
    },
    {
      id: "testimonial-3",
      name: "Dr. Anjali Desai",
      role: "Faculty Advisor",
      department: "School of Business",
      image: "/placeholder.svg?height=200&width=200&text=Dr.Anjali",
      quote:
        "Working with the Student Council has been incredibly inspiring. The dedication, creativity, and passion these students bring to their roles is remarkable. They consistently go above and beyond to improve campus life and represent their peers effectively.",
      featured: true,
    },
    {
      id: "testimonial-4",
      name: "Vikram Singh",
      role: "Student",
      department: "Design",
      year: "Third Year",
      image: "/placeholder.svg?height=200&width=200&text=Vikram",
      quote:
        "The Student Council's events and initiatives have significantly enhanced my university experience. From cultural festivals to academic support programs, they create opportunities for students to connect, learn, and grow outside the classroom.",
    },
    {
      id: "testimonial-5",
      name: "Neha Kapoor",
      role: "Club President",
      department: "Liberal Arts",
      year: "Final Year",
      image: "/placeholder.svg?height=200&width=200&text=Neha",
      quote:
        "As a club president, I've worked closely with the Student Council to organize events and secure resources. Their support has been instrumental in our club's success. The council truly understands the needs of student organizations and advocates effectively on our behalf.",
    },
    {
      id: "testimonial-6",
      name: "Prof. Rajesh Kumar",
      role: "Dean of Student Affairs",
      image: "/placeholder.svg?height=200&width=200&text=Prof.Rajesh",
      quote:
        "The Student Council serves as an invaluable bridge between the administration and the student body. Their input has helped shape university policies and programs to better serve student needs. The council members demonstrate exceptional professionalism and commitment to their roles.",
    },
    {
      id: "testimonial-7",
      name: "Arjun Patel",
      role: "Student",
      department: "Engineering",
      year: "Second Year",
      image: "/placeholder.svg?height=200&width=200&text=Arjun",
      quote:
        "When I had concerns about study spaces on campus, the Student Council not only listened but took action. Within weeks, they had worked with administration to create new 24-hour study zones. They truly represent student interests and get things done.",
    },
    {
      id: "testimonial-8",
      name: "Zara Ahmed",
      role: "International Student Representative",
      department: "International Relations",
      year: "Third Year",
      image: "/placeholder.svg?height=200&width=200&text=Zara",
      quote:
        "As an international student, the Student Council helped me feel welcome and included from day one. Their cross-cultural events and support services for international students demonstrate their commitment to creating an inclusive campus community.",
    },
  ]
  