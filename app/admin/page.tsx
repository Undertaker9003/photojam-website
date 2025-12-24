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
            
            console.log("Forcing config path...")
            
            // FIX: We use 'as any' to bypass the TypeScript error.
            // This works because the library supports this option, 
            // even if the type definitions don't know about it yet.
            cms.init({ configPath: '/admin/config.yml' } as any)
            
            // @ts-ignore
            window.CMS_MANUAL_INIT = true
          }
        }, [])

        return <div id="nc-root" />
      }
    }),
  { 
    ssr: false,
    loading: () => <div className="flex h-screen items-center justify-center">Loading Admin...</div>
  }
)

export default AdminPage