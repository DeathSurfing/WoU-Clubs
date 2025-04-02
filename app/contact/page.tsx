"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    submitted: false,
    loading: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState({ ...formState, loading: true })

    // Simulate form submission
    setTimeout(() => {
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
        submitted: true,
        loading: false,
      })
    }, 1500)
  }

  return (
    <div className="pt-24">
      <div className="container">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Contact Us</h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Have questions about our clubs or need assistance? We're here to help!
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              className="flex flex-col items-center rounded-lg border p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Email</h3>
              <p className="mb-4 text-muted-foreground">For general inquiries</p>
              <a href="mailto:clubs@woxsen.edu.in" className="text-primary hover:underline">
                clubs@woxsen.edu.in
              </a>
            </motion.div>

            <motion.div
              className="flex flex-col items-center rounded-lg border p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Phone</h3>
              <p className="mb-4 text-muted-foreground">Monday to Friday, 9am to 5pm</p>
              <a href="tel:+911234567890" className="text-primary hover:underline">
                +91 12345 67890
              </a>
            </motion.div>

            <motion.div
              className="flex flex-col items-center rounded-lg border p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Location</h3>
              <p className="mb-4 text-muted-foreground">Student Activities Office</p>
              <address className="not-italic text-primary">
                Woxsen University
                <br />
                Kamkole, Sadasivpet
                <br />
                Hyderabad, Telangana
              </address>
            </motion.div>
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="mb-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-lg border p-6">
              <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">clubs@woxsen.edu.in</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">+91 12345 67890</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <address className="not-italic text-muted-foreground">
                      Student Activities Office
                      <br />
                      Woxsen University
                      <br />
                      Kamkole, Sadasivpet
                      <br />
                      Hyderabad, Telangana
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <div className="h-full w-full">
                {/* Placeholder for map - in a real implementation, you would use a map component */}
                <div className="flex h-full w-full items-center justify-center bg-muted p-6">
                  <div className="text-center">
                    <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-xl font-bold">Woxsen University</h3>
                    <p className="mt-2 text-muted-foreground">
                      Kamkole, Sadasivpet
                      <br />
                      Hyderabad, Telangana
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-2xl font-bold text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  question: "How can I get involved with clubs at Woxsen?",
                  answer:
                    "You can browse our clubs directory, attend club fairs at the beginning of each semester, or contact the Student Activities Office for more information.",
                },
                {
                  question: "What if I can't find a club that matches my interests?",
                  answer:
                    "You can propose a new club by gathering interested students and submitting a proposal to the Student Activities Office.",
                },
                {
                  question: "Are there any leadership opportunities within clubs?",
                  answer:
                    "Yes! Most clubs hold elections for leadership positions annually. You can also volunteer for event coordination or specific projects.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="rounded-lg border p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="mb-2 text-lg font-bold">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16 rounded-lg bg-muted p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Visit Us in Person</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              The Student Activities Office is open Monday through Friday from 9am to 5pm. Drop by to learn more about
              our clubs and activities!
            </p>
            <Button className="bg-[#EE495C] hover:bg-[#EE495C]/90" size="lg">
              Schedule a Visit
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

