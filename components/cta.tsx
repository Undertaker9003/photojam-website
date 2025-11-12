import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
          Ready to Join the Community?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Become part of Photojam and unlock exclusive events, workshops, and networking opportunities with fellow
          photography enthusiasts.
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
