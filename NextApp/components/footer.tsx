import Link from "next/link"
import { Youtube, Instagram, Linkedin, Twitter } from "lucide-react"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Student Council", path: "/student-council" },
  { name: "Clubs", path: "/clubs" },
  { name: "Events", path: "/events" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "FAQ", path: "/faq" },
  { name: "Oval Menu", path: "/nutrition" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Woxsen University Clubs</h3>
            <p className="text-sm text-muted-foreground">
              Explore the diverse clubs and activities at Woxsen University.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
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
            <address className="not-italic text-sm text-muted-foreground">
              <p>Woxsen University</p>
              <p>Kamkole, Sadasivpet</p>
              <p>Hyderabad, Telangana</p>
              <p className="mt-2">Email: studentaffairs@woxsen.edu.in</p>
              <p>Phone: +91 98660 23123</p>
            </address>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Woxsen University Student Council. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}