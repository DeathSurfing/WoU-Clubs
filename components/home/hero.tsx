"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
      <Image
        src="/University Backdrop.webp"
        alt="University backdrop"
        fill
        priority
        className="absolute inset-0 object-cover"
        quality={70}
        sizes="100vw"
        placeholder="blur"
        blurDataURL="/placeholder.svg?height=10&width=10"
      />
      <div className="container relative z-20 text-center text-white px-4">
        <motion.h1
          className="mb-6 text-4xl font-bold md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Empowering Voices at <span className="text-[#EE495C]">Woxsen</span>
        </motion.h1>
        <motion.p
          className="mx-auto mb-8 max-w-2xl text-lg text-gray-200 md:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Join our diverse community of clubs and activities to enhance your university experience.
        </motion.p>
        <motion.div
          className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button className="bg-[#EE495C] text-white hover:bg-[#EE495C]/90" size="lg" asChild>
            <Link href="/events">Campus Events</Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-white text-white hover:bg-white/10">
            <Link href="#explore">Explore Clubs</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
