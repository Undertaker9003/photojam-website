"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { animate } from "framer-motion"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      animate(window.scrollY, element.offsetTop - 80, { // adjust offset for fixed header
        duration: 0.8,
        onUpdate: (v) => window.scrollTo(0, v),
      })
    }
    setMenuOpen(false) // close mobile menu
  }

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photojam%20logo-rsWS56WuHPr1TToAJcP5xxOXcf0DHo.png"
            alt="Photojam Logo"
            width={48}
            height={48}
            className="w-12 h-12 cursor-pointer"
            onClick={() => handleScroll("top")}
          />
          <span
            className="text-2xl font-bold text-foreground hidden sm:inline cursor-pointer"
            onClick={() => handleScroll("top")}
          >
            photojam
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleScroll("gallery")}
            className="text-foreground hover:text-primary transition"
          >
            Gallery
          </button>
          <button
            onClick={() => handleScroll("about")}
            className="text-foreground hover:text-primary transition"
          >
            About
          </button>
          <button
            onClick={() => handleScroll("events")}
            className="text-foreground hover:text-primary transition"
          >
            Events
          </button>

          <a
            href="https://chat.whatsapp.com/LRWRXj6N80kJcUIsIHPV6V"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Join
            </Button>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-lg">
          <nav className="flex flex-col items-center py-4 gap-4">
            <button
              onClick={() => handleScroll("gallery")}
              className="text-foreground hover:text-primary transition"
            >
              Gallery
            </button>
            <button
              onClick={() => handleScroll("about")}
              className="text-foreground hover:text-primary transition"
            >
              About
            </button>
            <button
              onClick={() => handleScroll("events")}
              className="text-foreground hover:text-primary transition"
            >
              Events
            </button>
            <a
              href="https://chat.whatsapp.com/LRWRXj6N80kJcUIsIHPV6V"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-[120px]">
                Join
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
