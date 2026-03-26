import { notFound } from "next/navigation"
import { getProjects, getProjectBySlug } from "@/lib/projects"
import { getGalleryImages } from "@/lib/r2"
import { GalleryViewer } from "@/components/gallery-viewer"
import type { Metadata } from "next"

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: "Not Found" }
  return {
    title: `${project.title} - PhotoJam`,
    description: project.description,
  }
}

export default async function GalleryDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const r2Configured = !!(process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID)
  const images = r2Configured
    ? await getGalleryImages(slug)
    : project.images

  return <GalleryViewer images={images} projectTitle={project.title} />
}
