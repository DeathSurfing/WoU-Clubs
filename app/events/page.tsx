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

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [clubs, setClubs] = useState<{ id: string; name: string }[]>([])
  const [categories, setCategories] = useState<string[]>(["All"])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedClub, setSelectedClub] = useState("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [activeTab, setActiveTab] = useState("upcoming")
  const [filteredEvents, setFilteredEvents] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 9

  // ✅ Fetch events + clubs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, clubsRes] = await Promise.all([
          fetch("/api/events"),
          fetch("/api/clubs"),
        ])

        if (!eventsRes.ok) throw new Error(`Events fetch failed: ${eventsRes.status}`)
        if (!clubsRes.ok) throw new Error(`Clubs fetch failed: ${clubsRes.status}`)

        const eventsData = await eventsRes.json()
        const clubsData = await clubsRes.json()

        setEvents(eventsData)
        setClubs([{ id: "all", name: "All Clubs" }, ...clubsData.map((club: any) => ({ id: club.id, name: club.name }))])

        const uniqueCategories = ["All", ...new Set(eventsData.map((e: any) => e.category))].sort()
        setCategories(uniqueCategories)
        setFilteredEvents(eventsData)
      } catch (err) {
        console.error("❌ Error fetching data:", err)
      }
    }

    fetchData()
  }, [])

  // ✅ Filter logic
  useEffect(() => {
    let filtered = [...events]

    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== "All") filtered = filtered.filter((e) => e.category === selectedCategory)
    if (selectedClub !== "all") filtered = filtered.filter((e) => e.clubId === selectedClub)

    if (selectedDate) {
      filtered = filtered.filter((e) => {
        const start = parseISO(e.startDate)
        const end = e.endDate ? parseISO(e.endDate) : start
        return (
          isSameDay(selectedDate, start) ||
          isSameDay(selectedDate, end) ||
          (isAfter(selectedDate, start) && isBefore(selectedDate, end))
        )
      })
    }

    const now = new Date()
    if (activeTab === "upcoming")
      filtered = filtered.filter((e) => isAfter(parseISO(e.startDate), now) || isToday(parseISO(e.startDate)))
    else if (activeTab === "past")
      filtered = filtered.filter(
        (e) => isBefore(parseISO(e.endDate || e.startDate), now) && !isToday(parseISO(e.startDate))
      )
    else if (activeTab === "today") filtered = filtered.filter((e) => isToday(parseISO(e.startDate)))

    filtered.sort((a, b) =>
      activeTab === "past"
        ? parseISO(b.startDate).getTime() - parseISO(a.startDate).getTime()
        : parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime()
    )

    setFilteredEvents(filtered)
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, selectedClub, selectedDate, activeTab, events])

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
  const currentEvents = filteredEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedClub("all")
    setSelectedDate(undefined)
    window.umami?.track("events_clear_all_filters")
  }

  const hasActiveFilters = searchQuery || selectedCategory !== "All" || selectedClub !== "all" || selectedDate

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
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Campus Events</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover exciting events and activities organized by Woxsen University clubs
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs
          defaultValue="upcoming"
          value={activeTab}
          onValueChange={(tab) => {
            setActiveTab(tab)
            window.umami?.track("events_tab_change", { tab })
          }}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="all" data-umami-event="events_tab_all">All Events</TabsTrigger>
            <TabsTrigger value="upcoming" data-umami-event="events_tab_upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="today" data-umami-event="events_tab_today">Today</TabsTrigger>
            <TabsTrigger value="past" data-umami-event="events_tab_past">Past</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  window.umami?.track("events_search", { query: e.target.value })
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 md:flex md:w-auto">
              <Select
                value={selectedCategory}
                onValueChange={(val) => {
                  setSelectedCategory(val)
                  window.umami?.track("events_filter_category", { category: val })
                }}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedClub}
                onValueChange={(val) => {
                  setSelectedClub(val)
                  window.umami?.track("events_filter_club", { club: val })
                }}
              >
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
                <DatePicker
                  date={selectedDate}
                  setDate={(d) => {
                    setSelectedDate(d)
                    if (d) window.umami?.track("events_filter_date", { date: d.toISOString() })
                  }}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Active filters:</span>
              </div>

              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1" data-umami-event="events_clear_search">
                  Search: {searchQuery}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}

              {selectedCategory !== "All" && (
                <Badge variant="secondary" className="flex items-center gap-1" data-umami-event="events_clear_category">
                  Category: {selectedCategory}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("All")} />
                </Badge>
              )}

              {selectedClub !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1" data-umami-event="events_clear_club">
                  Club: {clubs.find((c) => c.id === selectedClub)?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedClub("all")} />
                </Badge>
              )}

              {selectedDate && (
                <Badge variant="secondary" className="flex items-center gap-1" data-umami-event="events_clear_date">
                  Date: {format(selectedDate, "MMM dd, yyyy")}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedDate(undefined)} />
                </Badge>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={resetFilters}
                data-umami-event="events_clear_all"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Event Grid */}
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
                    onClick={() => window.umami?.track("events_view_event", { title: event.title })}
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
                    onClick={() => {
                      setCurrentPage((p) => Math.max(p - 1, 1))
                      window.umami?.track("events_page_prev")
                    }}
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
                      onClick={() => {
                        setCurrentPage(i + 1)
                        window.umami?.track("events_page_click", { page: i + 1 })
                      }}
                    >
                      {i + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                      window.umami?.track("events_page_next")
                    }}
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
              <Button
                variant="outline"
                onClick={resetFilters}
                data-umami-event="events_reset_filters_empty_state"
              >
                Reset Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
