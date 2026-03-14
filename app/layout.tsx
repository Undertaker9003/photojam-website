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
  title: "Photojam - Photography Society",
  description: "Join Photojam, a vibrant photography society celebrating the art of capturing moments.",
  generator: "v0.app",
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
