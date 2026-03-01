"use client"

import Image from "next/image"

type GalleryProps = {
  limit?: number
}

export function Gallery({ limit }: GalleryProps) {
  const projects = [
    {
      title: "Photojam x PoiLam workshop",
      description: "Capturing the essence of stage show through bold perspectives",
      image: "/poilam workshop thumbnail.JPG",
      link: "https://drive.google.com/drive/folders/1KH35rDOEpwIt3QbiUtnOcf71FeAYRcJQ?usp=sharing",
      index: 1,
    },
    {
      title: "Setiawan KLPF trip",
      description: "Stories told through the human connection and emotion",
      image: "/setiawan thumbnail.JPG",
      link: "https://drive.google.com/drive/u/5/folders/1RgorYjfZnZDeeAdulXvOGQ1Bm9CBbkYr",
      index: 2,
    },
    {
      title: "Pulau Ketam through lens",
      description: "Discovering untamed beauty of Pulau Ketam",
      image: "/pulau ketam thumbnail.JPG",
      link: "https://drive.google.com/drive/folders/1dGFDVeXdqHaUB5uIbgGVDsFp1NwydOvG?usp=sharing",
      index: 3,
    },
    {
      title: "Kuala Sepetang Trip",
      description: "Discovering untamed beauty of Kuala Sepetang",
      image: "/kualasepetangthumbnail.JPG",
      link: "https://drive.google.com/drive/folders/1rOeBn_t_MmCsSPvOox_oTpD8hTWFUGM7?usp=sharing",
      index: 4,
    },
  ]

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
              key={project.index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="group relative overflow-hidden rounded-lg aspect-video bg-muted hover:shadow-xl transition-all duration-300">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={75}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
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
