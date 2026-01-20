# UI Overhaul Design: Launcher to Nano Banana

## Overview
This document describes how we will evolve the current launcher UI into the "Nano Banana" experience defined in `docs/SLICK_TABLETOP_LAUNCHER_UI.md`. It focuses on bridging today's Svelte/Firebase launcher to the orbit/grid/pre-launch flows with deterministic visuals suitable for zero-pixel E2E testing.

## Goals
- Deliver the Orbit View, Grid View, and Pre-Launch flows described in `docs/SLICK_TABLETOP_LAUNCHER_UI.md`.
- Preserve a zero-scroll, tabletop-first layout on common 16:9 displays.
- Introduce fluid, tactile interactions (inertia, orbiting, long-press launch).
- Split sign-in from the main launcher screen, with a clear path to removing sign-in entirely.
- Keep E2E snapshots deterministic across platforms (Mac/Windows/Linux).

## Non-Goals (for this phase)
- Full production-ready auth removal.
- Backend/game-session orchestration beyond the existing launcher data.
- Multiplayer state sync and live sessions (future work).

## Current State Summary
- Single page combines sign-in and launcher.
- App list is a simple vertical list of applications from Firestore.
- No visual motion system or 3D/2.5D representation of games.
- E2E infrastructure exists, but only the deterministic `/e2e` surface is snapshot-tested.

## Target Experience
The desired experience is described in `docs/SLICK_TABLETOP_LAUNCHER_UI.md` with:
- Orbit View (default idle, spinning orbital cards).
- Grid View (honeycomb search/browse).
- Game Pre-Launch (modal-like takeover with long-press launch).
- Tactile physics, neon-on-black palette, and multi-seat orientation.

## Technology Decision
### Recommendation: Threlte for the Orbit View + CSS for UI Surfaces
The Orbit View requires fluid orbital motion, parallax, and potential camera transitions. Threlte (Three.js for Svelte) is a good fit for this animated surface, while the Grid and Pre-Launch views can stay in high-quality CSS.

**Why Threlte**
- Orbit mechanics are easier to express as a scene graph (central sun + orbiting nodes).
- Shader-based glow and neon edges are more stable than CSS hacks at scale.
- Camera transitions (zoom to galaxy view, focus game into center) are simpler.

**Why keep CSS for Grid/Pre-Launch**
- Layout-driven UI with text, toggles, filters, and form controls.
- Better accessibility, text rendering, and snapshot stability.
- Avoids overloading WebGL for straightforward UI surfaces.

### Alternative: All-CSS/Canvas
Possible, but higher risk for matching the polished orbit experience. The rotation, depth, and glow effects would likely be more brittle and require a custom canvas engine anyway. If we want to avoid 3D entirely, we would implement an HTML/CSS orbit with strict constraints (fixed transforms, no blur filters), but it will not match the Nano Banana mockups as well.

## Route and State Architecture
### Route Split
- `/signin` (or `/auth`): dedicated sign-in step.
- `/launcher`: main experience (Orbit View default).

**Future**: replace `/signin` with a non-blocking overlay or silent session load, then remove it once auth is optional.

### State Model (high level)
- `launcherState` (Svelte store or Redux-like store)
  - `view`: `"orbit" | "grid" | "prelaunch"`
  - `selectedGameId`
  - `filters`
  - `orientationAngle`
  - `lastInteractionAt`

## Interaction Design Details
### Orbit View
- Swipe to spin orbit with inertia (velocity-based).
- Tap planet center to direct launch.
- Tap info icon to pull into Pre-Launch view.
- Pinch-out on the sun to shift into Galaxy/Category selection (phase 2).

### Grid View
- Honeycomb grid with a search header and edge filters.
- Tap game to launch immediately.
- Tap info icon to open Pre-Launch.
- Auto-dismiss after 30 seconds of inactivity.

### Pre-Launch
- Full-screen takeover, box-art + session config.
- Long-press launch button (1.5s) with progress ring.
- Favourite star toggles game priority.

### Orientation
- For Grid View entry, compute vector from table center to tap; rotate UI to face the user.

## Visual System
- Base background: #050505.
- Primary accent: Banana Yellow (#FFE135).
- Secondary accent: Nano Cyan (#00FFCC).
- Typography: narrow sci-fi sans (final selection pending).
- Lighting: subtle glow halos around orbit items, no heavy blur filters for snapshot stability.

## Implementation Plan
### Phase 0: Doc + Data Prep
- Create this design doc.
- Normalize game metadata in Firestore (title, slug, cover art, tags).

### Phase 1: Route Split + Minimal Launcher Shell
- `/signin` route with current auth component.
- `/launcher` route with placeholder Orbit View shell.
- Data fetch and store update.

### Phase 2: Orbit View (Threlte)
- Threlte scene with sun + orbiting games.
- Inertia-driven rotation + tap targets.
- Deterministic animation mode for E2E (freeze or time-step).

### Phase 3: Grid View (CSS)
- Honeycomb grid layout.
- Search + filter controls.
- Orientation rotation.

### Phase 4: Pre-Launch
- Game detail layout.
- Long-press launch affordance.
- Favourites toggle.

### Phase 5: Polish + System Hardening
- Add E2E tests for orbit, grid, pre-launch.
- Performance pass for low-end hardware.
- Remove sign-in step (future).

## E2E and Determinism
- Use `reducedMotion` for tests and pause orbital animation during snapshots.
- Store platform-specific baselines: `tests/e2e/**/screenshots/chromium-{platform}`.
- Add E2E scenarios for:
  - Orbit idle state.
  - Grid open/close.
  - Pre-launch view with long-press.

## Risks and Mitigations
- **WebGL variability**: Use strict renderer flags, avoid dynamic shaders in test mode.
- **Performance on large screens**: Keep orbit item count capped, LOD for assets.
- **Input complexity**: Implement gesture manager with explicit thresholds and timeouts.

## Open Questions
- Do we need a fallback non-WebGL orbit for older hardware?
- Do we prefer a unified store (Redux Toolkit) or Svelte stores for launcher state?
- Confirm typography selection and licensing for the Nano Banana aesthetic.
