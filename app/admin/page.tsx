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
            
            // FIX: Remove the specific path. 
            // We will let the CMS find 'config.yml' automatically.
            cms.init() 
            
            // @ts-ignore
            window.CMS_MANUAL_INIT = true
          }
        }, [])

        return <div id="nc-root" />
      }
    }),
  { ssr: false, loading: () => <p>Loading Admin...</p> }
)

export default AdminPage