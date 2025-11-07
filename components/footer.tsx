"use client"

import Link from "next/link"
import { useEffect } from "react"
import { Instagram, Linkedin } from "lucide-react"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Student Council", path: "/student-council" },
  { name: "Clubs", path: "/clubs" },
  { name: "Events", path: "/events" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "FAQ", path: "/faq" },
  { name: "Oval Menu", path: "/nutrition" },
]

export default function Footer() {
  // ✅ Track footer visibility (once per session)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.umami?.track("footer_viewed")
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )

    const footer = document.getElementById("footer")
    if (footer) observer.observe(footer)

    return () => observer.disconnect()
  }, [])

  const handleLinkClick = (label: string, path?: string) => {
    window.umami?.track("footer_link_click", { label, path })
  }

  const handleSocialClick = (platform: string) => {
    window.umami?.track("footer_social_click", { platform })
  }

  const handleContactClick = (type: "email" | "phone") => {
    window.umami?.track("footer_contact_click", { type })
  }

  return (
    <footer id="footer" className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Woxsen University Clubs</h3>
            <p className="text-sm text-muted-foreground">
              Explore the diverse clubs and activities at Woxsen University.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/woxsen_student_council/"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => handleSocialClick("instagram")}
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/woxsen-university-student-council/"
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => handleSocialClick("linkedin")}
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => handleLinkClick(item.name, item.path)}
                  >
                    {item.name === "Oval Menu" ? "Nutrition" : item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-1">
              <p>Woxsen University</p>
              <p>Kamkole, Sadasivpet</p>
              <p>Hyderabad, Telangana</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:studentaffairs@woxsen.edu.in"
                  className="hover:text-primary"
                  onClick={() => handleContactClick("email")}
                >
                  studentaffairs@woxsen.edu.in
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+919866023123"
                  className="hover:text-primary"
                  onClick={() => handleContactClick("phone")}
                >
                  +91 98660 23123
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Woxsen University Student Council. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
