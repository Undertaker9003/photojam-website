import type { Metadata } from "next"
import { Donation } from "@/components/donation"

export const metadata: Metadata = {
  title: "Photobook - PhotoJam",
  description: "Support PhotoJam and receive a premium photobook celebrating Malaysia's cultural heritage.",
}

export default function PhotobookPage() {
  return (
    <div className="pt-24">
      <Donation />
    </div>
  )
}
