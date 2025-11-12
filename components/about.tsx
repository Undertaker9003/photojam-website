export function About() {
  const stats = [
    { number: "2.5K+", label: "Community Members" },
    { number: "500+", label: "Monthly Shoots" },
    { number: "15+", label: "Years of Excellence" },
  ]

  return (
    <section id="about" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side: text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">About Photojam</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Every photo tells a story, and every story starts here - with Photojam. We believe that photography is more than just capturing light—it's about telling stories,
              preserving moments, and celebrating the human experience.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our community brings together enthusiasts, professionals, and students united by a passion for the visual
              arts. Through workshops, exhibitions, and collaborative projects, we create spaces where creativity
              flourishes.
            </p>
          </div>

          {/* Right side: stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <p className="text-muted-foreground text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
