"use client"

import { ReactNode } from "react"
import { usePageTracking, useGlobalClickTracking } from "@/lib/track"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function ClientLayout({ children }: { children: ReactNode }) {
  // ✅ Auto track page views and clicks
  usePageTracking()
  useGlobalClickTracking()

  return (
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
  )
}
