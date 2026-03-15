import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 md:py-36 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-6 text-balance">
          Call To Action
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Young Malaysians with a passion for visual storytelling - your perspective matters. Whether you're an aspiring photographer, digital creator, or simply curious about the power of imagery, we welcome you to be part of this growing community. Together, let's capture Malaysia's diversity, share untold stories, and shape our nation's creative future - one frame at a time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://chat.whatsapp.com/LRWRXj6N80kJcUIsIHPV6V"
            target="_blank"
            rel="noopener noreferrer"
          >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg h-12 px-8"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          </a>

          <a
            href="https://www.instagram.com/photojamcommunity?igsh=bno4OGNudmViOHFz"
            target="_blank"
            rel="noopener noreferrer"
          >
          <Button
            size="lg"
            variant="outline"
            className="text-base md:text-lg h-12 px-8 border-secondary text-secondary hover:bg-secondary/10 bg-transparent"
          >
            Explore More
          </Button>
          </a>
          
        </div>
      </div>
    </section>
  )
}
