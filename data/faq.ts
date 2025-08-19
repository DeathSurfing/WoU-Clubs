export interface FAQItem {
    id: string
    question: string
    answer: string
    category: "general" | "council" | "events" | "resources" | "involvement"
  }
  
  export const faqData: FAQItem[] = [
    // General Questions
    {
      id: "faq-1",
      question: "What is the Woxsen University Student Council?",
      answer:
        "The Woxsen University Student Council is the official student governing body that represents the interests of all students. It serves as a bridge between the student body and university administration, organizing events, managing clubs, and advocating for student needs and concerns.",
      category: "general",
    },
    {
      id: "faq-2",
      question: "How is the Student Council structured?",
      answer:
        "The Student Council follows a tier-based hierarchical structure with five tiers: Tier 1 includes top leadership positions like President, Senior Vice President, General Secretary, and Treasurer. Tier 2 consists of secretaries and co-treasurers. Tier 3 includes various VP and officer positions. Tier 4 comprises school representatives, and Tier 5 includes senior executives. Additionally, university and school-level club presidents are positioned on the left and right sides of the structure, respectively.",
      category: "general",
    },
    {
      id: "faq-3",
      question: "When and where does the Student Council meet?",
      answer:
        "The Student Council holds general meetings every two weeks on Wednesdays at 5:00 PM in the Student Council Chamber located in the Main Academic Building. Executive committee meetings occur weekly. Special meetings may be called as needed. Meeting schedules are posted on the council's notice board and social media channels.",
      category: "general",
    },
  
    // Council Questions
    {
      id: "faq-4",
      question: "How can I contact the Student Council with questions or concerns?",
      answer:
        "You can contact the Student Council through multiple channels: email at studentcouncil@woxsen.edu.in, through our social media accounts, by visiting our office during office hours (Monday-Friday, 10 AM - 4 PM), or by approaching any council member directly. We also have a suggestion box located outside our office for anonymous feedback.",
      category: "council",
    },
    {
      id: "faq-5",
      question: "What are the responsibilities of the Student Council?",
      answer:
        "The Student Council's responsibilities include representing student interests to university administration, organizing campus events and activities, overseeing student clubs and organizations, managing allocated budgets for student activities, addressing student grievances, promoting student welfare, and fostering a positive campus environment.",
      category: "council",
    },
    {
      id: "faq-6",
      question: "How does the Student Council make decisions?",
      answer:
        "The Student Council makes decisions through a democratic process. For most matters, proposals are discussed during council meetings and put to a vote, with a simple majority required for approval. Major decisions may require a two-thirds majority. The council also seeks student input through surveys, town halls, and open forums before making significant decisions affecting the student body.",
      category: "council",
    },
  
    // Events Questions
    {
      id: "faq-7",
      question: "How can I find out about upcoming events organized by the Student Council?",
      answer:
        "Information about upcoming events is shared through multiple channels: the official Student Council website, our social media accounts (Instagram, Facebook, and Twitter), digital notice boards across campus, email newsletters, and the Woxsen University mobile app. You can also subscribe to our event calendar for automatic updates.",
      category: "events",
    },
    {
      id: "faq-8",
      question: "Can I propose an event idea to the Student Council?",
      answer:
        "We welcome event ideas from all students. You can submit your proposal through our online form, by emailing studentaffairs@woxsen.edu.in, or by meeting with the Events Committee Chair during office hours. Please include details about the event concept, potential date, target audience, and resource requirements in your proposal.",
      category: "events",
    },
    {
      id: "faq-9",
      question: "How does the Student Council select which events to organize?",
      answer:
        "Event selection is based on several factors: alignment with student interests and university values, available budget and resources, calendar availability, potential impact and participation, and diversity of event types throughout the academic year. The Events Committee reviews all proposals and makes recommendations to the full council for approval.",
      category: "events",
    },
  
    // Resources Questions
    {
      id: "faq-10",
      question: "What resources does the Student Council provide for students?",
      answer:
        "The Student Council provides various resources including: funding for student initiatives and club activities, leadership development workshops, mentorship programs, academic support services, mental health and wellness resources, career development opportunities, and advocacy support for addressing student concerns with university administration.",
      category: "resources",
    },
    {
      id: "faq-11",
      question: "How can clubs request funding from the Student Council?",
      answer:
        "Registered clubs can request funding by submitting a detailed budget proposal through our online portal at least three weeks before the funds are needed. The proposal should include the purpose of the funding, itemized expenses, expected outcomes, and how it benefits the student body. The Finance Committee reviews all requests and allocates funds based on availability and merit.",
      category: "resources",
    },
    {
      id: "faq-12",
      question: "Does the Student Council offer any scholarships or financial aid?",
      answer:
        "While the Student Council doesn't directly provide scholarships, we work closely with the university's financial aid office to advocate for increased scholarship opportunities. We also maintain a resource guide about available scholarships, grants, and financial aid options, and can direct students to the appropriate university departments for assistance.",
      category: "resources",
    },
  
    // Involvement Questions
    {
      id: "faq-13",
      question: "How can I join the Student Council?",
      answer:
        "Students can join the Student Council through annual elections held at the beginning of the academic year. To run for a position, you must be in good academic standing and submit a nomination form during the election period. Some positions may have specific eligibility requirements. Alternatively, you can volunteer for council committees without being an elected member.",
      category: "involvement",
    },
    {
      id: "faq-14",
      question: "What positions are available on the Student Council?",
      answer:
        "The Student Council has various positions across five tiers, including: Executive positions (President, Vice President, General Secretary, Treasurer), Department Secretaries, School Representatives, Committee Chairs (Events, Academic Affairs, Student Welfare, etc.), and general council members. Each position has specific responsibilities and requirements.",
      category: "involvement",
    },
    {
      id: "faq-15",
      question: "Can first-year students join the Student Council?",
      answer:
        "Yes, first-year students can join the Student Council! We reserve specific positions for first-year representatives to ensure new students have a voice. First-year elections are typically held in October, after new students have had time to settle in. First-years can also join council committees as volunteers immediately upon arrival.",
      category: "involvement",
    },
  ]
  