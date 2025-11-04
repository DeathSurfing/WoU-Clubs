"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  BookOpen,
  Palette,
  Music,
  Gamepad,
  Leaf,
  Cpu,
  Briefcase,
  Coins,
  Scale,
  Users,
  Award,
  Calendar,
} from "lucide-react"

interface Club {
  id: string
  name: string
  category: string
}

export default function AboutPage() {
  const [clubs, setClubs] = useState<Club[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClubs() {
      try {
        console.log("📡 Fetching clubs for About page...")
        const res = await fetch("/api/clubs")
        if (!res.ok) throw new Error(`Failed to fetch clubs: ${res.status}`)
        const data = await res.json()
        console.log(`✅ Loaded ${data.length} clubs`)
        setClubs(data)
      } catch (err) {
        console.error("❌ Error fetching clubs:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchClubs()
  }, [])

  const categories = [
    { name: "Sustainability & Environment", icon: Leaf },
    { name: "Technology & Engineering", icon: Cpu },
    { name: "Academic", icon: BookOpen },
    { name: "Architecture & Design", icon: Palette },
    { name: "Art & Culture", icon: Music },
    { name: "Business & Entrepreneurship", icon: Briefcase },
    { name: "Finance & Investing", icon: Coins },
    { name: "Law & Policy", icon: Scale },
    { name: "Sports & Gaming", icon: Gamepad },
  ]

  return (
    <div className="pt-24">
      <div className="container">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                About Woxsen University Student Affairs
              </h1>
              <p className="mb-6 text-lg text-muted-foreground">
                Woxsen University Student Affairs serves as the university’s student council, representing the voice of
                the student body and driving initiatives that enhance campus life. Focused on leadership, engagement,
                and community building, it ensures every student feels supported and empowered.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#EE495C]" />
                  <span>
                    {loading ? "..." : clubs.length}+ Active Clubs
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#EE495C]" />
                  <span>1000+ Student Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#EE495C]" />
                  <span>Award-Winning Activities</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#EE495C]" />
                  <span>100+ Events Annually</span>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] overflow-hidden rounded-lg">
              <Image
                src="/Woxsen University Campus.png?height=800&width=600&text=Woxsen+University"
                alt="Woxsen University Campus"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16 py-12 bg-muted/30 rounded-lg">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Our clubs program aims to provide students with opportunities to explore their interests, develop
                leadership skills, and build meaningful connections outside the classroom. We believe that a
                well-rounded education extends beyond academics, and our diverse range of clubs reflects our commitment
                to holistic student development.
              </p>
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    title: "Explore",
                    desc: "Discover new interests and passions through diverse club activities",
                  },
                  {
                    title: "Connect",
                    desc: "Build meaningful relationships with peers who share your interests",
                  },
                  {
                    title: "Lead",
                    desc: "Develop leadership skills by organizing events and managing club activities",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="rounded-lg bg-background p-6 shadow-sm"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Club Categories Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-center">Club Categories</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const count = clubs.filter((c) => c.category === category.name).length
              return (
                <motion.div
                  key={category.name}
                  className="rounded-lg border p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{category.name}</h3>
                  <p className="text-muted-foreground">
                    {loading ? "..." : count} {count === 1 ? "club" : "clubs"}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-3xl font-bold text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "How can I join a club?",
                  answer:
                    "Visit the club's page and click 'Join Club'. You’ll fill a short application or attend open meetings.",
                },
                {
                  question: "Can I start a new club?",
                  answer:
                    "Yes! Gather 10 interested students, a faculty advisor, and submit a proposal to the Student Affairs Office.",
                },
                {
                  question: "Are there any fees to join clubs?",
                  answer:
                    "Most clubs are free to join. Some may have nominal fees for materials or special events.",
                },
                {
                  question: "How much time commitment is expected?",
                  answer:
                    "Most clubs meet weekly or bi-weekly for 1–2 hours. Leaders may have more responsibilities.",
                },
                {
                  question: "Can I be part of multiple clubs?",
                  answer:
                    "You can only be an executive of one club, but can volunteer in multiple based on your interests.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="rounded-lg border p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="mb-2 text-xl font-bold">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16 rounded-lg bg-[#EE495C] p-12 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Get Involved?</h2>
            <p className="mb-8 text-lg">
              Explore our clubs, find your community, and make the most of your university experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/clubs"
                className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#EE495C] shadow transition-colors hover:bg-white/90"
              >
                Browse Clubs
              </a>
              <a
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow transition-colors hover:bg-white/10"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
