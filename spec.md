# Specification

## Summary
**Goal:** Remove unwanted timing options and the Live Location Tracking feature from the booking form.

**Planned changes:**
- Remove 'ASAP', 'Within 10 minutes', 'Within 15 MINUTES', and 'Today' from the Service Timing dropdown in `BookingFormSection.tsx` and `BookingPage.tsx`
- Keep only 'Within 30 minutes' and 'Within 1 hour' as timing options
- Remove the Live Location Tracking button/map/GPS UI from the booking form
- Keep the address text input field and IP-based auto-fill (ipapi.co) functionality intact

**User-visible outcome:** The booking form's timing dropdown will show only two options ("Within 30 minutes" and "Within 1 hour"), and the Live Location Tracking UI will no longer appear — users can still manually type their address.
