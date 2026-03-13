import { Events } from "@/components/events"
import { getEvents } from "@/lib/events"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Events - Photojam",
  description: "Upcoming and past photography events from the Photojam community.",
}

export default function EventsPage() {
  const allEvents = getEvents()

  return (
    <div className="pt-24">
      <Events events={allEvents} />
    </div>
  )
}
