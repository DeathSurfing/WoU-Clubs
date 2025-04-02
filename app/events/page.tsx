"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, parseISO, isAfter, isBefore, isToday, isSameDay } from "date-fns"
import { Search, Calendar, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePicker } from "@/components/ui/date-picker"
import EventCard from "@/components/events/event-card"
import { eventsData } from "@/data/events"
import { clubsData } from "@/data/clubs"

// Get unique categories from events data
const categories = ["All", ...Array.from(new Set(eventsData.map((event) => event.category)))].sort()

// Get unique clubs from clubs data
const clubs = [{ id: "all", name: "All Clubs" }, ...clubsData.map((club) => ({ id: club.id, name: club.name }))]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedClub, setSelectedClub] = useState("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [activeTab, setActiveTab] = useState("upcoming")
  const [filteredEvents, setFilteredEvents] = useState(eventsData)
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 9

  // Filter events based on search, category, club, date, and tab
  useEffect(() => {
    let filtered = [...eventsData]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((event) => event.category === selectedCategory)
    }

    // Filter by club
    if (selectedClub !== "all") {
      filtered = filtered.filter((event) => event.clubId === selectedClub)
    }

    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter((event) => {
        const eventStartDate = parseISO(event.startDate)
        const eventEndDate = event.endDate ? parseISO(event.endDate) : eventStartDate

        // Check if the selected date falls within the event's date range
        return (
          isSameDay(selectedDate, eventStartDate) ||
          isSameDay(selectedDate, eventEndDate) ||
          (isAfter(selectedDate, eventStartDate) && isBefore(selectedDate, eventEndDate))
        )
      })
    }

    // Filter by tab (all, upcoming, past, today)
    const now = new Date()
    if (activeTab === "upcoming") {
      filtered = filtered.filter(
        (event) => isAfter(parseISO(event.startDate), now) || isToday(parseISO(event.startDate)),
      )
    } else if (activeTab === "past") {
      filtered = filtered.filter(
        (event) => isBefore(parseISO(event.endDate || event.startDate), now) && !isToday(parseISO(event.startDate)),
      )
    } else if (activeTab === "today") {
      filtered = filtered.filter((event) => isToday(parseISO(event.startDate)))
    }
    // "all" tab doesn't filter by date status

    // Sort events by date (upcoming first for "all" and "upcoming" tabs, recent first for "past" tab)
    filtered.sort((a, b) => {
      if (activeTab === "past") {
        return parseISO(b.startDate).getTime() - parseISO(a.startDate).getTime()
      }
      return parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime()
    })

    setFilteredEvents(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, selectedCategory, selectedClub, selectedDate, activeTab])

  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
  const currentEvents = filteredEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedClub("all")
    setSelectedDate(undefined)
  }

  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedCategory !== "All" || selectedClub !== "all" || selectedDate

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Campus Events</h1>
          <p className="text-lg text-muted-foreground">
            Discover exciting events and activities organized by Woxsen University clubs
          </p>
        </motion.div>

        {/* Tabs for event timeline */}
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 md:flex md:w-auto">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedClub} onValueChange={setSelectedClub}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Club" />
                </SelectTrigger>
                <SelectContent>
                  {clubs.map((club) => (
                    <SelectItem key={club.id} value={club.id}>
                      {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="col-span-2 md:col-span-1">
                <DatePicker date={selectedDate} setDate={setSelectedDate} className="w-full" />
              </div>
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
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}

              {selectedCategory !== "All" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {selectedCategory}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("All")} />
                </Badge>
              )}

              {selectedClub !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Club: {clubs.find((c) => c.id === selectedClub)?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedClub("all")} />
                </Badge>
              )}

              {selectedDate && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Date: {format(selectedDate, "MMM dd, yyyy")}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedDate(undefined)} />
                </Badge>
              )}

              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={resetFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Events Grid */}
        {currentEvents.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="wait">
                {currentEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </Button>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="icon"
                      className={currentPage === i + 1 ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-medium">No events found</h3>
            <p className="mb-6 text-muted-foreground">
              {activeTab === "all"
                ? "There are no events matching your criteria."
                : activeTab === "upcoming"
                  ? "There are no upcoming events matching your criteria."
                  : activeTab === "today"
                    ? "There are no events happening today matching your criteria."
                    : "There are no past events matching your criteria."}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

