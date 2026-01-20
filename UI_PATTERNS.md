# UI Patterns & Constraints

This document defines the UI constraints for the launcher surface.

## Launcher Constraint: "No Scrolling by Default"

The launcher should fit within the viewport on standard 16:9 displays.

- **Why?** The launcher is often displayed on a shared tabletop or kiosk screen.
- **Solution**: Use responsive scaling and concise layouts. If scrolling is unavoidable, document it explicitly.

## Multi-Device Layout

- **Desktop/Tablet**: Primary target. Keep interactive targets at least 44px.
- **Mobile**: Launcher remains usable with clear vertical hierarchy.

## Visual Style

- **Clarity**: High-contrast text and legible labels.
- **Motion**: Avoid gratuitous animation; ensure snapshots remain deterministic in E2E tests.
- **Consistency**: Use predictable spacing and align to a simple grid.
