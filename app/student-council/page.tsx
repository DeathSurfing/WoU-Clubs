"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, ChevronUp, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Mail, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import { teamMembers } from "@/data/student-council"

export default function StudentCouncilPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedRole, setSelectedRole] = useState("All")
  const [selectedYear, setSelectedYear] = useState("All")
  const [filteredMembers, setFilteredMembers] = useState([])
  const [activeTab, setActiveTab] = useState("team")
  const [isClient, setIsClient] = useState(false)

  // Get unique departments, roles, and years from team members data
  const departments = ["All", ...Array.from(new Set(teamMembers.map((m) => m.department)))].sort()
  const roles = ["All", ...Array.from(new Set(teamMembers.map((m) => m.role)))].sort()
  const years = ["All", ...Array.from(new Set(teamMembers.map((m) => m.year)))].sort()

  useEffect(() => {
    setIsClient(true)
    setFilteredMembers(teamMembers) // Initialize with all members
  }, [])

  useEffect(() => {
    if (!isClient) return

    let filtered = [...teamMembers]

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.role.toLowerCase().includes(query) ||
          m.department.toLowerCase().includes(query) ||
          (m.bio && m.bio.toLowerCase().includes(query))
      )
    }

    if (selectedDepartment !== "All") {
      filtered = filtered.filter((m) => m.department === selectedDepartment)
    }
    if (selectedRole !== "All") {
      filtered = filtered.filter((m) => m.role === selectedRole)
    }
    if (selectedYear !== "All") {
      filtered = filtered.filter((m) => m.year === selectedYear)
    }

    setFilteredMembers(filtered)
  }, [searchQuery, selectedDepartment, selectedRole, selectedYear, isClient])

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedDepartment("All")
    setSelectedRole("All")
    setSelectedYear("All")
  }

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

        {/* Single Tab for Meet the Team */}
        <Tabs defaultValue="team" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-1 md:w-auto">
            <TabsTrigger value="team">Meet the Team</TabsTrigger>
          </TabsList>

          <TabsContent value="team" className="space-y-8">
            {/* Search and Filter */}
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
                      {departments.map((dep) => (
                        <SelectItem key={dep} value={dep}>
                          {dep}
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

              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                  </div>

                  {searchQuery && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Search: {searchQuery}
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setSearchQuery("")}>
                        <ChevronUp className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}

                  {selectedDepartment !== "All" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Department: {selectedDepartment}
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setSelectedDepartment("All")}>
                        <ChevronUp className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}

                  {selectedRole !== "All" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Role: {selectedRole}
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setSelectedRole("All")}>
                        <ChevronUp className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}

                  {selectedYear !== "All" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Year: {selectedYear}
                      <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setSelectedYear("All")}>
                        <ChevronUp className="h-3 w-3" />
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
                  <motion.div
                    key={member.id}
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                  >
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
                        {member.quote && (
                          <div className="mt-3 italic text-sm border-l-2 border-gray-300 pl-2">
                            "{member.quote}"
                          </div>
                        )}

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex space-x-2">
                            {member.email && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" asChild>
                                      <a href={`mailto:${member.email}`} aria-label="Email">
                                        <Mail className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Email</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}

                            {member.linkedin && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" asChild>
                                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                        <Linkedin className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>LinkedIn</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}

                            {member.twitter && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" asChild>
                                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                        <Twitter className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Twitter</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
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