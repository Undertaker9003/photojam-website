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
            
            // FIX: Point to the root config file
            // We use 'as any' to bypass the TypeScript check
            cms.init({ configPath: '/config.yml' } as any)
            
            // @ts-ignore
            window.CMS_MANUAL_INIT = true
          }
        }, [])

        return <div id="nc-root" />
      }
    }),
  { ssr: false, loading: () => <p>Loading...</p> }
)

export default AdminPage