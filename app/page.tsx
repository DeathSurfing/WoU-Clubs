import Hero from "@/components/home/hero"
import StudentCouncilPreview from "@/components/home/student-council-preview"
import CTA from "@/components/home/cta"
import ExploreClubsWrapper from "@/components/home/explore-clubs-wrapper"

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/clubs`, {
    next: { revalidate: 120 },
  })
  const clubs = await res.json()

  return (
    <>
      <Hero />
      <StudentCouncilPreview />
      <ExploreClubsWrapper clubs={clubs} />
      <CTA />
    </>
  )
}
