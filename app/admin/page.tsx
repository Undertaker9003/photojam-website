"use client"

import dynamic from "next/dynamic"
import { useEffect } from "react"
import Script from "next/script" // Import the Script component

const AdminPage = dynamic(
  () =>
    import("decap-cms-app").then((mod) => {
      const cms = mod.default || mod

      return function CmsComponent() {
        useEffect(() => {
          // @ts-ignore
          if (typeof window !== "undefined" && !window.CMS_MANUAL_INIT) {
            
            // Initialize the CMS
            // We use 'as any' to bypass the TypeScript error
            cms.init({ config: { backend: { base_url: 'https://api.netlify.com' } } } as any)
            
            // @ts-ignore
            window.CMS_MANUAL_INIT = true
          }
        }, [])

        return <div id="nc-root" />
      }
    }),
  { ssr: false, loading: () => <p className="p-10 text-center">Loading Admin...</p> }
)

export default function Page() {
  return (
    <>
      {/* This Script is CRITICAL for Vercel users. 
        It allows the Netlify popup to talk to your Next.js app.
      */}
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <AdminPage />
    </>
  )
}