import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: {
    default: "PhotoJam - Photography Community in Malaysia",
    template: "%s | PhotoJam",
  },
  description:
    "PhotoJam is a photography community in Malaysia. Join our workshops, photo walks, and events to connect with fellow photographers and grow your craft.",
  keywords: [
    "PhotoJam",
    "PhotoJam Malaysia",
    "photography community Malaysia",
    "photography society Malaysia",
    "photo walks Malaysia",
    "photography workshops",
    "photography events Malaysia",
  ],
  metadataBase: new URL("https://photojam.com.my"),
  openGraph: {
    title: "PhotoJam - Photography Community in Malaysia",
    description:
      "Join PhotoJam, a vibrant photography community in Malaysia. Workshops, photo walks, and events for all skill levels.",
    url: "https://photojam.com.my",
    siteName: "PhotoJam",
    locale: "en_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhotoJam - Photography Community in Malaysia",
    description:
      "Join PhotoJam, a vibrant photography community in Malaysia. Workshops, photo walks, and events for all skill levels.",
  },
  alternates: {
    canonical: "https://photojam.com.my",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${dmSerif.variable}`}>
        <Header />
        <main id="top" className="bg-background scroll-smooth">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
