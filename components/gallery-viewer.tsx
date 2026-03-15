"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { type ProjectImage } from "@/lib/projects"

type GalleryViewerProps = {
  images: ProjectImage[]
  projectTitle: string
}

const THUMB_SLOT = 120 // 112px width (w-28) + 8px gap (gap-2)
const SPEED_PX_PER_MS = 0.09 // ~1.5px at 60fps, consistent across refresh rates

export function GalleryViewer({ images, projectTitle }: GalleryViewerProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Filmstrip refs
  const scrollXRef = useRef(0)
  const activeIndexRef = useRef(0)
  const rafRef = useRef<number>(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const lastTimestampRef = useRef(0)

  // 3-panel pre-render refs (prev / current / next)
  const prevRef = useRef<HTMLImageElement>(null)
  const currentRef = useRef<HTMLImageElement>(null)
  const nextRef = useRef<HTMLImageElement>(null)

  // Blur background refs
  const blurFrontRef = useRef<HTMLImageElement>(null)
  const blurBackRef = useRef<HTMLImageElement>(null)
  const isBlurFrontActive = useRef(true)

  // Drag refs
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartScroll = useRef(0)

  // Triple the images for seamless filmstrip looping
  const loopedImages = [...images, ...images, ...images]
  const loopLength = images.length * THUMB_SLOT

  const updateBlurBackground = useCallback(
    (newIndex: number) => {
      const blurActive = isBlurFrontActive.current
        ? blurFrontRef.current
        : blurBackRef.current
      const blurIncoming = isBlurFrontActive.current
        ? blurBackRef.current
        : blurFrontRef.current
      if (!blurActive || !blurIncoming) return

      blurIncoming.src = images[newIndex].url
      blurActive.classList.replace("opacity-100", "opacity-0")
      blurIncoming.classList.replace("opacity-0", "opacity-100")
      isBlurFrontActive.current = !isBlurFrontActive.current
    },
    [images]
  )

  const refreshAllPanels = useCallback(
    (index: number) => {
      const prevIdx = ((index - 1) + images.length) % images.length
      const nextIdx = (index + 1) % images.length

      if (prevRef.current) {
        prevRef.current.src = images[prevIdx].url
        prevRef.current.alt = images[prevIdx].alt
      }
      if (currentRef.current) {
        currentRef.current.src = images[index].url
        currentRef.current.alt = images[index].alt
      }
      if (nextRef.current) {
        nextRef.current.src = images[nextIdx].url
        nextRef.current.alt = images[nextIdx].alt
      }
    },
    [images]
  )

  const setActiveImage = useCallback(
    (newIndex: number) => {
      if (newIndex === activeIndexRef.current) return

      updateBlurBackground(newIndex)
      refreshAllPanels(newIndex)
      activeIndexRef.current = newIndex

      // Preload 2 steps ahead
      const preloadIdx = (newIndex + 2) % images.length
      const img = new window.Image()
      img.src = images[preloadIdx].url
    },
    [images, updateBlurBackground, refreshAllPanels]
  )

  // Initialize panels and preload on mount
  useEffect(() => {
    if (images.length === 0) return

    const prevIdx = images.length > 1 ? images.length - 1 : 0
    const nextIdx = images.length > 1 ? 1 : 0

    if (prevRef.current) {
      prevRef.current.src = images[prevIdx].url
      prevRef.current.alt = images[prevIdx].alt
    }
    if (currentRef.current) {
      currentRef.current.src = images[0].url
      currentRef.current.alt = images[0].alt
    }
    if (nextRef.current) {
      nextRef.current.src = images[nextIdx].url
      nextRef.current.alt = images[nextIdx].alt
    }
    if (blurFrontRef.current) {
      blurFrontRef.current.src = images[0].url
    }

    // Preload a few images ahead
    for (let i = 2; i < Math.min(4, images.length); i++) {
      const img = new window.Image()
      img.src = images[i].url
    }
  }, [images])

  // Timestamp-based RAF animation loop
  useEffect(() => {
    if (images.length === 0) return
    lastTimestampRef.current = 0

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === 0) lastTimestampRef.current = timestamp
      const delta = timestamp - lastTimestampRef.current
      lastTimestampRef.current = timestamp

      if (!isPaused && !isDragging.current) {
        scrollXRef.current += SPEED_PX_PER_MS * delta
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
      } else {
        // Reset timestamp when paused/dragging so we don't get a huge delta on resume
        lastTimestampRef.current = timestamp
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isPaused, images.length, loopLength, setActiveImage])

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
    const rawIndex = Math.floor(
      (newScroll + window.innerWidth / 2) / THUMB_SLOT
    )
    const newActive =
      ((rawIndex % images.length) + images.length) % images.length
    if (newActive !== activeIndexRef.current) {
      setActiveImage(newActive)
    }
  }

  const handlePointerUp = () => {
    isDragging.current = false
    scrollXRef.current =
      ((scrollXRef.current % loopLength) + loopLength) % loopLength
  }

  if (images.length === 0) {
    return (
      <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-6">
        <p className="text-white/60 text-lg">
          No photos in this collection yet.
        </p>
        <Link
          href="/gallery"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Link>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black">
      {/* Blur background — two layers for crossfade */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={blurFrontRef}
          src={images[0].url}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-[40px] transition-opacity duration-500 opacity-100"
        />
        <img
          ref={blurBackRef}
          src={images[0].url}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-[40px] transition-opacity duration-500 opacity-0"
        />
      </div>
      {/* Dark overlay on blur for depth */}
      <div className="absolute inset-0 bg-black/30" />

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

      {/* Main photo display — 3 pre-rendered images, only current visible */}
      <div className="relative w-full h-[85vh]">
        <img ref={prevRef} alt="" decoding="async" className="absolute w-0 h-0 opacity-0" />
        <img
          ref={currentRef}
          alt=""
          decoding="sync"
          className="absolute inset-0 w-full h-full object-contain"
          onLoad={() => setTimeout(() => setIsLoaded(true), 2000)}
        />
        <img ref={nextRef} alt="" decoding="async" className="absolute w-0 h-0 opacity-0" />
      </div>

      {/* Filmstrip bar */}
      <div
        className="fixed bottom-0 w-full h-[15vh] overflow-hidden bg-black/70 backdrop-blur-sm z-20 cursor-grab active:cursor-grabbing touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/40 z-10" />

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

      {/* Loading overlay — commented out for testing
      {!isLoaded && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <p className="text-white/60 text-lg animate-pulse tracking-widest">
            Loading
          </p>
        </div>
      )}
      */}
    </div>
  )
}
