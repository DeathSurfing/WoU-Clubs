import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Woxsen University Clubs</h3>
            <p className="text-sm text-muted-foreground">
              Explore the diverse clubs and activities at Woxsen University.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/clubs" className="text-muted-foreground hover:text-primary">
                  All Clubs
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/academic" className="text-muted-foreground hover:text-primary">
                  Academic
                </Link>
              </li>
              <li>
                <Link href="/categories/cultural" className="text-muted-foreground hover:text-primary">
                  Cultural
                </Link>
              </li>
              <li>
                <Link href="/categories/sports" className="text-muted-foreground hover:text-primary">
                  Sports
                </Link>
              </li>
              <li>
                <Link href="/categories/technology" className="text-muted-foreground hover:text-primary">
                  Technology
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact</h3>
            <address className="not-italic text-sm text-muted-foreground">
              <p>Woxsen University</p>
              <p>Kamkole, Sadasivpet</p>
              <p>Hyderabad, Telangana</p>
              <p className="mt-2">Email: clubs@woxsen.edu.in</p>
              <p>Phone: +91 12345 67890</p>
            </address>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Woxsen University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

