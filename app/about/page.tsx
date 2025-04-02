"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { BookOpen, Users, Award, Calendar } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="pt-24">
      <div className="container">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">About Woxsen University Clubs</h1>
              <p className="mb-6 text-lg text-muted-foreground">
                Woxsen University offers a diverse range of clubs and activities designed to enhance the student
                experience, foster personal growth, and build a vibrant campus community.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#EE495C]" />
                  <span>26+ Active Clubs</span>
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
                <motion.div
                  className="rounded-lg bg-background p-6 shadow-sm"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="mb-2 text-xl font-bold">Explore</h3>
                  <p className="text-muted-foreground">
                    Discover new interests and passions through diverse club activities
                  </p>
                </motion.div>
                <motion.div
                  className="rounded-lg bg-background p-6 shadow-sm"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="mb-2 text-xl font-bold">Connect</h3>
                  <p className="text-muted-foreground">
                    Build meaningful relationships with peers who share your interests
                  </p>
                </motion.div>
                <motion.div
                  className="rounded-lg bg-background p-6 shadow-sm"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="mb-2 text-xl font-bold">Lead</h3>
                  <p className="text-muted-foreground">
                    Develop leadership skills by organizing events and managing club activities
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Club Categories Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-center">Club Categories</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Academic & Professional", count: 8, icon: BookOpen },
              { name: "Design & Arts", count: 5, icon: Users },
              { name: "Literary & Communication", count: 3, icon: Award },
              { name: "Cultural & Performing Arts", count: 4, icon: Calendar },
              { name: "Sports & Gaming", count: 2, icon: Users },
              { name: "Photography & Media", count: 1, icon: Award },
              { name: "Social Impact", count: 3, icon: Calendar },
            ].map((category, index) => (
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
                <p className="text-muted-foreground">{category.count} clubs</p>
              </motion.div>
            ))}
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
                    "To join a club, you can visit the club's page on our website and click the 'Join Club' button. You'll be asked to fill out a brief application form. Alternatively, you can attend club meetings which are typically open to all students.",
                },
                {
                  question: "Can I start a new club?",
                  answer:
                    "Yes! If you have an idea for a new club, you'll need to gather at least 10 interested students, find a faculty advisor, and submit a club proposal to the Student Activities Office. The proposal should include the club's purpose, planned activities, and a basic budget.",
                },
                {
                  question: "Are there any fees to join clubs?",
                  answer:
                    "Most clubs at Woxsen University are free to join. Some specialized clubs may have nominal fees to cover materials or activities. Any fees will be clearly indicated on the club's page.",
                },
                {
                  question: "How much time commitment is expected?",
                  answer:
                    "Time commitment varies by club. Most clubs meet weekly or bi-weekly for 1-2 hours. Additional time may be required for special events or projects. Club leaders typically have higher time commitments.",
                },
                {
                  question: "Can I be part of multiple clubs?",
                  answer:
                    "Many students participate in multiple clubs based on their interests. We encourage you to explore different clubs, especially in your first year, to find communities that resonate with you.",
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

