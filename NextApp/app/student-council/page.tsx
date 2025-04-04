"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrganizationChart from "@/components/student-council/organization-chart"
import { councilData, teamMembers } from "@/data/student-council"
import Image from "next/image"
import { Mail, Linkedin, Twitter } from "lucide-react"

export default function StudentCouncilPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedRole, setSelectedRole] = useState("All")
  const [selectedYear, setSelectedYear] = useState("All")
  const [filteredMembers, setFilteredMembers] = useState<typeof teamMembers>([])
  const [activeTab, setActiveTab] = useState("structure")
  const [isClient, setIsClient] = useState(false)

  // Get unique departments, roles, and years from team members data
  const departments = ["All", ...Array.from(new Set(teamMembers.map((member) => member.department)))].sort()
  const roles = ["All", ...Array.from(new Set(teamMembers.map((member) => member.role)))].sort()
  const years = ["All", ...Array.from(new Set(teamMembers.map((member) => member.year)))].sort()

  useEffect(() => {
    setIsClient(true)
    setFilteredMembers(teamMembers) // Initialize with all members
  }, [])

  // Filter team members based on search query and selected filters
  useEffect(() => {
    if (!isClient) return

    let filtered = [...teamMembers]

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(query) ||
          member.role.toLowerCase().includes(query) ||
          member.department.toLowerCase().includes(query) ||
          (member.bio && member.bio.toLowerCase().includes(query)),
      )
    }

    // Filter by department
    if (selectedDepartment !== "All") {
      filtered = filtered.filter((member) => member.department === selectedDepartment)
    }

    // Filter by role
    if (selectedRole !== "All") {
      filtered = filtered.filter((member) => member.role === selectedRole)
    }

    // Filter by year
    if (selectedYear !== "All") {
      filtered = filtered.filter((member) => member.year === selectedYear)
    }

    setFilteredMembers(filtered)
  }, [searchQuery, selectedDepartment, selectedRole, selectedYear, isClient])

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedDepartment("All")
    setSelectedRole("All")
    setSelectedYear("All")
  }

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery || selectedDepartment !== "All" || selectedRole !== "All" || selectedYear !== "All"

  if (!isClient) {
    return (
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Student Council</h1>
            <p className="text-lg text-muted-foreground">
              Meet the dedicated student leaders who represent and advocate for the Woxsen University student body
            </p>
          </div>
          <div className="h-[400px] flex items-center justify-center">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Student Council</h1>
          <p className="text-lg text-muted-foreground">
            Meet the dedicated student leaders who represent and advocate for the Woxsen University student body
          </p>
        </motion.div>

        {/* Tabs for structure and team */}
        <Tabs defaultValue="structure" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 md:w-auto">
            <TabsTrigger value="structure">Council Structure</TabsTrigger>
            <TabsTrigger value="team">Meet the Team</TabsTrigger>
          </TabsList>

          {/* Council Structure Tab */}
          <TabsContent value="structure" className="space-y-8">
            <div className="rounded-lg border p-6">
              <h2 className="mb-6 text-2xl font-bold">Organizational Structure</h2>
              <p className="mb-8 text-muted-foreground">
                The Student Council at Woxsen University operates with a hierarchical structure designed to effectively
                represent student interests across various departments and activities. Click on positions to expand or
                collapse the organizational chart.
              </p>
              <div className="overflow-x-auto pb-6">
                <div className="min-w-[800px]">
                  <OrganizationChart data={councilData} />
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-2xl font-bold">Council Responsibilities</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Student Advocacy",
                    description:
                      "Represent student interests and concerns to university administration, faculty, and staff.",
                  },
                  {
                    title: "Event Planning",
                    description:
                      "Organize and coordinate campus-wide events, cultural programs, and recreational activities.",
                  },
                  {
                    title: "Club Coordination",
                    description:
                      "Oversee and support the activities of various student clubs and organizations on campus.",
                  },
                  {
                    title: "Academic Support",
                    description:
                      "Work with faculty to enhance academic resources and address student academic concerns.",
                  },
                  {
                    title: "Community Outreach",
                    description: "Develop and implement community service projects and initiatives beyond campus.",
                  },
                  {
                    title: "Student Welfare",
                    description:
                      "Ensure student well-being through health, safety, and wellness programs and policies.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="rounded-lg border p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Meet the Team Tab */}
          <TabsContent value="team" className="space-y-8">
            {/* Search and Filter Section */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search council members..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem key={department} value={department}>
                          {department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                        onClick={() => setSearchQuery("")}
                      >
                        <ChevronUp className="h-3 w-3" />
                        <span className="sr-only">Remove search filter</span>
                      </Button>
                    </Badge>
                  )}

                  {selectedDepartment !== "All" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Department: {selectedDepartment}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => setSelectedDepartment("All")}
                      >
                        <ChevronUp className="h-3 w-3" />
                        <span className="sr-only">Remove department filter</span>
                      </Button>
                    </Badge>
                  )}

                  {selectedRole !== "All" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Role: {selectedRole}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => setSelectedRole("All")}
                      >
                        <ChevronUp className="h-3 w-3" />
                        <span className="sr-only">Remove role filter</span>
                      </Button>
                    </Badge>
                  )}

                  {selectedYear !== "All" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Year: {selectedYear}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => setSelectedYear("All")}
                      >
                        <ChevronUp className="h-3 w-3" />
                        <span className="sr-only">Remove year filter</span>
                      </Button>
                    </Badge>
                  )}

                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={resetFilters}>
                    Clear all
                  </Button>
                </div>
              )}
            </div>

            {/* Team Members Grid */}
            {filteredMembers.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg overflow-hidden">
                    <div className="relative h-64 w-full">
                      <Image
                        src={member.photo || "/placeholder.svg?height=300&width=300&text=Photo"}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <Badge className="absolute right-2 top-2 bg-[#EE495C]">{member.role}</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.department}</p>
                      <p className="mt-2 text-sm">{member.year}</p>

                      <div className="mt-4 space-y-2">
                        {member.bio && <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>}

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex space-x-2">
                            {member.email && (
                              <Button variant="outline" size="icon" asChild>
                                <a href={`mailto:${member.email}`} aria-label="Email">
                                  <Mail className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {member.linkedin && (
                              <Button variant="outline" size="icon" asChild>
                                <a
                                  href={member.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="LinkedIn"
                                >
                                  <Linkedin className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {member.twitter && (
                              <Button variant="outline" size="icon" asChild>
                                <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                  <Twitter className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <h3 className="mb-2 text-xl font-medium">No council members found</h3>
                <p className="mb-6 text-muted-foreground">Try adjusting your search or filter criteria</p>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}