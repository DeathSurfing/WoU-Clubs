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
        {
          id: "vp-sports-welfare",
          name: "Rounak Kumar Khursija",
          title: "VP Sports Officer",
        },
        {
          id: "vp-sports-cochair",
          name: "Anannya Joshi",
          title: "Co-Chair Sports Officer",
        },
        {
          id: "vp-digital",
          name: "Mir Inayat Ali Khan",
          title: "VP Digital Officer",
        },
        {
          id: "vp-digital-cochair",
          name: "Madhumitha",
          title: "Co-chair Student Welfare Officer",
        },
        {
          id: "vp-m&c",
          name: "Zia Ali",
          title: "VP Mindfulness and Critical Thinking Officer",
        },
        {
          id: "vp-m&c-cochair",
          name: "Divya Nair",
          title: "Co-chair Mindfulness and Critical Thinking Officer",
        },
        {
          id: "vp-Entrepreneurship",
          name: "Ankith malupally",
          title: "VP Entrepreneurship Officer",
        },
        {
          id: "vp-Entrepreneurship-cochair",
          name: "Rahul c reddy",
          title: "Co-chair Entrepreneurship Officer",
        },
        {
          id: "vp-Global-Citizenship",
          name: "Asha Sanjaykumar Bhola",
          title: "VP Global Citizenship Officer",
        },
        {
          id: "vp-Global-Citizenship-cochair",
          name: "Aditya Pawar",
          title: "Co-chair Global Citizenship Officer",
        },
        {
          id: "vp-c&i",
          name: "Vedhant",
          title: "VP Creativity And Innovations Officer",
        },
        {
          id: "vp-c&i-cochair",
          name: "Ankith malupally",
          title: "Co-chair Creativity And Innovations Officer",
        },
        {
          id: "vp-LLC",
          name: "Jairaj Chilukala",
          title: "VP Lifelong Learning Officer",
        },
        {
          id: "vp-LLC-cochair",
          name: "Maniya goyal",
          title: "Co-chair Entrepreneurship Officer",
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
          id: "Film Club",
          name: "Harshith Tvss",
          title: "Film Club President",
        },
        {
          id: "Club Genesis",
          name: "Disha Bansal",
          title: "Club Genesis President",
        },
        {
          id: "finwiz-president",
          name: "Rahul Mehta",
          title: "Finwiz Club President",
        },
        {
          id: "Nexus Club",
          name: "Nimra Shahed",
          title: "Nexus Club President",
        },
        {
          id: "Debate Club",
          name: "Jahnavi G",
          title: "Debate Club President",
        },
        {
          id: "James A F Stoner Sustainability Club",
          name: "Namratha Saravani Sagiraju",
          title: "James A F Stoner Sustainability Club President",
        },
        {
          id: "Jashn The Cultural Club",
          name: "Bollam Thanusha Reddy",
          title: "Jashn The Cultural Club President",
        },
        {
          id: "Just Naach",
          name: "Pranaya Srinivas",
          title: "Just Naach Club President",
        },
        {
          id: "Jashn The Cultural Club",
          name: "Bollam Thanusha Reddy",
          title: "Jashn The Cultural Club President",
        },
        {
          id: "Marketing Directors Club",
          name: "Prashant Khirwar",
          title: "Marketing Directors Club President",
        },
        {
          id: "Rotaract Club Club",
          name: "Sofia Villamarin Rodriguez",
          title: "Rotaract Club President",
        },
        {
          id: "Skribble Club",
          name: "Harsh Garje",
          title: "Skribble Club President",
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
          id: "Aesthetrix Club",
          name: "Pothineni Urmila Choudary",
          title: "Aesthetrix Club President",
        },
        {
          id: "Communication Design Club",
          name: "Chinmai Sai Daivala",
          title: "Communication Design Club President",
        },
        {
          id: "Crowdcore - The Marketing Club",
          name: "Nandann.M.V",
          title: "Crowdcore Club President",
        },
        {
          id: "Fashion Club",
          name: "Aarya Makhariya",
          title: "Fashion Club President",
        },
        {
          id: "Finwiz - The Finance Club",
          name: "Akshita B",
          title: "Finwiz Club President",
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

