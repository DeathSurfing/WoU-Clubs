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
          id: "president",
          name: "Pranjal Das",
          title: "President",
        },
        {
          id: "senior-vice-president",
          name: "Chris Jose",
          title: "Senior Vice President",
        },
        {
          id: "treasurer",
          name: "Millennium N.",
          title: "Treasurer",
        },
        {
          id: "general-secretary",
          name: "G.Lohit Reddy",
          title: "General Secretary",
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
          id: "operation-secretary",
          name: "D.J. Anshuman",
          title: "Operation Secretary",
        },
        {
          id: "facilities-secretary",
          name: "Aman Prabhat Kumar",
          title: "Facilities Secretary",
        },
        {
          id: "co-treasurer-1",
          name: "Rakshith Cherukuvada",
          title: "Co Treasurer",
        },
        {
          id: "co-treasurer-2",
          name: "Rohan Kambhatla",
          title: "Co Treasurer",
        },
        {
          id: "technical-secretary",
          name: "Aditya Vikram Mahendru",
          title: "Technical Secretary",
        },
        {
          id: "co-secretary",
          name: "Priya Chhugani",
          title: "Co Secretary",
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
          id: "sob-representative-ug",
          name: "Rohith Verma",
          title: "SOB UG Representative",
        },
        {
          id: "sob-representative-pg",
          name: "Preeti Bisht",
          title: "SOB PG Representative",
        },
        {
          id: "sot-representative",
          name: "Tania Solanki",
          title: "SOT Representative",
        },
        {
          id: "soad-representative",
          name: "Suhrudai Nivas",
          title: "SOAD Representative",
        },
        {
          id: "soap-representative",
          name: "Mekala Abhaya Simha Reddy",
          title: "SOAP Representative",
        },
        {
          id: "solh-representative",
          name: "Pranav Golwalkar",
          title: "SOLH Representative",
        },
        {
          id: "sos-representative",
          name: "Simran Gupta",
          title: "SOS Representative",
        },
        {
          id: "sol-representative",
          name: "Mohana Murali Godvari",
          title: "SOL Representative",
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
      title: "School Level Club",
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

