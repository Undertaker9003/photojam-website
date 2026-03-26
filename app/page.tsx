import { Hero } from "@/components/hero"
import { Gallery } from "@/components/gallery"
import { About } from "@/components/about"
import { Events } from "@/components/events"
import { Donation } from "@/components/donation"
import { CTA } from "@/components/cta"
import { getProjects } from "@/lib/projects"
import { getEvents } from "@/lib/events"

export default function Home() {
  const previewProjects = getProjects(2)
  const previewEvents = getEvents(3)

  return (
    <>
      <Hero />
      <Donation />
      <Gallery projects={previewProjects} showViewAll />
      <About />
      <Events events={previewEvents} showViewAll />
      <CTA />
    </>
  )
}
