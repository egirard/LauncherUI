# Slick Tabletop Launcher UI Design Proposal (Rev 3)

This PR adds a design proposal for the Tabletop Launcher UI, following the "Nano Banana" aesthetic.
**Update 2**: Added detailed interaction specs for Search, Orientation, and Galaxy View.

## Changes
- Updated `docs/SLICK_TABLETOP_LAUNCHER_UI.md`:
    - Added "Interaction: Invoking & Orientation" section.
    - Added "Solar Shift (Category Selection)" details.
    - Defined math for orientation detection ($atan2(y, x) - 90\deg$).
    - Defined "Search Satellite" trigger mechanism.

## User Request
> The deisgn needs more written detials. How does the user choose the category for teh orbit view, how do they transition to the search view, how does teh table know which side of the table the user has started interacting from...

## Features
1.  **Orbit View**: Solar system navigation with physics-based inertia.
2.  **Galaxy Zoom**: Pinch-out to switch categories.
3.  **Smart Orientation**: Search grid originates from the user's side of the table based on touch vector.
4.  **Auto-Dismiss**: Search grid fades after 30s of inactivity.
