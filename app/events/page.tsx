"use client"

import { useState, useEffect, useMemo } from "react"
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 9

  // ✅ Fetch data
  useEffect(() => {
    ;(async () => {
      try {
        const [eventsRes, clubsRes] = await Promise.all([
          fetch("/api/events"),
          fetch("/api/clubs"),
        ])
        if (!eventsRes.ok || !clubsRes.ok) throw new Error("Fetch failed")

        const [eventsData, clubsData] = await Promise.all([
          eventsRes.json(),
          clubsRes.json(),
        ])

        setEvents(eventsData)
        setClubs([{ id: "all", name: "All Clubs" }, ...clubsData.map((c: any) => ({ id: c.id, name: c.name }))])
        setCategories(["All", ...new Set(eventsData.map((e: any) => e.category))].sort())
      } catch (err) {
        console.error("❌ Error fetching data:", err)
      }
    })()
  }, [])

  // ✅ Debounce search input for smoother UX
  const [debouncedQuery, setDebouncedQuery] = useState("")
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300)
    return () => clearTimeout(handler)
  }, [searchQuery])

  // ✅ Filter logic (memoized)
  const filteredEvents = useMemo(() => {
    const now = new Date()
    return events
      .filter((e) => {
        if (
          debouncedQuery &&
          ![e.title, e.description, e.location]
            .some((field) => field?.toLowerCase().includes(debouncedQuery.toLowerCase()))
        )
          return false
        if (selectedCategory !== "All" && e.category !== selectedCategory) return false
        if (selectedClub !== "all" && e.clubId !== selectedClub) return false

        if (selectedDate) {
          const start = parseISO(e.startDate)
          const end = e.endDate ? parseISO(e.endDate) : start
          if (
            !(
              isSameDay(selectedDate, start) ||
              isSameDay(selectedDate, end) ||
              (isAfter(selectedDate, start) && isBefore(selectedDate, end))
            )
          )
            return false
        }

        if (activeTab === "upcoming") return isAfter(parseISO(e.startDate), now) || isToday(parseISO(e.startDate))
        if (activeTab === "past") return isBefore(parseISO(e.endDate || e.startDate), now) && !isToday(parseISO(e.startDate))
        if (activeTab === "today") return isToday(parseISO(e.startDate))
        return true
      })
      .sort((a, b) =>
        activeTab === "past"
          ? parseISO(b.startDate).getTime() - parseISO(a.startDate).getTime()
          : parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime()
      )
  }, [debouncedQuery, selectedCategory, selectedClub, selectedDate, activeTab, events])

  // ✅ Pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
  const currentEvents = filteredEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage)

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedClub("all")
    setSelectedDate(undefined)
    window.umami?.track("events:clear_all")
  }

  const hasActiveFilters =
    searchQuery || selectedCategory !== "All" || selectedClub !== "all" || selectedDate

  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Campus Events</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover upcoming events and activities organized by Woxsen University clubs.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(tab) => {
            setActiveTab(tab)
            window.umami?.track("events:tab_change", { tab })
          }}
          className="mb-8 flex justify-center"
        >
          <TabsList className="grid grid-cols-4 max-w-md">
            {["all", "upcoming", "today", "past"].map((tab) => (
              <TabsTrigger key={tab} value={tab} data-umami-event={`events:tab:${tab}`}>
                {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  window.umami?.track("events:search", { query: e.target.value })
                }}
              />
            </div>

            {/* Category + Club + Date */}
            <div className="grid grid-cols-2 md:flex md:w-auto gap-4">
              <Select
                value={selectedCategory}
                onValueChange={(val) => {
                  setSelectedCategory(val)
                  window.umami?.track("events:filter_category", { category: val })
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
                  window.umami?.track("events:filter_club", { club: val })
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

              <DatePicker
                date={selectedDate}
                setDate={(d) => {
                  setSelectedDate(d)
                  if (d) window.umami?.track("events:filter_date", { date: d.toISOString() })
                }}
                className="w-full md:w-[180px]"
              />
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Active:</span>

              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}
              {selectedCategory !== "All" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedCategory}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("All")} />
                </Badge>
              )}
              {selectedClub !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {clubs.find((c) => c.id === selectedClub)?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedClub("all")} />
                </Badge>
              )}
              {selectedDate && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {format(selectedDate, "MMM dd, yyyy")}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedDate(undefined)} />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Event Grid */}
        {currentEvents.length ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="wait">
                {currentEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: i * 0.03 }}
                    onClick={() => window.umami?.track("events:view_event", { id: event.id, title: event.title })}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  &lt;
                </Button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="icon"
                    className={currentPage === i + 1 ? "bg-primary text-white" : ""}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex min-h-[400px] flex-col items-center justify-center border border-dashed rounded-lg p-8 text-center">
            <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-medium">No events found</h3>
            <p className="text-muted-foreground mb-6">
              {activeTab === "all"
                ? "There are no events matching your filters."
                : `No ${activeTab} events match your filters.`}
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
