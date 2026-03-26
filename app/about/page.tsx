import { About } from "@/components/about"
import { CTA } from "@/components/cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - PhotoJam",
  description: "Learn about PhotoJam, a vibrant photography society.",
}

export default function AboutPage() {
  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-35">
        <div className="text-center mb-12 md:mb-30">
          <h2 className="text-4xl md:text-8xl font-serif text-foreground mb-8 text-balance">
            ABOUT US
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Building a more creative, connected Malaysia through the universal language of imagery.
          </p>
        </div>
      </div>
      <About />
      <CTA />
    </div>
  )
}
