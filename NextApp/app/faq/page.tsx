"use client"

import type React from "react"

import { useState } from "react"
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

  // Get unique categories
  const categories = [
    { id: "all", name: "All Questions" },
    { id: "general", name: "General" },
    { id: "council", name: "Council" },
    { id: "events", name: "Events" },
    { id: "resources", name: "Resources" },
    { id: "involvement", name: "Getting Involved" },
  ]

  // Filter FAQs based on search query and selected category
  const filterFAQs = () => {
    let filtered = [...faqData]

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(
        (faq) => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === selectedCategory)
    }

    setFilteredFAQs(filtered)
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    filterFAQs()
  }

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterFAQs()
  }

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setFilteredFAQs(faqData)
  }

  // Toggle accordion item
  const toggleAccordionItem = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedCategory !== "all"

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about the Woxsen University Student Council, its activities, and available
            resources.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search questions or answers..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category.id)}
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
                      filterFAQs()
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
                      filterFAQs()
                    }}
                  >
                    <ChevronUp className="h-3 w-3" />
                    <span className="sr-only">Remove category filter</span>
                  </Button>
                </Badge>
              )}

              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={resetFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* FAQ Accordion */}
        {filteredFAQs.length > 0 ? (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Browse through our most commonly asked questions and answers</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger onClick={() => toggleAccordionItem(faq.id)} className="text-left font-medium">
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
            <p className="mb-6 text-muted-foreground">Try adjusting your search or filter criteria</p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            )}
          </div>
        )}

        {/* Still Have Questions Section */}
        <Card className="mb-12 bg-muted/30">
          <CardHeader>
            <CardTitle>Still Have Questions?</CardTitle>
            <CardDescription>Can't find what you're looking for? Reach out to us directly.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Visit Our Office</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Student Council Office, Main Academic Building, 2nd Floor
                  <br />
                  Office Hours: Monday-Friday, 10 AM - 4 PM
                </p>
                <Button variant="outline" size="sm">
                  Get Directions
                </Button>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Email Us</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Send us your questions or concerns and we'll get back to you within 24 hours.
                  <br />
                  <a href="mailto:studentcouncil@woxsen.edu.in" className="text-primary hover:underline">
                    studentcouncil@woxsen.edu.in
                  </a>
                </p>
                <Button variant="outline" size="sm">
                  Compose Email
                </Button>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-lg font-semibold">Schedule a Meeting</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Book a one-on-one meeting with a Student Council representative to discuss your questions in detail.
                </p>
                <Button variant="outline" size="sm">
                  Book Appointment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">What Students Say About Us</h2>
          <TestimonialsSection testimonials={testimonialData} />
        </div>
      </div>
    </div>
  )
}
