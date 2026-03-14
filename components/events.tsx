"use client"

import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { type Event } from "@/lib/events"

type EventsProps = {
  events: Event[]
  showViewAll?: boolean
}

export function Events({ events, showViewAll }: EventsProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)

  function openImage(src: string) {
    setSelectedImage(src)
    setZoomLevel(1)
  }

  function closeImage() {
    setSelectedImage(null)
    setZoomLevel(1)
  }

  useEffect(() => {
    if (!selectedImage) return

    function handleWheel(e: WheelEvent) {
      if (!e.ctrlKey) return
      e.preventDefault()
      setZoomLevel(prev => {
        const delta = e.deltaY > 0 ? -0.25 : 0.25
        return Math.min(5, Math.max(1, prev + delta))
      })
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [selectedImage])

  return (
    <section id="events" className="py-24 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-4">
            Events
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow photographers and elevate your skills
          </p>
        </div>

        <div className="grid gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 md:p-8 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6"
            >
              {/* Poster on the left — fixed to Street Photography aspect ratio (763:1080) */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div
                  className="relative w-full h-80 cursor-zoom-in"
                  onClick={() => openImage(event.poster)}
                >
                  <Image
                    src={event.poster}
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

                <a
                  href={event.formLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8">
                    Register
                  </Button>
                </a>
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
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-pointer overflow-hidden"
          onClick={closeImage}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedImage}
            alt="Full poster"
            className="rounded-lg shadow-lg transition-transform duration-150 max-w-3xl max-h-[80vh] object-contain cursor-default"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-4 text-white/60 text-sm select-none">
            Ctrl + scroll to zoom · Click outside to close
          </p>
        </div>
      )}
    </section>
  )
}
