"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Student Council", path: "/student-council" },
  { name: "Clubs", path: "/clubs" },
  { name: "Events", path: "/events" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "FAQ", path: "/faq" },
  { name: "Leaderboard", path: "/leaderboard" },
  //  { name: "Oval Menu", path: "/nutrition" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          {/* Woxsen University Logo */}
          <div className="relative h-14 w-14">
            {/* Light mode logo */}
            <div className="dark:hidden">
              <Image
                src="/WoxsenLight.webp"
                alt="Woxsen University Logo"
                fill
                className="object-contain"
              />
            </div>
            {/* Dark mode logo */}
            <div className="hidden dark:block">
              <Image
                src="/WoxsenDark.webp"
                alt="Woxsen University Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Student Council Logo */}
          <div className="relative h-14 w-44">
            {/* Light mode Student Council logo */}
            <div className="dark:hidden">
              <Image
                src="/SCLogoLight.webp"
                alt="Student Council Logo"
                fill
                className="object-contain"
              />
            </div>
            {/* Dark mode Student Council logo */}
            <div className="hidden dark:block">
              <Image
                src="/SCLogoDark.webp"
                alt="Student Council Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </Link>

        {isMobile ? (
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        ) : (
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.path ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
            <ModeToggle />
          </nav>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <motion.div
          className="absolute top-20 left-0 w-full bg-background shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "py-3 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.path ? "text-primary" : "text-muted-foreground",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
