"use client"

import dynamic from "next/dynamic"
import { useEffect } from "react"

const AdminPage = dynamic(
  () =>
    import("decap-cms-app").then((mod: any) => {
      // FIX 1: Grab the right object. If 'default' exists, use it.
      const cms = mod.default || mod

      // Return the component that will run the init code
      return function CmsComponent() {
        useEffect(() => {
          // FIX 2: Prevent double-initialization (common React strict mode issue)
          // @ts-ignore
          if (typeof window !== "undefined" && !window.CMS_MANUAL_INIT) {
            
            console.log("Initializing CMS...") // Debug log
            
            cms.init({ configPath: "/admin/config.yml" })
            
            // @ts-ignore
            window.CMS_MANUAL_INIT = true
          }
        }, [])

        return <div id="nc-root" />
      }
    }),
  { 
    ssr: false,
    loading: () => <div className="p-10 text-center">Loading Admin Panel...</div> 
  }
)

export default AdminPage