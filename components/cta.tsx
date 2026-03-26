import { Button } from "@/components/ui/button"
import { Facebook, Instagram, MessageCircle, Mail } from "lucide-react"

const links = [
  {
    label: "Facebook",
    href: "https://web.facebook.com/PhotoJamChannel",
    icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/photojamcommunity",
    icon: Instagram,
  },
  {
    label: "WhatsApp",
    href: "https://chat.whatsapp.com/LRWRXj6N80kJcUIsIHPV6V",
    icon: MessageCircle,
  },
  {
    label: "Email",
    href: "mailto:photojamcommunity@gmail.com",
    icon: Mail,
  },
]

export function CTA() {
  return (
    <section className="py-24 md:py-36 bg-gradient-to-r from-primary/10 via-background to-secondary/10">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-6 text-balance">
          Connect With Us
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          Young Malaysians with a passion for visual storytelling - your perspective matters. Whether you&apos;re an aspiring photographer, digital creator, or simply curious about the power of imagery, we welcome you to be part of this growing community. Together, let&apos;s capture Malaysia&apos;s diversity, share untold stories, and shape our nation&apos;s creative future - one frame at a time.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full h-auto py-6 flex flex-col gap-2 border-border hover:border-primary hover:bg-primary/5 transition-all"
              >
                <link.icon className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {link.label}
                </span>
              </Button>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
