"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Sparkles, Calendar, Users, Gift } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NoRegistrationRequired() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Floating decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 text-gray-400 dark:text-gray-600"
          >
            <Sparkles size={24} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [360, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 right-20 text-gray-400 dark:text-gray-600"
          >
            <Gift size={32} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-40 left-20 text-gray-400 dark:text-gray-600"
          >
            <Calendar size={28} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 25, 0], rotate: [0, -360] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-10 text-gray-400 dark:text-gray-600"
          >
            <Users size={26} />
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl"
          >
            <Card className="border shadow-2xl bg-background backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="mb-8"
                >
                  <div className="mx-auto flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-green-500 shadow-lg">
                    <CheckCircle2 className="text-white" size={48} />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <Badge className="bg-primary text-primary-foreground px-4 md:px-6 py-2 text-base md:text-lg font-medium">
                    ✨ Free Entry Event ✨
                  </Badge>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6 text-foreground text-3xl md:text-5xl font-bold"
                >
                  No Registration
                </motion.h1>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8 text-foreground text-2xl md:text-4xl font-bold"
                >
                  Required! 🎉
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-8 text-lg md:text-xl text-muted-foreground leading-relaxed"
                >
                  This is an open event! Just show up and join the fun. <br />
                  <span className="font-semibold text-foreground">Everyone is welcome! 🚪✨</span>
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 size={20} />
                    <span className="font-medium">Free Entry</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <Users size={20} />
                    <span className="font-medium">Walk-in Welcome</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <Sparkles size={20} />
                    <span className="font-medium">Hassle Free</span>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button
                    size="lg"
                    className="font-semibold px-8 py-3 shadow-lg hover:scale-105 transition-transform"
                    asChild
                  >
                    <Link href="/events">
                      Browse All Events
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-semibold px-8 py-3 hover:scale-105 transition-transform"
                    asChild
                  >
                    <Link href="/">
                      Back to Home
                    </Link>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-muted-foreground"
          >
            <p className="text-sm">
              🎊 Join us for an amazing experience — no strings attached! 🎊
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
