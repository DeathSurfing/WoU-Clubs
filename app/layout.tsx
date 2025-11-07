import type React from "react"
import type { Metadata } from "next"
import { Work_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script" 

export const metadata: Metadata = {
  title: "Woxsen Student Council | Clubs & Leadership",
  description:
    "Explore Woxsen University’s vibrant student clubs, connect with leaders, and discover your passion through academics, arts, business, tech, and more.",
  keywords: [
    "Woxsen University",
    "Woxsen Student Council",
    "Woxsen Clubs",
    "University Clubs",
    "Student Leadership",
    "Academic Clubs",
    "Cultural Clubs",
    "Technical Clubs",
    "Sports Clubs",
    "Woxsen Events",
  ],
  authors: [{ name: "Woxsen Student Council", url: "https://woxsenstudentcouncil.com" }],
  creator: "Woxsen Student Council",
  publisher: "Woxsen University",
  metadataBase: new URL("https://woxsenstudentcouncil.com"),
  openGraph: {
    title: "Woxsen Student Council | Clubs & Leadership",
    description:
      "Discover your passion. Join vibrant clubs. Be a part of something bigger at Woxsen University.",
    url: "https://woxsenstudentcouncil.com",
    siteName: "Woxsen Student Council",
    images: [
      {
        url: "https://woxsenstudentcouncil.com/SCLightLogo.png",
        width: 1200,
        height: 630,
        alt: "Woxsen Student Council OpenGraph Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Woxsen Student Council | Clubs & Leadership",
    description:
      "Join the movement of innovation, creativity, and leadership at Woxsen University.",
    site: "@WoxsenUniversityStudentAffairs",
    images: ["https://woxsenstudentcouncil.com/SCLightLogo.png"],
  },
}

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Umami Analytics Script */}
        <Script
          async
          src="https://analytics.woxsenstudentcouncil.com/script.js"
          data-website-id="d122e914-2b21-4111-9b83-cea52767c851"
        />
      </head>
      <body className={`${workSans.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          storageKey="woxsen-theme"
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
