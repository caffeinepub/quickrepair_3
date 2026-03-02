# Specification

## Summary
**Goal:** Remove specific elements from the Header component — a phone/SVG icon link and the "Call Now" button.

**Planned changes:**
- Remove the anchor element (and its child SVG icon) located in the third div group of the header from `Header.tsx`
- Remove the "Call Now" button/link from the header in `Header.tsx`
- Leave the FloatingCallButton component in `App.tsx` untouched

**User-visible outcome:** The header will no longer display the SVG icon link or the "Call Now" button, while the floating call button remains functional elsewhere on the page.
