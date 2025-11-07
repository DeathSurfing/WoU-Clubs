"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Mail, Linkedin, Twitter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import Fuse from "fuse.js"

export default function StudentCouncilPage() {
  const [members, setMembers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // ✅ Fetch members from API
  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch("/api/student-council")
        const data = await res.json()

        // Sort by photoPosition for consistent layout
        const sorted = data.sort((a: any, b: any) => (a.photoPosition ?? 9999) - (b.photoPosition ?? 9999))
        setMembers(sorted)
      } catch (err) {
        console.error("Error fetching student council:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  // ✅ Setup Fuse.js fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(members, {
        keys: ["name", "role", "department", "year", "bio"],
        threshold: 0.3, // lower = stricter match
      }),
    [members]
  )

  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return members
    return fuse.search(searchQuery).map((result) => result.item)
  }, [searchQuery, members, fuse])

  // Helper to pick the proxied image URL (falls back to raw photo or placeholder)
  const councilImg = (m: any) =>
    m?.id
      ? `/api/images/studentcouncil/${encodeURIComponent(m.id)}`
      : m?.photo || "/placeholder.svg?height=300&width=300&text=Photo"

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Student Council</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the leaders representing and shaping the student experience at Woxsen University.
          </p>
        </motion.div>

        {/* Search Input */}
        <div className="relative max-w-xl mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, role, department..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-track="search_council"
          />
        </div>

        {/* Members Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member._id ?? member.id ?? `member-${index}`}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedMember(member)}
                data-track={`view_member_${member.id ?? member.name.replace(/\s+/g, "_").toLowerCase()}`}
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={councilImg(member)}
                    alt={member.name}
                    width={600}
                    height={750}
                    quality={60}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                    placeholder="blur"
                    blurDataURL="/placeholder.svg?height=10&width=10"
                  />

                  <Badge className="absolute right-2 top-2 bg-[#EE495C]">{member.role}</Badge>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.department}</p>
                  <p className="mt-1 text-sm">{member.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No members found</h3>
            <p className="text-muted-foreground mb-4">Try a different search term</p>
          </div>
        )}

        {/* Member Modal */}
        <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedMember && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-48 h-64 md:h-48 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={councilImg(selectedMember)}
                      alt={selectedMember.name}
                      width={400}
                      height={500}
                      quality={75}
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

                    <div className="flex gap-2 mt-4 flex-wrap">
                      {selectedMember.email && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          data-track={`contact_email_${selectedMember.id ?? selectedMember.name}`}
                        >
                          <a href={`mailto:${selectedMember.email}`}>
                            <Mail className="h-4 w-4 mr-2" /> Email
                          </a>
                        </Button>
                      )}
                      {selectedMember.linkedin && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          data-track={`contact_linkedin_${selectedMember.id ?? selectedMember.name}`}
                        >
                          <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                          </a>
                        </Button>
                      )}
                      {selectedMember.twitter && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          data-track={`contact_twitter_${selectedMember.id ?? selectedMember.name}`}
                        >
                          <a href={selectedMember.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4 mr-2" /> Twitter
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
