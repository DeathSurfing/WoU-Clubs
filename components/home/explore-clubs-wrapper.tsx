"use client"

import dynamic from "next/dynamic"

const ExploreClubs = dynamic(() => import("./explore-clubs"), {
  loading: () => <div className="py-12 text-center text-muted-foreground">Loading clubs...</div>,
  ssr: false,
})

export default function ExploreClubsWrapper({ clubs }: { clubs: any[] }) {
  return <ExploreClubs initialClubs={clubs} />
}
