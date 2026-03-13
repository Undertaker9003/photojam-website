import { Gallery } from "@/components/gallery"
import { getProjects } from "@/lib/projects"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery - Photojam",
  description: "Explore the stunning photography collections from our community.",
}

export default function GalleryPage() {
  const allProjects = getProjects()

  return (
    <div className="pt-24">
      <Gallery projects={allProjects} />
    </div>
  )
}
