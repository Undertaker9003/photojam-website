"use client"

export function Gallery() {
  const projects = [
    {
      title: "Photojam x PoiLam workshop",
      description: "Capturing the essence of stage show through bold perspectives",
      image: "/poilam workshop thumbnail.JPG",
      link: "https://drive.google.com/drive/u/5/folders/13ZR2ha0jz555fm_ChVAdvj3t1FevsX7_",
      index: 1,
    },
    {
      title: "Setiawan KLPF trip",
      description: "Stories told through the human connection and emotion",
      image: "/setiawan thumbnail.JPG",
      link:"https://drive.google.com/drive/u/5/folders/1RgorYjfZnZDeeAdulXvOGQ1Bm9CBbkYr",
      index: 2,
    },
    {
      title: "Pulau Ketam through lens",
      description: "Discovering untamed beauty of Pulau Ketam",
      image: "/pulau ketam thumbnail.JPG",
      link:"https://drive.google.com/drive/u/5/folders/16jdc2e2P-atxACN_euNyN3-hydTF7f91",
      index: 3,
    },
    {
      title: "Kuala Sepetang Trip",
      description: "Coming Soon",
      image: "/coming_soon_landscape-1.png",
      link:"#",
      index: 4,
    },
  ]

  return (
    <section
  id="gallery"
  className="py-16 md:py-24 bg-background scroll-mt-20" // scroll-mt-20 prevents header overlap
>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance">Our Collection</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the stunning work from our community members
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
            <div
              key={project.index}
              className="group relative overflow-hidden rounded-lg aspect-video bg-muted hover:shadow-xl transition-all duration-300 flex justify-center items-center"
            >
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className={`object-cover group-hover:scale-105 transition-transform duration-300

                   ${
                    project.title === "Kuala Sepetang Trip"
                      ? "w-3/4 h-3/4 object-contain group-hover:scale-100"
                      : "w-full h-full group-hover:scale-105"
                  }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm md:text-base text-gray-200">{project.description}</p>
              </div>
            </div>
          </a>
          ))}
        </div>
      </div>
    </section>
  )
}
