# Specification

## Summary
**Goal:** Collect phone number during sign-in, fix the Book Online redirect, clean up the Confirm Booking button, and show complete user data in the admin panel.

**Planned changes:**
- Add a required phone number input field to the ProfileModal (shown on first sign-in), save it to the backend user profile
- Remove the ✅ emoji from the "Confirm Booking" button so it reads exactly "Confirm Booking"
- Fix the "Book Online" button on ServiceCards to navigate to a `/booking` route; create a BookingPage component with the full booking form if it does not exist
- Update the admin panel Users tab to display each user's name, phone number, principal ID, service area, and registration timestamp fetched from the backend

**User-visible outcome:** New users are prompted for their phone number at sign-in; the Confirm Booking button no longer has an emoji; clicking Book Online on any service card properly opens the booking page; admins can see full user profile data including phone numbers in the admin panel.
