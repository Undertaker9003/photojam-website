"use client"; // 👈 must be the very first line

import { Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Events() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const events = [
    {
      title: "2025 World Photography Day @Kuala Sepetang",
      date: "December 6-7, 2025",
      time: "6:30 AM - 4.30 PM",
      location: "Kuala Sepetang",
      attendees: "50 photographers",
      description:
        "Join us for a guided exploration, eagle feeding & firefly watching at Kuala Sepetang!",
      poster: "/kuala sepetang thumbnail.jpg",
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSffD0QIxgQKLeUNzSqAsi1UlRN-0bE0E2HyH74HVTN4SslEMg/viewform?usp=send_form",
    },
    {
      title: "Street Photography Workshop",
      date: "December 21, 2025",
      time: "8:00 AM - 3:00 PM",
      location: "BB Park Bukit Bintang KL",
      attendees: "40 participants",
      description:
        "Master lighting techniques and composition for compelling street photography!",
      poster: "/street photography BB thumbnail.jpg",
      formLink: "https://forms.gle/pGWmxfTsMbKkm1j48", // new link
    },
    {
      title: "Coming Soon",
      date: "December 21, 2025",
      time: "7:00 PM - 10:00 PM",
      location: "Mutiara Central Cheras",
      attendees: "Executives + 2 of your friends/family (optional)",
      description: "Ho ho ho ~ Merry~~CHRISTMAS !!!!",
      poster: "/Christmas Party Invitation.png",
      formLink: "https://docs.google.com/forms/d/e/1FAIpQLSfwnoPx9le8WvO-Rp0bIt2J3qpcRbVPyg_ga25hTXeDVg9bIg/viewform?usp=send_form", // new link
    },
  ]

  return (
    <section id="events" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Upcoming Events
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
              {/* Poster on the left */}
              <div className="w-full md:w-1/3 flex justify-center">
                <img
                  src={event.poster}
                  alt={`${event.title} poster`}
                  className="rounded-lg w-full h-64 object-cover cursor-pointer"
                  onClick={() => setSelectedImage(event.poster)}
                />
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
      </div>

      {/* Image Popup Overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full poster"
            className="max-w-3xl max-h-[80vh] rounded-lg shadow-lg"
          />
        </div>
      )}
    </section>
  )
}
