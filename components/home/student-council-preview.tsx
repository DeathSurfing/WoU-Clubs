import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Users from "lucide-react/dist/esm/icons/users"
import Award from "lucide-react/dist/esm/icons/award"
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right"

export default function StudentCouncilPreview() {
  return (
    <section id="student-council" className="py-16 bg-gradient-to-r from-[#EE495C]/5 to-[#EE495C]/10">
      <div className="container">
        <div className="text-center mb-12">
          <div className="relative mx-auto h-24 w-24 mb-6">
            <Image src="/SCLogoLight.webp" alt="Student Council Logo" fill quality={80} sizes="96px" className="object-contain dark:hidden" />
            <Image src="/SCLogoDark.webp" alt="Student Council Logo Dark" fill quality={80} sizes="96px" className="object-contain hidden dark:block" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Student Council</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Meet the dedicated student leaders who represent and advocate for the Woxsen University student body.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden border shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <Image
              src="/CouncilLead.webp"
              alt="Student Council"
              fill
              quality={60}
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="absolute bottom-0 left-0 p-6 text-white z-20">
              <h3 className="text-2xl font-bold mb-2">Leadership Structure</h3>
              <p className="mb-4">Explore our hierarchical council organization</p>
              <Button variant="outline" asChild className="border-white text-white hover:bg-white hover:text-black">
                <Link href="/student-council">View Structure</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Student Representation</h3>
            <p className="text-muted-foreground">
              Our Student Council serves as the voice of the student body, advocating for student interests and connecting students and administration.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2"><Users className="h-5 w-5 text-[#EE495C]" /><span>10+ Departments</span></div>
              <div className="flex items-center gap-2"><Award className="h-5 w-5 text-[#EE495C]" /><span>50+ Members</span></div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-[#EE495C] hover:bg-[#EE495C]/90" asChild>
                <Link href="/student-council" className="flex items-center">Meet the Council<ChevronRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
