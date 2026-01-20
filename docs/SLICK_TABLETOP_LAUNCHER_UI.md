# Slick Tabletop Launcher UI: Nano Banana Edition

## Overview
This proposal outlines the UX/UI for the "Launcher" component of a tabletop game system. The focus is strictly on the **Game Selection** and **Game Initiation** flows. The design language, "Nano Banana," emphasizes high-contrast neon aesthetics, fluid orbital mechanics, and tactile touch interactions suitable for a dining room table context.

## Core Philosophy: The Nano Banana Aesthetic
- **Tactile Physics**: Digital objects have weight and inertia. Swiping feels like spinning a physical wheel.
- **Dark Mode Native**: Deep blacks (#050505) with "Banana Yellow" (#FFE135) and "Nano Cyan" (#00FFCC) accents.
- **Social Orientation**: The UI creates a centerpiece for the gathering, rotating to welcome users from any seat.

---

## 1. The Orbit View (Default)
The idle state of the table, designed to be visually arresting but not overwhelming.

### Visual Concept
![Orbit View](./images/launcher_orbit_selection.png)
*Concept: Games "orbit" a central sun. The active category (e.g., "Strategy") is the sun.*

### Interactions
1.  **Orbital Spin**:
    -   Users can swipe anywhere on the glass to spin the solar system.
    -   **Friction**: The spin has inertia, slowing down gradually.
    -   **Gravitational Pull**: Tapping a "planet" (game) pulls it into the center, transitioning to the **Pre-Launch** view.

2.  **Solar Shift**:
    -   Pinching the "Sun" (Category) zooms out to a galaxy view to select a different genre (Family, RPG, Wargame).

---

## 2. The Grid View (Browse)
For power users or when searching for a specific title in a large library.

### Visual Concept
![Library Grid](./images/launcher_library_grid.png)
*Concept: A "Honeycomb" grid maximizing screen real estate while maintaining the hexagonal aesthetic.*

### Features
1.  **Smart Filters**:
    -   **Edge Filters**: Sliders on the table edge allow multiple users to filter simultaneously (e.g., "Player Count: 4", "Time: < 60m").
    -   The grid dynamically reshuffles to bubble up matching games to the center.

2.  **Omni-Search**:
    -   A floating search bar that can be dragged to any user's orientation.
    -   Typing filters the honeycomb instantly.

---

## 3. Game Pre-Launch
The final step before the game begins. This is a modal-like state that takes over the screen.

### Visual Concept
![Game Details](./images/launcher_game_details.png)
*Concept: A rich, immersive "Box Back" experience. High-fidelity art, setup options, and a clear call to action.*

### UI Elements
1.  **Session Config**:
    -   **Player Slider**: A neon slider to set the number of players.
    -   **Difficulty Toggle**: Simple toggle for Standard/Hardcore modes.
    
2.  **The Launch Button**:
    -   A massive, pulsing "LAUNCH SESSION" button.
    -   **Interaction**: Requires a "Long Press" (1.5s) to activate, filling up with light, to prevent accidental starts.
    -   **Transition**: Upon release, the button explodes into particles that form the loading screen for the game engine.

## Navigation Flow
1.  **Idle**: Orbit View.
2.  **Search**: Tap "Grid" icon -> Grid View.
3.  **Select**: Tap a Planet (Orbit) or Hex (Grid) -> Pre-Launch View.
4.  **Confirm**: Long-press "Launch" -> Game Starts.
