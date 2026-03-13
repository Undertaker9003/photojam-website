# Multi-Page Restructure, Authentication, and RSVP Database

This document outlines the steps to upgrade the Photojam website from a static single-page site into a full-stack multi-page application. We will remove the old CMS, implement user login, and set up a system for users to RSVP to events.

## What is an RSVP database?
An **RSVP database** is simply a digital list stored on a server that tracks which users are attending which events. Instead of a Whatsapp group where people say "I'm coming," users click an "RSVP" button on the website. The database records their User ID and the Event ID, allowing you (the admin) to easily see a list of attendees for any given event. 

## Technology Choice
We will use a Backend-as-a-Service (BaaS) to handle the database and user logins. **Supabase** is highly recommended here, as it provides a free Postgres database and a built-in authentication system that works perfectly with Next.js. 

To proceed with the backend portion, you will need to create a free account at [Supabase](https://supabase.com/), create a new project, and provide the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Proposed Changes

### Page Restructuring
We will split the current `app/page.tsx` into multiple routes.

#### [MODIFY] app/page.tsx
Simplify the Home page to act as a landing hub. It will retain the Hero and CTA, but only show "featured" or "upcoming" snippets of the Gallery and Events.

#### [NEW] app/gallery/page.tsx
A dedicated page that imports the `<Gallery />` component to display all past photoshoot collections.

#### [NEW] app/events/page.tsx
A dedicated page displaying upcoming and past events. This page will later list events sourced directly from the database instead of hardcoded data.

#### [NEW] app/about/page.tsx
A dedicated page displaying the full `<About />` component and potentially society committee details.

#### [MODIFY] components/header.tsx
Update the navigation links (e.g., `#gallery` becomes `/gallery`, `#events` becomes `/events`).

---

### Authentication and RSVP System

#### [NEW] utils/supabase/client.ts & server.ts
Utility files to initialize the Supabase client for reading/writing database data and managing authentication sessions.

#### [NEW] app/login/page.tsx
A dedicated login and sign-up page for new members to create accounts, replacing the direct WhatsApp link.

#### [NEW] app/api/auth/callback/route.ts
Server route to handle authentication callbacks from Supabase.

#### [MODIFY] components/events.tsx
Update the event cards to include an "RSVP" button that saves the user's intention to attend the event directly into the Supabase database.
