import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Gallery } from "@/components/gallery"
import { About } from "@/components/about"
import { Events } from "@/components/events"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
// 1. Import the data loader we created
import { getGalleryData } from "@/lib/getGallery"

export default function Home() {
  // 2. Fetch the projects from the local /content/gallery folder
  const projects = getGalleryData();

  return (
    <main id="top" className="bg-background scroll-smooth">
      <Header />
      <Hero />
      {/* 3. Pass the fetched projects into the Gallery component.
        If you only want to show the latest 4 on the homepage, 
        you can use the limit prop: <Gallery projects={projects} limit={4} />
      */}
      <Gallery projects={projects} />
      <About />
      <Events />
      <CTA />
      <Footer />
    </main>
  )
}