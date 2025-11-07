"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { faqData, type FAQItem } from "@/data/faq"
import { testimonialData } from "@/data/testimonials"
import TestimonialsSection from "@/components/testimonials-section"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredFAQs, setFilteredFAQs] = useState<FAQItem[]>(faqData)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // ✅ Automatically re-filter when search or category changes
  useEffect(() => {
    let filtered = [...faqData]

    const query = searchQuery.toLowerCase().trim()
    if (query !== "") {
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === selectedCategory)
    }

    setFilteredFAQs(filtered)
  }, [searchQuery, selectedCategory])

  // Categories
  const categories = [
    { id: "all", name: "All Questions" },
    { id: "general", name: "General" },
    { id: "council", name: "Council" },
    { id: "events", name: "Events" },
    { id: "resources", name: "Resources" },
    { id: "involvement", name: "Getting Involved" },
  ]

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setFilteredFAQs(faqData)
  }

  const toggleAccordionItem = (itemId: string, question: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId],
    )

    // ✅ Track FAQ open/close in Umami
    window.umami?.track("faq_toggle", { question })
  }

  const hasActiveFilters = searchQuery || selectedCategory !== "all"

  return (
    <div className="pt-24 pb-16">
      <div className="container px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about the Woxsen University Student Council,
            its activities, and available resources.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search questions or answers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  window.umami?.track("faq_search", { query: e.target.value })
                }}
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 px-1">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(category.id)
                    window.umami?.track("faq_category_select", { category: category.name })
                  }}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Active filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Active filters:</span>
              </div>

              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => {
                      setSearchQuery("")
                      window.umami?.track("faq_clear_search")
                    }}
                  >
                    <ChevronUp className="h-3 w-3" />
                    <span className="sr-only">Remove search filter</span>
                  </Button>
                </Badge>
              )}

              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {categories.find((c) => c.id === selectedCategory)?.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => {
                      setSelectedCategory("all")
                      window.umami?.track("faq_clear_category")
                    }}
                  >
                    <ChevronUp className="h-3 w-3" />
                    <span className="sr-only">Remove category filter</span>
                  </Button>
                </Badge>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  resetFilters()
                  window.umami?.track("faq_clear_all_filters")
                }}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        {filteredFAQs.length > 0 ? (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Browse through our most commonly asked questions and answers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger
                      onClick={() => toggleAccordionItem(faq.id, faq.question)}
                      className="text-left font-medium"
                      data-umami-event={`faq_expand_${faq.question}`}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ) : (
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center mb-12">
            <h3 className="mb-2 text-xl font-medium">No matching questions found</h3>
            <p className="mb-6 text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={() => {
                  resetFilters()
                  window.umami?.track("faq_reset_filters")
                }}
              >
                Reset Filters
              </Button>
            )}
          </div>
        )}

        {/* Contact Section */}
        <Card className="mb-12 bg-muted/30">
          <CardHeader>
            <CardTitle>Still Have Questions?</CardTitle>
            <CardDescription>
              Can’t find what you’re looking for? Reach out to us directly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Visit Our Office</h3>
                <p className="text-sm text-muted-foreground">
                  Student Council Room, Law block ground floor <br />
                  <strong>Office Hours:</strong> Mon–Fri, 9 AM – 11 PM
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Email Us</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We’ll get back to you within 24 hours. <br />
                  <a
                    href="mailto:studentaffairs@woxsen.edu.in"
                    className="text-primary hover:underline"
                    data-umami-event="faq_email_click"
                  >
                    studentaffairs@woxsen.edu.in
                  </a>
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  data-umami-event="faq_compose_email"
                >
                  <a href="mailto:studentaffairs@woxsen.edu.in">Compose Email</a>
                </Button>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Schedule a Meeting</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Book a one-on-one meeting with a Student Council representative.
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  data-umami-event="faq_book_appointment"
                >
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScHqQeeBO3xhLQFyjU7zfV6dqvU_aVgWdFu71UQ4OF2ZKPOpw/viewform?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Appointment
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            What Students Say About Us
          </h2>
          <TestimonialsSection testimonials={testimonialData} />
        </div>
      </div>
    </div>
  )
}
