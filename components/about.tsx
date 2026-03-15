export function About() {
  const stats = [
    { number: "170+", label: "Community Members" },
    { number: "500+", label: "Photos Shot Monthly" },
    { number: "5+", label: "Years of Excellence" },
  ]

  return (
    <section id="about" className="py-24 md:py-36 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side: text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6 text-balance">About Photojam</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Born in the challenging times of the pandemic, Photojam began as a digital haven connecting photographers and creatives across Malaysia, exploring over 300 diverse themes from ocean depths to urban skylines.
              </p>
              <p>
                Now in our sixth year, we've transformed into a thriving ecosystem that nurtures artistic growth, collaboration, and innovative expression through comprehensive programming.
              </p>
              <p>
                Our nationwide photo expeditions unite photography enthusiasts of all levels, journeying through Malaysia's breathtaking natural wonders and vibrant cityscapes. Strategic alliances with industry giants including Canon, Fujifilm, Olympus, Sigma, Sony, and ThinkTank empower our community with privileged access to premium equipment and masterclass-level expertise, elevating the technical and artistic standards of Malaysian photography.
              </p>
            </div>
          </div>

          {/* Right side: stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="text-3xl md:text-4xl font-serif text-primary mb-2">{stat.number}</div>
                <p className="text-muted-foreground text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision for Growth Section */}
        <div className="mt-20 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-8 text-balance">Our Vision For Growth</h2>
          <div className="space-y-4 text-lg md:text-xl text-muted-foreground leading-relaxed text-left md:text-center">
            <p>
              We invite passionate young creatives across all states to collaborate in this ambitious endeavor. Whether through our regional photo walks, workshops, & 1 school 1 camera initiatives, every participant becomes part of a larger mission to strengthen Malaysia's creative ecosystem. By empowering youth with photographic skills and artistic vision, we're fostering a new generation of visual communicators who will document, interpret & express our nation's narrative.
            </p>
            <p>
              More than an organization, Photojam represents a collective aspiration - to see Malaysia through fresh perspectives, to tell our stories with authenticity, and to create meaningful connections that transcend geographical and cultural boundaries through the universal language of imagery. Join us as we focus our lenses on building a more creative, connected Malaysia.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
