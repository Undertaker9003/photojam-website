# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Photojam is a photography community website built with Next.js 16 (App Router). Multi-page structure with routes: `/` (hub with previews), `/gallery`, `/events`, `/about`. Future plans include Supabase auth and RSVP database (see `docs/architecture_plan.md`).

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build (TypeScript errors are ignored via next.config.mjs)
npm run lint     # ESLint
npm run start    # Serve production build
npx tsx scripts/compress_images.ts  # Compress public/ thumbnails with Sharp
```

## Architecture

- **Routing**: `/` is a hub showing Hero + 3 gallery previews + 3 event previews + CTA. Dedicated pages at `/gallery`, `/events`, `/about`.
- **Shared layout**: `app/layout.tsx` renders Header and Footer on all pages. Individual route pages only contain their unique content.
- **Data layer**: Projects in `lib/projects.ts`, events in `lib/events.ts`. Both export data arrays and `getProjects(limit?)`/`getEvents(limit?)` helpers. Components receive data via props.
- **Client vs Server components**: Header, Hero, Gallery, Events use `"use client"` (interactive/animated). About, CTA, Footer are server components.
- **UI components**: shadcn/ui (New York style) with 60+ components in `components/ui/`. Configured via `components.json`.
- **Styling**: Tailwind CSS v4 with OKLCH CSS variables for light/dark theming. Utility function `cn()` from `lib/utils.ts` (clsx + tailwind-merge).
- **Animations**: framer-motion for hero sequencing.
- **Images**: Mix of local (`public/`) and external (Vercel Blob Storage). Next.js Image component with `unoptimized: true` in config.
- **Path aliases**: `@/*` maps to project root (e.g., `@/components`, `@/lib`, `@/hooks`).

## External Services & Links

- Deployed on Vercel with CORS headers configured in `vercel.json`
- Gallery links point to external Google Drive albums
- Event registration via Google Forms
- Community links: WhatsApp group, Instagram (`photojamcommunity`)

When the codebase changes significantly (new routes, dependencies, or architectural patterns), update this file to keep it accurate.
