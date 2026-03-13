import { About } from "@/components/about"
import { CTA } from "@/components/cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - Photojam",
  description: "Learn about Photojam, a vibrant photography society.",
}

export default function AboutPage() {
  return (
    <div className="pt-24">
      <About />
      <CTA />
    </div>
  )
}
