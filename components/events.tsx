"use client"

import { Calendar, MapPin, Users, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { type Event } from "@/lib/events"

type EventsProps = {
  events: Event[]
  showViewAll?: boolean
}

export function Events({ events, showViewAll }: EventsProps) {
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)

  function openImage(poster: string | string[]) {
    const images = Array.isArray(poster) ? poster : [poster]
    setSelectedImages(images)
    setSelectedIndex(0)
    setZoomLevel(1)
  }

  function closeImage() {
    setSelectedImages(null)
    setSelectedIndex(0)
    setZoomLevel(1)
  }

  const goNext = useCallback(() => {
    if (!selectedImages || selectedImages.length <= 1) return
    setSelectedIndex((prev) => (prev + 1) % selectedImages.length)
    setZoomLevel(1)
  }, [selectedImages])

  const goPrev = useCallback(() => {
    if (!selectedImages || selectedImages.length <= 1) return
    setSelectedIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length)
    setZoomLevel(1)
  }, [selectedImages])

  useEffect(() => {
    if (!selectedImages) return

    function handleWheel(e: WheelEvent) {
      if (!e.ctrlKey) return
      e.preventDefault()
      setZoomLevel(prev => {
        const delta = e.deltaY > 0 ? -0.25 : 0.25
        return Math.min(5, Math.max(1, prev + delta))
      })
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goNext()
      else if (e.key === "ArrowLeft") goPrev()
      else if (e.key === "Escape") closeImage()
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedImages, goNext, goPrev])

  return (
    <section id="events" className="py-24 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-30">
          <h2 className="text-xl md:text-8xl font-serif text-foreground mb-8">
            EVENTS
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto ">
            Connect with fellow photographers and elevate your skills
          </p>
        </div>

        <div className="grid gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 md:p-8 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6"
            >
              {/* Poster thumbnail on the left */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div
                  className="relative w-full h-80 cursor-zoom-in"
                  onClick={() => openImage(event.poster)}
                >
                  <Image
                    src={Array.isArray(event.poster) ? event.poster[0] : event.poster}
                    alt={`${event.title} poster`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={100}
                    className="rounded-lg object-contain"
                  />
                </div>
              </div>

              {/* Details on the right */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="text-sm">{event.attendees}</span>
                    </div>
                  </div>
                </div>

                {new Date(event.sortDate) >= new Date(new Date().toDateString()) ? (
                  <a
                    href={event.formLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8">
                      Register
                    </Button>
                  </a>
                ) : (
                  <p className="text-muted-foreground text-sm italic">
                    Missed this event? Join the next!
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {showViewAll && (
          <div className="text-center mt-10">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-lg font-medium text-primary hover:underline transition"
            >
              View All Events
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>

      {/* Image Popup Overlay */}
      {selectedImages && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-pointer overflow-hidden"
          onClick={closeImage}
        >
          {/* Left arrow */}
          {selectedImages.length > 1 && (
            <button
              className="absolute left-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white/80 hover:text-white transition-colors cursor-pointer"
              onClick={(e) => { e.stopPropagation(); goPrev() }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedImages[selectedIndex]}
            alt="Full poster"
            className="rounded-lg shadow-lg transition-transform duration-150 max-w-3xl max-h-[80vh] object-contain cursor-default"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Right arrow */}
          {selectedImages.length > 1 && (
            <button
              className="absolute right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white/80 hover:text-white transition-colors cursor-pointer"
              onClick={(e) => { e.stopPropagation(); goNext() }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div className="absolute bottom-4 flex flex-col items-center gap-1 select-none">
            {selectedImages.length > 1 && (
              <p className="text-white/80 text-sm">
                {selectedIndex + 1} / {selectedImages.length} · Use arrow keys to navigate
              </p>
            )}
            <p className="text-white/60 text-sm">
              Ctrl + scroll to zoom · Click outside to close
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
