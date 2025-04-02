"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Club } from "@/types/club"

interface ClubCardProps {
  club: Club
}

export default function ClubCard({ club }: ClubCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="h-full overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={club.image || "/placeholder.svg?height=300&width=500"}
            alt={club.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <Badge className="absolute right-2 top-2 bg-[#EE495C]">{club.category}</Badge>
        </div>
        <CardHeader>
          <CardTitle>{club.name}</CardTitle>
          <CardDescription>{club.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">{club.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/clubs/${club.id}`}>Learn More</Link>
          </Button>
          <Button size="sm" className="bg-[#EE495C] hover:bg-[#EE495C]/90" asChild>
            <Link href={club.joinUrl || `https://forms.woxsen.edu.in/club-join?id=${club.id}`}>Join Club</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

