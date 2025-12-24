"use client";

import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    // Only run this code in the browser
    (async () => {
      const CMS = (await import("decap-cms-app")).default;
      CMS.init();
    })();
  }, []);

  return <div id="nc-root" />; // Decap CMS looks for this ID to mount the UI
}