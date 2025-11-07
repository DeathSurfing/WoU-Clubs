import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="bg-[#EE495C] py-16 text-white">
      <div className="container text-center">
        <h2 className="mb-4 text-3xl md:text-4xl font-bold">Ready to Join a Club?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-white/90">
          Take the first step towards an enriching university experience by joining one of our many clubs.
        </p>
        <Button size="lg" className="bg-white text-[#EE495C] hover:bg-white/90" asChild>
          <Link href="/clubs">Get Started</Link>
        </Button>
      </div>
    </section>
  )
}
