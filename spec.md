# Specification

## Summary
**Goal:** Add Internet Identity authentication, user registration with a profile modal, an admin panel, and React Query hooks to the QuickRepair application.

**Planned changes:**
- Extend the Motoko backend (`backend/main.mo`) with `registerUser`, `getMyProfile`, `getUsers`, `deleteUser`, and `deleteFeedback` functions; add a hardcoded admin principal constant (`"2vxsx-fae"`); add a unique Nat `id` field to stored feedback entries
- Update the `Header` component to show a "Sign In" / "Sign Out" button using the existing `useInternetIdentity` hook; display the user's name or truncated principal when authenticated; auto-open ProfileModal on first login when no profile exists
- Create `ProfileModal.tsx`: a centered dark-themed modal with Full Name, Phone Number, and Service Area (six localities) fields; "Save Profile" calls `registerUser` and invalidates the profile cache; "Skip for now" dismisses without saving
- Create `AdminPage.tsx` and add a `/admin` route; show "Access Denied" to unauthenticated or non-admin users; show a Registered Users table and a Customer Feedback table with delete actions per row; both tables fetched via React Query
- Add React Query hooks to `frontend/src/hooks/useQueries.ts`: `useMyProfile`, `useAllUsers`, `useRegisterUser` mutation, `useDeleteUser` mutation, and `useDeleteFeedback` mutation

**User-visible outcome:** Users can sign in with Internet Identity, complete a profile on first login, and view their session in the header. An admin visiting `/admin` can view all registered users and feedback entries and delete individual records.
