import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Gallery } from "@/components/gallery"
import { About } from "@/components/about"
import { Events } from "@/components/events"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main id="top" className="bg-background scroll-smooth">
      <Header />
      <Hero />
      <Gallery />
      <About />
      <Events />
      <CTA />
      <Footer />
    </main>

  )
}
