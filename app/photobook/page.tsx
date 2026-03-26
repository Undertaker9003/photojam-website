import type { Metadata } from "next"
import { PhotobookViewer } from "@/components/photobook-viewer"

export const metadata: Metadata = {
  title: "Photobook - PhotoJam",
  description: "Browse our digital photobook collection.",
}

export default function PhotobookPage() {
  return (
    <div className="pt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-35">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-8xl font-serif text-foreground mb-8 text-balance">
            PHOTOBOOK
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Flip through our collection — a visual story of the community.
          </p>
        </div>
      </div>
      <PhotobookViewer />
    </div>
  )
}
