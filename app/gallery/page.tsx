import { Gallery } from "@/components/gallery"
import { getProjects } from "@/lib/projects"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery - PhotoJam",
  description: "Explore the stunning photography collections from our community.",
}

export default function GalleryPage() {
  const allProjects = getProjects()

  return (
    <div className="pt-24">
      <Gallery projects={allProjects} />
      <p className="text-center text-2xl md:text-4xl font-serif text-muted-foreground -mt-20 mb-30 py-10">
        Coming Soon
      </p>
    </div>
  )
}
