"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"


export function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image (fades in first) */}
      <motion.img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSCF0018%20-%20%E6%84%88%E3%82%86%20%281%29.JPG-JzRZ2Q45yasY7Fqr2CMMXsJ2jriB0n.jpeg"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-[50%_29%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text + Buttons overlay */}
      <div className="relative z-10 flex h-full items-center pl-10 md:pl-24">
        <div className="max-w-xl text-white space-y-6">

          {/* Title fades in second */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Capture the
            <span className="block text-primary">World</span>
          </motion.h1>

          {/* Paragraph fades in third */}
          <motion.p
            className="text-xl md:text-2xl text-gray-200 max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Join a vibrant community of photographers celebrating the art,
            culture, and beauty of visual storytelling.
          </motion.p>

          {/* Buttons fade in last */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            {/* Get Started → scroll to Gallery */}
            <a href="#gallery">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg h-12 px-8"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>

            {/* Learn More → open Instagram */}
            <a
              href="https://www.instagram.com/photojamcommunity?igsh=bno4OGNudmViOHFz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="text-base md:text-lg h-12 px-8 border-white text-white hover:bg-white/10 bg-transparent"
              >
                Learn More
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
