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
          name: "Divya Sharma",
          title: "Treasurer",
        },
        {
          id: "general-secretary",
          name: "Karthik Nair",
          title: "General Secretary",
        },
        {
          id: "president",
          name: "Aditya Sharma",
          title: "President",
        },
        {
          id: "senior-vice-president",
          name: "Neha Singh",
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
        {
          id: "facilities-secretary",
          name: "Ananya Desai",
          title: "Facilities Secretary",
        },
        {
          id: "co-treasurer-1",
          name: "Vikram Choudhury",
          title: "Co-Treasurer",
        },
        {
          id: "co-treasurer-2",
          name: "Zara Ahmed",
          title: "Co-Treasurer",
        },
        {
          id: "technical-secretary",
          name: "Rahul Mehta",
          title: "Technical Secretary",
        },
        {
          id: "co-secretary",
          name: "Priya Patel",
          title: "Co-Secretary",
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
          name: "Meera Krishnan",
          title: "VP Student Welfare Officer",
        },
        {
          id: "vp-sports",
          name: "Arjun Kapoor",
          title: "VP Sports Officer",
        },
        {
          id: "co-chair-sports",
          name: "Siddharth Iyer",
          title: "Co-Chair Sports Officer",
        },
        {
          id: "creativity-officer",
          name: "Sneha Reddy",
          title: "Creativity and Innovations Officer",
        },
        {
          id: "co-chair-creativity",
          name: "Varun Menon",
          title: "Co-Chair of Creativity and Innovations",
        },
        {
          id: "mindfulness-officer",
          name: "Divya Sharma",
          title: "Mindfulness and Critical Thinking Officer",
        },
        {
          id: "co-chair-mindfulness",
          name: "Ananya Desai",
          title: "Co-Chair Mindfulness and Critical Thinking",
        },
        {
          id: "lifelong-officer",
          name: "Rohan Malhotra",
          title: "VP - Life Long Officer",
        },
        {
          id: "co-chair-lifelong",
          name: "Vikram Choudhury",
          title: "Co-Chair of Lifelong",
        },
        {
          id: "entrepreneurship-officer",
          name: "Zara Ahmed",
          title: "VP Entrepreneurship Officer",
        },
        {
          id: "co-chair-entrepreneurship",
          name: "Rahul Mehta",
          title: "Entrepreneurship Co-Chair",
        },
        {
          id: "global-citizenship-officer",
          name: "Priya Patel",
          title: "Student VP Global Citizenship",
        },
        {
          id: "co-chair-global-citizenship",
          name: "Meera Krishnan",
          title: "Co-Chair Global Citizenship",
        },
        {
          id: "digital-officer",
          name: "Arjun Kapoor",
          title: "VP- Digital Officer",
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
        {
          id: "mba-representative",
          name: "Sneha Reddy",
          title: "MBA Representative",
        },
        {
          id: "soap-representative",
          name: "Arjun Kapoor",
          title: "SOAP Representative",
        },
        {
          id: "soad-representative",
          name: "Vikram Choudhury",
          title: "SOAD Representative",
        },
        {
          id: "sol-representative",
          name: "Ananya Desai",
          title: "SOL Representative",
        },
        {
          id: "solh-representative",
          name: "Rohan Malhotra",
          title: "SOLH Representative",
        },
        {
          id: "sot-representative",
          name: "Divya Sharma",
          title: "SOT Representative",
        },
        {
          id: "sos-representative",
          name: "Zara Ahmed",
          title: "SOS Representative",
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
        {
          id: "senior-exec-2",
          name: "Varun Menon",
          title: "Senior Executive",
        },
        {
          id: "senior-exec-3",
          name: "Meera Krishnan",
          title: "Senior Executive",
        },
        {
          id: "senior-exec-4",
          name: "Priya Patel",
          title: "Senior Executive",
        },
        {
          id: "senior-exec-5",
          name: "Arjun Kapoor",
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
        {
          id: "marketing-president",
          name: "Sneha Reddy",
          title: "Marketing Club President",
        },
        {
          id: "hr-president",
          name: "Arjun Kapoor",
          title: "HR Club President",
        },
        {
          id: "tech-president",
          name: "Vikram Choudhury",
          title: "Technology Club President",
        },
        {
          id: "ai-president",
          name: "Ananya Desai",
          title: "AI & Robotics Club President",
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
        {
          id: "communications-president",
          name: "Divya Sharma",
          title: "Communications Club President",
        },
        {
          id: "literature-president",
          name: "Zara Ahmed",
          title: "Literature Club President",
        },
        {
          id: "fashion-president",
          name: "Siddharth Iyer",
          title: "Fashion Club President",
        },
        {
          id: "design-president",
          name: "Varun Menon",
          title: "Design Club President",
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
  {
    id: "priya-patel",
    name: "Priya Patel",
    role: "VP Academic Affairs",
    department: "Economics",
    year: "Third Year",
    photo: "/placeholder.svg?height=300&width=300&text=Priya",
    bio: "Priya oversees all academic initiatives and works closely with faculty to improve educational experiences for students.",
    quote: "Education is not the filling of a pail, but the lighting of a fire.",
    email: "priya.patel@woxsen.edu.in",
    linkedin: "https://linkedin.com/in/priyapatel",
  },
  {
    id: "neha-singh",
    name: "Neha Singh",
    role: "VP Student Life",
    department: "Psychology",
    year: "Third Year",
    photo: "/placeholder.svg?height=300&width=300&text=Neha",
    bio: "Neha is responsible for enhancing campus life through various cultural, sports, and recreational activities.",
    quote: "College life is about finding the perfect balance between academics and experiences.",
    email: "neha.singh@woxsen.edu.in",
    twitter: "https://twitter.com/nehasingh",
  },
  {
    id: "karthik-nair",
    name: "Karthik Nair",
    role: "General Secretary",
    department: "International Relations",
    year: "Second Year",
    photo: "/placeholder.svg?height=300&width=300&text=Karthik",
    bio: "Karthik manages the administrative functions of the Student Council and ensures effective communication between students and administration.",
    quote: "Organization is the key to effective representation.",
    email: "karthik.nair@woxsen.edu.in",
    linkedin: "https://linkedin.com/in/karthiknair",
  },
  {
    id: "meera-krishnan",
    name: "Meera Krishnan",
    role: "Student Welfare Officer",
    department: "Social Work",
    year: "Final Year",
    photo: "/placeholder.svg?height=300&width=300&text=Meera",
    bio: "Meera advocates for student welfare, mental health resources, and ensures all students have access to support services.",
    quote: "A healthy mind and body are essential for academic success.",
    email: "meera.krishnan@woxsen.edu.in",
    linkedin: "https://linkedin.com/in/meerakrishnan",
    twitter: "https://twitter.com/meerakrishnan",
  },
  {
    id: "rahul-mehta",
    name: "Rahul Mehta",
    role: "Business School Representative",
    department: "Business Administration",
    year: "Second Year",
    photo: "/placeholder.svg?height=300&width=300&text=Rahul",
    bio: "Rahul represents the interests and concerns of Business School students to the Student Council.",
    email: "rahul.mehta@woxsen.edu.in",
  },
  {
    id: "sneha-reddy",
    name: "Sneha Reddy",
    role: "Engineering School Representative",
    department: "Computer Science",
    year: "Third Year",
    photo: "/placeholder.svg?height=300&width=300&text=Sneha",
    bio: "Sneha advocates for Engineering School students and works on initiatives to enhance technical education.",
    email: "sneha.reddy@woxsen.edu.in",
    linkedin: "https://linkedin.com/in/snehareddy",
  },
  {
    id: "arjun-kapoor",
    name: "Arjun Kapoor",
    role: "Design School Representative",
    department: "Visual Communication",
    year: "Second Year",
    photo: "/placeholder.svg?height=300&width=300&text=Arjun",
    bio: "Arjun represents Design School students and promotes creative initiatives across campus.",
    quote: "Design is not just what it looks like, it's how it works.",
    email: "arjun.kapoor@woxsen.edu.in",
  },
  {
    id: "vikram-choudhury",
    name: "Vikram Choudhury",
    role: "Cultural Committee Chair",
    department: "Liberal Arts",
    year: "Third Year",
    photo: "/placeholder.svg?height=300&width=300&text=Vikram",
    bio: "Vikram leads the Cultural Committee in organizing festivals, performances, and cultural exchange programs.",
    email: "vikram.choudhury@woxsen.edu.in",
    twitter: "https://twitter.com/vikramchoudhury",
  },
  {
    id: "ananya-desai",
    name: "Ananya Desai",
    role: "Sports Committee Chair",
    department: "Physical Education",
    year: "Second Year",
    photo: "/placeholder.svg?height=300&width=300&text=Ananya",
    bio: "Ananya coordinates sports events, tournaments, and fitness programs for the university community.",
    quote: "Sports build character, teach discipline, and create lifelong friendships.",
    email: "ananya.desai@woxsen.edu.in",
    linkedin: "https://linkedin.com/in/ananyaDesai",
  },
  {
    id: "rohan-malhotra",
    name: "Rohan Malhotra",
    role: "Events Committee Chair",
    department: "Event Management",
    year: "Third Year",
    photo: "/placeholder.svg?height=300&width=300&text=Rohan",
    bio: "Rohan plans and executes major campus events, ensuring they are engaging, inclusive, and well-organized.",
    email: "rohan.malhotra@woxsen.edu.in",
    linkedin: "https://linkedin.com/in/rohanmalhotra",
    twitter: "https://twitter.com/rohanmalhotra",
  },
  {
    id: "divya-sharma",
    name: "Divya Sharma",
    role: "Treasurer",
    department: "Finance",
    year: "Third Year",
    photo: "/placeholder.svg?height=300&width=300&text=Divya",
    bio: "Divya manages the Student Council budget, allocates funds to various initiatives, and ensures financial transparency.",
    quote: "Financial responsibility is the foundation of successful student initiatives.",
    email: "divya.sharma@woxsen.edu.in",
    linkedin: "https://linkedin.com/in/divyasharma",
  },
  {
    id: "siddharth-iyer",
    name: "Siddharth Iyer",
    role: "Communications Officer",
    department: "Mass Communication",
    year: "Second Year",
    photo: "/placeholder.svg?height=300&width=300&text=Siddharth",
    bio: "Siddharth handles all communication channels, social media, and public relations for the Student Council.",
    email: "siddharth.iyer@woxsen.edu.in",
    twitter: "https://twitter.com/siddharthiyer",
  },
  {
    id: "zara-ahmed",
    name: "Zara Ahmed",
    role: "Diversity & Inclusion Chair",
    department: "Sociology",
    year: "Final Year",
    photo: "/placeholder.svg?height=300&width=300&text=Zara",
    bio: "Zara promotes diversity and inclusion initiatives, ensuring all students feel welcome and represented on campus.",
    quote: "Diversity is being invited to the party; inclusion is being asked to dance.",
    email: "zara.ahmed@woxsen.edu.in",
    linkedin: "https://linkedin.com/in/zaraahmed",
  },
  {
    id: "varun-menon",
    name: "Varun Menon",
    role: "Health & Wellness Chair",
    department: "Health Sciences",
    year: "Third Year",
    photo: "/placeholder.svg?height=300&width=300&text=Varun",
    bio: "Varun organizes health awareness campaigns, wellness workshops, and ensures mental health resources are accessible to all students.",
    email: "varun.menon@woxsen.edu.in",
    linkedin: "https://linkedin.com/in/varunmenon",
  },
]

