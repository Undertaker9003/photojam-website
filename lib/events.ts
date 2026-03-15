export type Event = {
  title: string
  date: string
  sortDate: string // ISO date for sorting (YYYY-MM-DD)
  time: string
  location: string
  attendees: string
  description: string
  poster: string | string[]
  formLink: string
}

export const events: Event[] = [
  {
    title: "2025 World Photography Day @Kuala Sepetang",
    date: "December 6-7, 2025",
    sortDate: "2025-12-06",
    time: "6:30 AM - 4.30 PM",
    location: "Kuala Sepetang",
    attendees: "50 photographers",
    description:
      "Join us for a guided exploration, eagle feeding & firefly watching at Kuala Sepetang!",
    poster: "/kuala sepetang thumbnail.webp",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSffD0QIxgQKLeUNzSqAsi1UlRN-0bE0E2HyH74HVTN4SslEMg/viewform?usp=send_form",
  },
  {
    title: "Street Photography Workshop",
    date: "December 21, 2025",
    sortDate: "2025-12-21",
    time: "8:00 AM - 3:00 PM",
    location: "BB Park Bukit Bintang KL",
    attendees: "40 participants",
    description:
      "Master lighting techniques and composition for compelling street photography!",
    poster: "/street photography BB thumbnail.webp",
    formLink: "https://forms.gle/pGWmxfTsMbKkm1j48",
  },
  {
    title: "Photojam Christmas Party 2025",
    date: "December 21, 2025",
    sortDate: "2025-12-21",
    time: "7:00 PM - 10:00 PM",
    location: "Mutiara Central Cheras",
    attendees: "Executives + 2 of your friends/family (optional)",
    description: "Ho ho ho ~ Merry~~CHRISTMAS !!!!",
    poster: "/Christmas Party Invitation.png",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSfwnoPx9le8WvO-Rp0bIt2J3qpcRbVPyg_ga25hTXeDVg9bIg/viewform?usp=send_form",
  },
  {
    title: "Frame the Campus",
    date: "March 6, 2026",
    sortDate: "2026-03-06",
    time: "9:00 AM - 5:00 PM",
    location: "Xiamen University Malaysia",
    attendees: "15 participants",
    description:
      "A photo shoot session and editing class hosted by Xiamen University Malaysia Photography Club!",
    poster: "/xmumtalk.jpeg",
    formLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSeHk5UC6Q-vYvk56Av1Zpw_c8Ii1FumgLFoPFdo82WUhNUtww/viewform?usp=send_form",
  },
  {
    title: "DJI x Photojam Street Photography Workshop",
    date: "March 28, 2026",
    sortDate: "2026-03-28",
    time: "10:00 AM – 3:00 PM",
    location: "Low Yat, Kuala Lumpur",
    attendees: "Limited to 30 slots",
    description:
      "Join us for the DJI x Photojam Street Photography Workshop! Level up your skills with hands-on gear rental, expert sharing by a DJI Ambassador, and a guided street shoot!",
    poster: ["/dji workshop.jpeg", "/dji workshop itinerary.jpeg"],
    formLink: "https://forms.gle/x8JNxDzSh2qmw8F58",
  },
]

export function getEvents(limit?: number): Event[] {
  const sorted = [...events].sort(
    (a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime()
  )
  return limit ? sorted.slice(0, limit) : sorted
}
