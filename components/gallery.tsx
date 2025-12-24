"use client"

import Link from 'next/link'

// Define the shape of our project data
export type Project = {
  slug: string
  title: string
  description: string
  image: string
  link: string
  index: number
}

type GalleryProps = {
  projects: Project[] // Data now comes from the CMS loader
  limit?: number
}

export function Gallery({ projects, limit }: GalleryProps) {
  // Use the projects passed from the page, or the limit if provided
  const visibleProjects = limit ? projects.slice(0, limit) : projects

  return (
    <section
      id="gallery"
      className="py-16 md:py-24 bg-background scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            Our Collection
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the stunning work from our community members
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {visibleProjects.map((project) => (
            <a
              key={project.slug}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="group relative overflow-hidden rounded-lg aspect-video bg-muted hover:shadow-xl transition-all duration-300 flex justify-center items-center">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`transition-transform duration-300
                    ${
                      // If the link is '#' or it's a coming soon image, keep it contained
                      project.link === "#" || project.image.includes("coming_soon")
                        ? "w-3/4 h-3/4 object-contain"
                        : "w-full h-full object-cover group-hover:scale-105"
                    }`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200">
                    {project.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}