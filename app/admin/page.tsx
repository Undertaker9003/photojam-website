"use client"

import dynamic from "next/dynamic"
import { useEffect } from "react"

const AdminPage = dynamic(
  () =>
    import("decap-cms-app").then((mod) => {
      const cms = mod.default || mod

      return function CmsComponent() {
        useEffect(() => {
          // @ts-ignore
          if (typeof window !== "undefined" && !window.CMS_MANUAL_INIT) {
            console.log("Setting up CMS config...")

            // 1. Manually add the config link tag to the <head>
            // This is the official way to redirect the CMS to a specific config file
            const link = document.createElement("link")
            link.rel = "cms-config-url"
            link.href = "/admin/config.yml"
            document.head.appendChild(link)

            // 2. Initialize the CMS (now it will look at the link tag above)
            cms.init()

            // @ts-ignore
            window.CMS_MANUAL_INIT = true
          }
        }, [])

        return <div id="nc-root" />
      }
    }),
  { 
    ssr: false,
    loading: () => <div className="min-h-screen flex items-center justify-center">Loading Admin Panel...</div> 
  }
)

export default AdminPage