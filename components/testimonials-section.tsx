"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Testimonial } from "@/data/testimonials"

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  featuredOnly?: boolean
  maxDisplay?: number
}

export default function TestimonialsSection({
  testimonials,
  featuredOnly = false,
  maxDisplay = 3,
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Filter testimonials if featuredOnly is true
  const filteredTestimonials = featuredOnly ? testimonials.filter((t) => t.featured) : testimonials

  // Determine how many testimonials to show at once based on screen size
  const getVisibleCount = () => {
    if (isMobile) return 1
    if (filteredTestimonials.length < maxDisplay) return filteredTestimonials.length
    return maxDisplay
  }

  const visibleCount = getVisibleCount()

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Clean up event listener
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === filteredTestimonials.length - visibleCount ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, filteredTestimonials.length, visibleCount])

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredTestimonials.length - visibleCount : prevIndex - 1))
    setAutoplay(false)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === filteredTestimonials.length - visibleCount ? 0 : prevIndex + 1))
    setAutoplay(false)
  }

  // If no testimonials, return nothing
  if (filteredTestimonials.length === 0) {
    return null
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-muted-foreground">
            Hear from our community about their experiences with the Student Council
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            disabled={filteredTestimonials.length <= visibleCount}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={filteredTestimonials.length <= visibleCount}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${
              (currentIndex / filteredTestimonials.length) * (filteredTestimonials.length / visibleCount) * 100
            }%)`,
          }}
        >
          {filteredTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={cn("w-full flex-shrink-0 px-2", isMobile ? "w-full" : `w-1/${visibleCount}`)}
              style={{ flex: `0 0 ${100 / visibleCount}%` }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col">
                  <CardContent className="flex flex-col flex-grow p-6">
                    <div className="mb-4 flex items-center">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full">
                        <Image
                          src={testimonial.image || "/placeholder.svg?height=100&width=100"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="relative flex-grow">
                      <Quote className="absolute -left-1 -top-1 h-6 w-6 text-muted-foreground/20" />
                      <p className="mt-2 text-muted-foreground">{testimonial.quote}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {testimonial.department && <Badge variant="outline">{testimonial.department}</Badge>}
                      {testimonial.year && <Badge variant="outline">{testimonial.year}</Badge>}
                      {testimonial.featured && <Badge className="bg-primary">Featured</Badge>}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      {filteredTestimonials.length > visibleCount && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: filteredTestimonials.length - visibleCount + 1 }, (_, i) => i).map((i) => (
            <button
              key={i}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i === currentIndex ? "bg-primary" : "bg-muted-foreground/30",
              )}
              onClick={() => {
                setCurrentIndex(i)
                setAutoplay(false)
              }}
              aria-label={`Go to testimonial set ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
