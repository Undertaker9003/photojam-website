"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { type ProjectImage } from "@/lib/projects"

type GalleryViewerProps = {
  images: ProjectImage[]
  projectTitle: string
}

const THUMB_SLOT = 120 // 112px width (w-28) + 8px gap (gap-2)
const SCROLL_SPEED = 1.5 // px per frame

export function GalleryViewer({ images, projectTitle }: GalleryViewerProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const scrollXRef = useRef(0)
  const activeIndexRef = useRef(0)
  const rafRef = useRef<number>(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const frontRef = useRef<HTMLImageElement>(null)
  const backRef = useRef<HTMLImageElement>(null)
  const isFrontActive = useRef(true)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartScroll = useRef(0)

  const loopedImages = [...images, ...images]
  const loopLength = images.length * THUMB_SLOT

  const setActiveImage = (newIndex: number) => {
    const active = isFrontActive.current ? frontRef.current : backRef.current
    const incoming = isFrontActive.current ? backRef.current : frontRef.current
    if (!active || !incoming) return

    incoming.src = images[newIndex].url
    incoming.alt = images[newIndex].alt

    active.classList.replace("opacity-100", "opacity-0")
    incoming.classList.replace("opacity-0", "opacity-100")

    isFrontActive.current = !isFrontActive.current
    activeIndexRef.current = newIndex

    for (let j = 1; j <= 3; j++) {
      const idx = (newIndex + j) % images.length
      const img = new window.Image()
      img.src = images[idx].url
    }
  }

  // Preload first few images on mount
  useEffect(() => {
    for (let i = 0; i < Math.min(3, images.length); i++) {
      const img = new window.Image()
      img.src = images[i].url
    }
  }, [images])

  useEffect(() => {
    if (images.length === 0) return

    const animate = () => {
      if (!isPaused && !isDragging.current) {
        scrollXRef.current += SCROLL_SPEED
        if (scrollXRef.current >= loopLength) {
          scrollXRef.current -= loopLength
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${scrollXRef.current}px)`
        }

        const screenCenter = window.innerWidth / 2
        const newActive =
          Math.floor((scrollXRef.current + screenCenter) / THUMB_SLOT) %
          images.length

        if (newActive !== activeIndexRef.current) {
          setActiveImage(newActive)
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isPaused, images.length, loopLength])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true
    dragStartX.current = e.clientX
    dragStartScroll.current = scrollXRef.current
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const delta = dragStartX.current - e.clientX
    const newScroll = dragStartScroll.current + delta
    scrollXRef.current = newScroll
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${newScroll}px)`
    }
    const rawIndex = Math.floor((newScroll + window.innerWidth / 2) / THUMB_SLOT)
    const newActive = ((rawIndex % images.length) + images.length) % images.length
    if (newActive !== activeIndexRef.current) {
      setActiveImage(newActive)
    }
  }

  const handlePointerUp = () => {
    isDragging.current = false
    scrollXRef.current = ((scrollXRef.current % loopLength) + loopLength) % loopLength
  }

  if (images.length === 0) {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center gap-6">
        <p className="text-black/60 text-lg">No photos in this collection yet.</p>
        <Link
          href="/gallery"
          className="flex items-center gap-2 text-black/60 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Link>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white">
      {/* Click overlay to pause/resume */}
      <div
        className="fixed inset-0 z-10 cursor-pointer"
        onClick={() => setIsPaused((p) => !p)}
      />

      {/* Back button */}
      <Link
        href="/gallery"
        className="fixed top-6 left-6 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/40 hover:bg-black/60 rounded-full px-3 py-2 text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      {/* Pause indicator */}
      {isPaused && (
        <div className="fixed top-6 right-6 z-20 text-white/40 text-xs tracking-widest uppercase">
          Paused
        </div>
      )}

      {/* Main photo display — 2 layers for crossfade */}
      <div className="relative w-full h-[85vh]">
        <img
          ref={frontRef}
          src={images[0].url}
          alt={images[0].alt}
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-100"
          onLoad={() => setTimeout(() => setIsLoaded(true), 5000)}
        />
        <img
          ref={backRef}
          src={images[0].url}
          alt={images[0].alt}
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0"
        />
      </div>

      {/* Filmstrip bar */}
      <div
        className="fixed bottom-0 w-full h-[15vh] overflow-hidden bg-white z-20 cursor-grab active:cursor-grabbing touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* White center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/40 z-10" />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className="flex gap-2 h-full items-center will-change-transform"
          style={{ transform: "translateX(0px)" }}
        >
          {loopedImages.map((img, i) => (
            <div
              key={i}
              className="w-28 shrink-0 h-[80%] relative rounded overflow-hidden pointer-events-none"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="112px"
                className="object-cover"
                unoptimized={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <p className="text-black/60 text-lg animate-pulse tracking-widest">
            Loading
          </p>
        </div>
      )}
    </div>
  )
}
