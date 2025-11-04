"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, ChevronUp, Mail, Linkedin, Twitter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

export default function StudentCouncilPage() {
  const [members, setMembers] = useState<any[]>([])
  const [filteredMembers, setFilteredMembers] = useState<any[]>([])
  const [departments, setDepartments] = useState<string[]>(["All"])
  const [roles, setRoles] = useState<string[]>(["All"])
  const [years, setYears] = useState<string[]>(["All"])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedRole, setSelectedRole] = useState("All")
  const [selectedYear, setSelectedYear] = useState("All")
  const [activeTab, setActiveTab] = useState("team")
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // ✅ Fetch from API
  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch("/api/student-council")
        const data = await res.json()
        setMembers(data)
        setFilteredMembers(data)

        // Create dropdown filters dynamically
        const dep = ["All", ...new Set(data.map((m: any) => m.department))].sort()
        const role = ["All", ...new Set(data.map((m: any) => m.role))].sort()
        const year = ["All", ...new Set(data.map((m: any) => m.year))].sort()

        setDepartments(dep)
        setRoles(role)
        setYears(year)
      } catch (err) {
        console.error("Error fetching council members:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  // ✅ Filtering logic
  useEffect(() => {
    let filtered = [...members]

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
  }, [searchQuery, selectedDepartment, selectedRole, selectedYear, members])

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedDepartment("All")
    setSelectedRole("All")
    setSelectedYear("All")
  }

  const hasActiveFilters =
    searchQuery || selectedDepartment !== "All" || selectedRole !== "All" || selectedYear !== "All"

  if (loading) {
    return (
      <div className="pt-24 pb-16 flex justify-center items-center min-h-[60vh]">
        <p>Loading student council members...</p>
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

        <Tabs defaultValue="team" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-1 md:w-auto">
            <TabsTrigger value="team">Meet the Team</TabsTrigger>
          </TabsList>

          <TabsContent value="team" className="space-y-8">
            {/* Search + Filters */}
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
                    <SelectTrigger>
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
                    <SelectTrigger>
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
                    <SelectTrigger>
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
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Active filters:</span>

                  {searchQuery && (
                    <Badge variant="secondary">
                      Search: {searchQuery}
                      <Button variant="ghost" size="icon" className="h-4 w-4 ml-1" onClick={() => setSearchQuery("")}>
                        <ChevronUp className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}

                  {selectedDepartment !== "All" && (
                    <Badge variant="secondary">
                      Department: {selectedDepartment}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1"
                        onClick={() => setSelectedDepartment("All")}
                      >
                        <ChevronUp className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}

                  {selectedRole !== "All" && (
                    <Badge variant="secondary">
                      Role: {selectedRole}
                      <Button variant="ghost" size="icon" className="h-4 w-4 ml-1" onClick={() => setSelectedRole("All")}>
                        <ChevronUp className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}

                  {selectedYear !== "All" && (
                    <Badge variant="secondary">
                      Year: {selectedYear}
                      <Button variant="ghost" size="icon" className="h-4 w-4 ml-1" onClick={() => setSelectedYear("All")}>
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
                    key={member._id}
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="relative h-64 w-full">
                      <Image
                        src={member.photo || "/placeholder.svg?height=300&width=300&text=Photo"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute right-2 top-2 bg-[#EE495C]">{member.role}</Badge>
                    </div>

                    <div className="p-4">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.department}</p>
                      <p className="mt-2 text-sm">{member.year}</p>

                      {member.bio && (
                        <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                      )}
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

        {/* Member Modal */}
        <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedMember && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-48 h-64 md:h-48 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={selectedMember.photo || "/placeholder.svg?height=300&width=300&text=Photo"}
                      alt={selectedMember.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{selectedMember.name}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-2 space-y-2">
                      <Badge className="bg-[#EE495C]">{selectedMember.role}</Badge>
                      <p className="text-sm text-muted-foreground">{selectedMember.department}</p>
                      <p className="text-sm font-medium">{selectedMember.year}</p>
                    </div>

                    <div className="flex gap-2 mt-4">
                      {selectedMember.email && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={`mailto:${selectedMember.email}`}>
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </a>
                        </Button>
                      )}
                      {selectedMember.linkedin && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4 mr-2" />
                            LinkedIn
                          </a>
                        </Button>
                      )}
                      {selectedMember.twitter && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={selectedMember.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4 mr-2" />
                            Twitter
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {selectedMember.bio && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedMember.bio}</p>
                  </div>
                )}

                {selectedMember.quote && (
                  <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-[#EE495C]">
                    <p className="text-sm italic">"{selectedMember.quote}"</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
