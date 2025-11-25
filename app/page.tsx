export const dynamic = "force-dynamic";

import Hero from "@/components/home/hero";
import StudentCouncilPreview from "@/components/home/student-council-preview";
import CTA from "@/components/home/cta";
import ExploreClubsWrapper from "@/components/home/explore-clubs-wrapper";

export default async function HomePage() {
  let clubs: any[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/clubs`, {
      cache: "no-store",
    });

    // ensure response is JSON before parsing
    const text = await res.text();
    try {
      clubs = JSON.parse(text);
    } catch {
      console.warn("⚠️ API did not return JSON. Using empty fallback.");
      clubs = [];
    }
  } catch (err) {
    console.warn("⚠️ Failed to fetch clubs API. Using fallback.", err);
    clubs = [];
  }

  return (
    <>
      <Hero />
      <StudentCouncilPreview />
      <ExploreClubsWrapper clubs={clubs} />
      <CTA />
    </>
  );
}
