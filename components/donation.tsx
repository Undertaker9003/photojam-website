"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { Camera, Heart, QrCode } from "lucide-react"

// Replace with your actual Google Vids embed URL
// Get it from: Google Vids → Share → Embed → copy the src URL
const VIDEO_EMBED_URL = "https://drive.google.com/file/d/1TKHGwK-FPv3AP-D7_RtmVdyA6cQBI1WE/preview"

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function Donation() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [posterIndex, setPosterIndex] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const timer = setInterval(() => {
      setPosterIndex((prev) => (prev === 0 ? 1 : 0))
    }, 10000)
    return () => clearInterval(timer)
  }, [isInView])

  const animate = isInView ? "visible" : "hidden"

  return (
    <section
      ref={sectionRef}
      id="donation"
      className="py-24 md:py-36 bg-muted/30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          variants={fadeUp}
          initial="hidden"
          animate={animate}
          custom={0}
        >
          <div className="inline-flex items-center gap-2.5 text-primary mb-6">
            <span className="h-px w-8 bg-primary/60" />
            <Camera className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase">
              Limited Edition
            </span>
            <Camera className="w-4 h-4" />
            <span className="h-px w-8 bg-primary/60" />
          </div>

          <h2 className="text-4xl md:text-8xl font-serif text-foreground mb-6 text-balance">
            THE PHOTOJAM BOOK
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A premium photobook celebrating Malaysia&apos;s cultural heritage
            through the lens of our community. Every donation directly supports
            the preservation and storytelling of our nation&apos;s vibrant
            traditions.
          </p>
        </motion.div>

        {/* ── Poster (crossfade between two) ── */}
        <motion.div
          className="relative w-full max-w-md mx-auto aspect-[7/10] rounded-xl overflow-hidden border border-border shadow-lg bg-card mb-8 md:mb-12"
          variants={scaleIn}
          initial="hidden"
          animate={animate}
          custom={0.15}
        >
          <Image
            src="/donation/poster-1.webp"
            alt="PhotoJam Photobook — Front Cover"
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            quality={85}
            loading="lazy"
            className="object-cover transition-opacity duration-700"
            style={{ opacity: posterIndex === 0 ? 1 : 0 }}
          />
          <Image
            src="/donation/poster-2.webp"
            alt="PhotoJam Photobook — Inside Spread"
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            quality={85}
            loading="lazy"
            className="object-cover transition-opacity duration-700"
            style={{ opacity: posterIndex === 1 ? 1 : 0 }}
          />
        </motion.div>

        {/* ── Video ── */}
        <motion.div
          className="mb-16 md:mb-24"
          variants={scaleIn}
          initial="hidden"
          animate={animate}
          custom={0.45}
        >
          <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden border border-border shadow-lg bg-card">
            {isInView ? (
              <>
                {!videoLoaded && (
                  <Skeleton className="absolute inset-0 rounded-xl z-10" />
                )}
                <iframe
                  src={VIDEO_EMBED_URL}
                  className="absolute inset-0 w-full h-full z-20"
                  loading="lazy"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  title="PhotoJam Photobook Promotion"
                  onLoad={() => setVideoLoaded(true)}
                  style={{ border: "none" }}
                />
              </>
            ) : (
              <Skeleton className="absolute inset-0 rounded-xl" />
            )}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4 italic">
            Watch our story — the heart behind every frame
          </p>
        </motion.div>

        {/* ── Donation CTA Card ── */}
        <motion.div
          className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
          variants={fadeUp}
          initial="hidden"
          animate={animate}
          custom={0.55}
        >
          {/* Decorative top accent */}
          <div className="h-1 bg-gradient-to-r from-transparent via-primary/80 to-transparent" />

          <div className="p-8 md:p-12 lg:p-16">
            {/* Heading area */}
            <div className="text-center mb-10 md:mb-14">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-5">
                <Heart className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-2xl md:text-4xl font-serif text-foreground mb-4">
                Support Our Mission
              </h3>

              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Donate{" "}
                <span className="font-semibold text-foreground">RM100</span> to
                PhotoJam and receive a premium photobook as our heartfelt thank
                you. Your generosity fuels workshops, photo walks, and the{" "}
                <span className="italic">1 School 1 Camera</span> initiative —
                preserving Malaysia&apos;s cultural heritage through the eyes of
                the next generation.
              </p>
            </div>

            {/* QR Codes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-2xl mx-auto">
              {/* QR 1 */}
              <motion.div
                className="flex flex-col items-center"
                variants={scaleIn}
                initial="hidden"
                animate={animate}
                custom={0.7}
              >
                <div className="relative w-full max-w-[220px] aspect-square rounded-xl border-2 border-border bg-white p-3 shadow-sm">
                  <div className="relative w-full h-full">
                    <Image
                      src="/donation/qr-code-1.jpeg"
                      alt="Donation QR Code — Method 1"
                      fill
                      sizes="220px"
                      loading="lazy"
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-1.5 text-primary mb-1">
                    <QrCode className="w-3.5 h-3.5" />
                    <span className="text-sm font-semibold">
                      DuitNow / Touch &apos;n Go
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Scan to donate instantly
                  </p>
                </div>
              </motion.div>

              {/* QR 2 */}
              <motion.div
                className="flex flex-col items-center"
                variants={scaleIn}
                initial="hidden"
                animate={animate}
                custom={0.85}
              >
                <div className="relative w-full max-w-[220px] aspect-square rounded-xl border-2 border-border bg-white p-3 shadow-sm">
                  <div className="relative w-full h-full">
                    <Image
                      src="/donation/qr-code-2.jpeg"
                      alt="Donation QR Code — Method 2"
                      fill
                      sizes="220px"
                      loading="lazy"
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-1.5 text-primary mb-1">
                    <QrCode className="w-3.5 h-3.5" />
                    <span className="text-sm font-semibold">Bank Transfer</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Scan to donate instantly
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Footer note */}
            <p className="text-center text-xs text-muted-foreground mt-10 max-w-lg mx-auto leading-relaxed">
              All proceeds go directly to PhotoJam&apos;s community programs.
              After donating, send your receipt to our{" "}
              <a
                href="https://www.instagram.com/photojamcommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-primary transition-colors"
              >
                Instagram
              </a>{" "}
              to claim your photobook.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
