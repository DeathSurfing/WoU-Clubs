"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// Basic manual tracker
export function trackEvent(name: string, data?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).umami?.track) {
    ;(window as any).umami.track(name, data)
  } else if (process.env.NODE_ENV === "development") {
    console.log(`[umami dev] trackEvent("${name}")`, data || "")
  }
}

// Pageview tracker (runs on route change)
export function usePageTracking() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).umami?.track) {
      ;(window as any).umami.track("page_view", { path: pathname })
    } else if (process.env.NODE_ENV === "development") {
      console.log(`[umami dev] page_view: ${pathname}`)
    }
  }, [pathname])
}

// ✅ Global click listener — automatically tracks link & button clicks
export function useGlobalClickTracking() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      // Find the clickable ancestor (a, button, or element with data-track)
      const clickable = target.closest("a, button, [data-track]")
      if (!clickable) return

      // Derive a readable label for Umami event
      const label =
        clickable.getAttribute("data-track") ||
        clickable.getAttribute("aria-label") ||
        clickable.textContent?.trim().slice(0, 60) ||
        "unnamed_click"

      // Optional: tag page context
      const page = window.location.pathname

      // Avoid duplicate spam (e.g. fast double-clicks)
      const now = Date.now()
      if (
        (window as any).__lastClickEvent &&
        now - (window as any).__lastClickEvent < 500
      ) {
        return
      }
      ;(window as any).__lastClickEvent = now

      // Send to Umami
      if ((window as any).umami?.track) {
        ;(window as any).umami.track("click", { label, page })
      } else if (process.env.NODE_ENV === "development") {
        console.log(`[umami dev] click: ${label}`, { page })
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])
}
