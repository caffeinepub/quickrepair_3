# Specification

## Summary
**Goal:** Add IP-based location detection to the booking form so the address field is auto-filled and latitude/longitude are captured on page load.

**Planned changes:**
- On mount, fetch `https://ipapi.co/json/` using `useEffect` + `fetch` in `BookingPage.tsx` and/or `BookingFormSection.tsx`.
- Display a status message near the booking form: `📍 Detecting location...` while fetching, `✅ Location detected!` on success, or an appropriate error message prompting manual entry on failure.
- Auto-fill the address field with `city, region, country_name` from the API response if the field is currently empty.
- Store `latitude` and `longitude` values in hidden form inputs (`name` and `id` attributes set accordingly) so they are submitted with the form.
- Use React `useState`, `useEffect`, and `useRef` — no direct DOM manipulation or plain `<script>` tags.
- No changes to existing design, layout, animations, SEO content, or other form functionality.

**User-visible outcome:** When a user opens the booking page, their location is automatically detected and the address field is pre-filled with their city, region, and country. A status message keeps them informed of the detection progress or prompts manual entry if detection fails.
