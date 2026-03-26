"use client"

import { useState } from "react"
import { BookOpen, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Replace this URL with your actual flipbook embed URL from Heyzine, Issuu, FlipHTML5, etc.
// Example formats:
//   Heyzine:   https://heyzine.com/flip-book/<your-id>
//   Issuu:     https://e.issuu.com/embed.html?d=<your-doc>&u=<your-user>
//   FlipHTML5: https://online.fliphtml5.com/xxxx/xxxx/
const FLIPBOOK_EMBED_URL = "https://online.fliphtml5.com/faksy/uqki/#p=1"

export function PhotobookViewer() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const hasEmbed = FLIPBOOK_EMBED_URL.length > 0

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pb-24">
      {/* Controls */}
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="gap-2"
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-4 h-4" /> Exit Fullscreen
            </>
          ) : (
            <>
              <Maximize2 className="w-4 h-4" /> Fullscreen
            </>
          )}
        </Button>
      </div>

      {/* Flipbook Container */}
      <div
        className={
          isFullscreen
            ? "fixed inset-0 z-[100] bg-background flex flex-col"
            : "relative w-full"
        }
      >
        {isFullscreen && (
          <div className="flex justify-end p-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(false)}
              className="gap-2"
            >
              <Minimize2 className="w-4 h-4" /> Exit Fullscreen
            </Button>
          </div>
        )}

        <div
          className={
            isFullscreen
              ? "flex-1 w-full"
              : "w-full aspect-[4/3] md:aspect-[16/10] rounded-xl overflow-hidden border border-border"
          }
        >
          {hasEmbed ? (
            <iframe
              src={FLIPBOOK_EMBED_URL}
              className="w-full h-full border-0"
              allowFullScreen
              title="PhotoJam Photobook"
              loading="lazy"
            />
          ) : (
            /* Placeholder — shown when no embed URL is set */
            <div className="w-full h-full bg-muted/30 flex flex-col items-center justify-center gap-6 p-8">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="text-center max-w-md">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Photobook Viewer
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Your digital photobook will appear here. Upload your PDF to a
                  flipbook service like{" "}
                  <a
                    href="https://heyzine.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    Heyzine
                  </a>
                  ,{" "}
                  <a
                    href="https://issuu.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    Issuu
                  </a>
                  , or{" "}
                  <a
                    href="https://fliphtml5.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    FlipHTML5
                  </a>
                  , then paste the embed URL in{" "}
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    components/photobook-viewer.tsx
                  </code>
                  .
                </p>
              </div>

              {/* Mock page spread */}
              <div className="flex gap-2 mt-4 w-full max-w-lg">
                <div className="flex-1 aspect-[3/4] bg-muted rounded-lg border border-border flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Page 1</span>
                </div>
                <div className="flex-1 aspect-[3/4] bg-muted rounded-lg border border-border flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Page 2</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
