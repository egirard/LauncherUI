# Slick Tabletop Launcher UI Design Proposal (Rev 4)

This PR adds a design proposal for the Tabletop Launcher UI, following the "Nano Banana" aesthetic.
**Update 3**: Added Direct Launch, Info Mode, and detailed Favourites algorithm.

## Changes
- Updated `docs/SLICK_TABLETOP_LAUNCHER_UI.md`:
    - **Direct Launch**: Tapping a game launches it immediately (no modal).
    - **Info Mode**: Tapping the "i" badge opens the Pre-Launch details.
    - **Favourites Algorithm**: Rolling 4-week window (preceding last session) + 1000pt manual boost.
    - **No Tutorial**: Design assumes intuitive usage without on-boarding flows.

## User Request
> ...default tap action should just be to launch the game... there should be a 'favourites' cluster...

## Features
1.  **Orbit View**: Solar system navigation with physics-based inertia.
2.  **Favourites**: "Gold Cluster" based on smart time-windowed usage stats.
3.  **Smart Orientation**: UI rotates to face the active user.
4.  **Action Separation**: "Tap to Play" vs "Info for Details" speed up the flow for experienced groups.
