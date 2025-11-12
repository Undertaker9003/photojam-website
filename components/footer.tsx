import { Mail, Instagram } from "lucide-react"

// Custom WhatsApp SVG component
const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.52 3.48C18.07 1.03 14.42 0 11 0 4.92 0 0 4.92 0 11c0 1.94.51 3.83 1.48 5.48L0 24l7.68-1.43C9.37 23.49 10.95 24 12.76 24 18.84 24 24 19.08 24 13c0-3.42-1.03-7.07-3.48-9.52zM12 21c-1.61 0-3.14-.41-4.5-1.18l-.32-.19-4.56.85.92-4.46-.2-.36C2.41 13.12 2 11.59 2 10c0-5.52 4.48-10 10-10 2.69 0 5.23 1.05 7.12 2.94 1.89 1.89 2.94 4.43 2.94 7.12 0 5.52-4.48 10-10 10zm5.33-7.47c-.29-.15-1.71-.84-1.97-.94-.26-.11-.45-.15-.64.15s-.74.94-.91 1.13c-.16.19-.33.21-.61.07-.28-.15-1.18-.43-2.24-1.37-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.13-.57.13-.12.29-.33.43-.49.14-.16.19-.28.28-.47.09-.19.04-.35-.02-.49-.06-.14-.63-1.52-.86-2.08-.23-.55-.46-.48-.64-.49-.16-.01-.35-.01-.54-.01-.19 0-.49.07-.74.35s-.97.95-.97 2.33c0 1.38.99 2.72 1.13 2.91.14.19 1.96 2.99 4.76 4.19.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.06-.12-.24-.19-.53-.34z" />
  </svg>
);

export function Footer() {
  const email = "photojamcommunity@gmail.com"; // your email
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  const whatsappLink = "https://chat.whatsapp.com/your-group-link"; // replace with your WhatsApp group link

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo / Description */}
          <div>
            <h3 className="text-lg font-bold mb-4">Photojam</h3>
            <p className="text-background/80 text-sm leading-relaxed">
              A community dedicated to celebrating photography and visual storytelling.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#gallery" className="hover:text-white transition">Gallery</a></li>
              <li><a href="#events" className="hover:text-white transition">Events</a></li>
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Join Us
                </a>
              </li>
              <li><a href="#workshops" className="hover:text-white transition">Workshops</a></li>
              <li><a href="#resources" className="hover:text-white transition">Resources</a></li>
              <li><a href="#blog" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/photojamcommunity?igsh=bno4OGNudmViOHFz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://chat.whatsapp.com/LRWRXj6N80kJcUIsIHPV6" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <WhatsappIcon className="w-5 h-5" />
              </a>
              {/* Gmail-specific link */}
              <a href={gmailLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
          <p className="text-background/80">© 2025 Photojam. All rights reserved.</p>
          <div className="flex gap-6 text-background/80">
            <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
