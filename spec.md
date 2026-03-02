# Specification

## Summary
**Goal:** Add a Mechanic Registration page, fix admin panel authorization and dynamic services display, store mechanic registrations in the backend, and clean up the UI by removing the floating Call Now button.

**Planned changes:**
- In `NavigationDrawer.tsx`, replace the "Become a Mechanic" WhatsApp link with a "👨‍🔧 Mechanic Registration" menu item that navigates to `/mechanic-registration`
- Remove the `FloatingCallButton` component (fixed circular "Call Now" button) from the app entirely; leave `FloatingWhatsAppButton` untouched
- Create a new `MechanicRegistrationPage` at `/mechanic-registration` with fields: Full Name, Phone Number, Email, Service Type (dropdown), Experience (dropdown), Address, Age, Preferred Area (dropdown), Why want to join; styled to match site theme (dark bg `#0a2b3c`, orange `#ff8c42`, yellow `#FFD700`)
- Form POSTs to `https://formsubmit.co/pandeyxkanha@gmail.com` with hidden fields `_subject`, `_template`, `_captcha`, `_next`, and honeypot `_honey`; on submit shows a full-screen GPay-style success overlay with animated green checkmark SVG and plays the ascending chime via `playSuccessSound()`, then allows redirect
- Register the `/mechanic-registration` route in `App.tsx`
- Fix backend role-based access control so the admin principal can perform service CRUD (add/edit/delete) without "Unauthorized User" errors; services persist in stable storage
- Replace hardcoded services in `ServicesSection.tsx` with dynamically fetched services from the backend using React Query; add `getServices()` backend query and frontend hook if missing
- Add `submitMechanicRegistration()` public func and `getMechanicRegistrations()` admin-only query in `main.mo`; store registrations in stable storage
- In `MechanicRegistrationPage`, also call `submitMechanicRegistration()` on the backend alongside the formsubmit POST (fire-and-forget)
- Add a "Mechanic Registrations" tab/section in `AdminPage.tsx` that fetches and displays all registrations with all relevant columns, visible to admin only

**User-visible outcome:** The site navigation has a Mechanic Registration menu item leading to a dedicated registration form; the floating Call Now button is gone; admins can add/edit/delete services without errors and those services appear live on the homepage; the admin panel shows a Mechanic Registrations section listing all submitted registration details.
