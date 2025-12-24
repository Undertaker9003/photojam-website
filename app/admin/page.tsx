"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const DecapCMS = dynamic(
  () =>
    import("decap-cms-app").then((cms: any) => {
      // FIX: Explicitly tell it where the config file lives
      // This prevents the 404 error if the URL is missing a slash
      cms.init({ configPath: '/admin/config.yml' }); 
      return () => null;
    }),
  { ssr: false }
);

export default function AdminPage() {
  return <DecapCMS />;
}