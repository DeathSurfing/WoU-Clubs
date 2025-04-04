"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Mail, Linkedin, Twitter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { TeamMember } from "@/types/student-council"

interface TeamMemberCardProps {
  member: TeamMember
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="perspective-1000 h-full">
      <motion.div
        className="relative h-full w-full transform-style-3d transition-transform duration-500"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of card */}
        <Card className="absolute h-full w-full backface-hidden overflow-hidden">
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={member.photo || "/placeholder.svg?height=300&width=300&text=Photo"}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
            <Badge className="absolute right-2 top-2 bg-[#EE495C]">{member.role}</Badge>
          </div>
          <CardContent className="p-4">
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.department}</p>
            <p className="mt-2 text-sm">{member.year}</p>
            <Button variant="ghost" size="sm" className="mt-4 w-full" onClick={() => setIsFlipped(true)}>
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card className="absolute h-full w-full backface-hidden overflow-hidden rotate-y-180">
          <CardContent className="flex h-full flex-col justify-between p-6">
            <div>
              <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Department:</span> {member.department}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Year:</span> {member.year}
                </p>
                {member.quote && (
                  <div className="mt-4">
                    <p className="italic text-sm">"{member.quote}"</p>
                  </div>
                )}
                {member.bio && (
                  <div className="mt-4">
                    <p className="text-sm">{member.bio}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-center space-x-2">
                {member.email && (
                  <Button variant="outline" size="icon" asChild>
                    <a href={`mailto:${member.email}`} aria-label="Email">
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {member.linkedin && (
                  <Button variant="outline" size="icon" asChild>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
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
              <Button variant="ghost" size="sm" className="mt-4 w-full" onClick={() => setIsFlipped(false)}>
                Back to Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

