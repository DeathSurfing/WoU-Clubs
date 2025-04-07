import type { OrgNode, TeamMember } from "@/types/student-council"

// Updated organizational structure data with tier-based hierarchy
export const councilData: OrgNode = {
  id: "council-structure",
  name: "Woxsen Student Council",
  title: "Organizational Structure",
  children: [
    // Tier 1 - Top Leadership
    {
      id: "tier-1",
      name: "Tier 1 - Executive Leadership",
      title: "Top Leadership",
      children: [
        {
          id: "treasurer",
          name: "Millennium.N",
          title: "Treasurer",
        },
        {
          id: "general-secretary",
          name: "G.Lohit Reddy",
          title: "General Secretary",
        },
        {
          id: "president",
          name: "Pranjal",
          title: "President",
        },
        {
          id: "senior-vice-president",
          name: "Chris Jose",
          title: "Senior Vice President",
        },
      ],
    },

    // Tier 2 - Senior Management
    {
      id: "tier-2",
      name: "Tier 2 - Senior Management",
      title: "Senior Management",
      children: [
        {
          id: "operating-secretary",
          name: "Rohan Malhotra",
          title: "Operating Secretary",
        },
      ],
    },
    
    // Tier 3 - Officers
    {
      id: "tier-3",
      name: "Tier 3 - Officers",
      title: "Officers",
      children: [
        {
          id: "vp-student-welfare",
          name: "Vijay Aditya",
          title: "VP Student Welfare Officer",
        },
      ],
    },

    // Tier 4 - School Representatives
    {
      id: "tier-4",
      name: "Tier 4 - School Representatives",
      title: "School Representatives",
      children: [
        {
          id: "bba-representative",
          name: "Rahul Mehta",
          title: "BBA Representative",
        },
      ],
    },

    // Tier 5 - Senior Executives
    {
      id: "tier-5",
      name: "Tier 5 - Senior Executives",
      title: "Senior Executives",
      children: [
        {
          id: "senior-exec-1",
          name: "Siddharth Iyer",
          title: "Senior Executive",
        },
      ],
    },

    // University Level Club Presidents
    {
      id: "university-clubs",
      name: "University Level Club Presidents",
      title: "University Level",
      isLeftSide: true,
      children: [
        {
          id: "finwiz-president",
          name: "Rahul Mehta",
          title: "Finwiz Club President",
        },
      ],
    },

    // School Level Club Presidents
    {
      id: "school-clubs",
      name: "School Level Club Presidents",
      title: "School Level",
      isRightSide: true,
      children: [
        {
          id: "debate-president",
          name: "Rohan Malhotra",
          title: "Debate Club President",
        },
      ],
    },
  ],
}

// Team members data
export const teamMembers: TeamMember[] = [
  {
    id: "aditya-sharma",
    name: "Aditya Sharma",
    role: "President",
    department: "Business Administration",
    year: "Final Year",
    photo: "/placeholder.svg?height=300&width=300&text=Aditya",
    bio: "Aditya is a passionate leader with a vision to enhance student experience at Woxsen University. He has previously served as the Business School Representative.",
    quote:
      "Leadership is about making others better as a result of your presence and making sure that impact lasts in your absence.",
    email: "aditya.sharma@woxsen.edu.in",
    linkedin: "https://linkedin.com/in/adityasharma",
  },
]

