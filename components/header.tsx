"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photojam%20logo-rsWS56WuHPr1TToAJcP5xxOXcf0DHo.png"
            alt="Photojam Logo"
            width={48}
            height={48}
            className="w-12 h-12"
          />
          <span className="text-2xl font-bold text-foreground hidden sm:inline">
            photojam
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/gallery"
            className="text-foreground hover:text-primary transition"
          >
            Gallery
          </Link>
          <Link
            href="/about"
            className="text-foreground hover:text-primary transition"
          >
            About
          </Link>
          <Link
            href="/events"
            className="text-foreground hover:text-primary transition"
          >
            Events
          </Link>
          <Link
            href="/photobook"
            className="text-foreground hover:text-primary transition"
          >
            Photobook
          </Link>

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
            <Link
              href="/gallery"
              className="text-foreground hover:text-primary transition"
              onClick={() => setMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/events"
              className="text-foreground hover:text-primary transition"
              onClick={() => setMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/photobook"
              className="text-foreground hover:text-primary transition"
              onClick={() => setMenuOpen(false)}
            >
              Photobook
            </Link>
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
