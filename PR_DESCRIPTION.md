# Summary
- Implemented Phase 2: Orbit View for the Launcher UI using Threlte and Three.js.
- Games are now rendered as interactive 3D tiles orbiting a central light source.
- Replaced Node 20 with standard Node binaries in Nix flake to prevent slow source compilations.
- Enforced zero-tolerance visual diff determinism by disabling WebGL antialiasing, pausing CSS transitions, and freezing Threlte frameloops (via `prefers-reduced-motion`) exclusively during E2E testing runs.
- Added programmatic TypeScript E2E assertions to strictly calculate and lock down the 3D position logic and alphabetical ordering of games.
- Updated Playwright hook scripts to avoid duplicate test runs per user feedback.
- Repaired the npm lockfile so `npm ci` succeeds under the npm version used by GitHub Actions.
- Removed arbitrary E2E sleeps in favor of frame-based stability checks for the orbit UI.
- Expanded E2E CI to run against both committed Linux and macOS snapshot baselines.
- Fixed Threlte material attachment so game box covers use the committed generated art instead of default white materials.

# Testing
- `npm run ci`
- `npm run check`
- `npm test`
- `npx -y npm@10 ci --dry-run`
- `npm run test:e2e`
- `nix develop -c npm run test:e2e`
- GitHub Actions: Update Linux E2E Snapshots

# Questions / Open Issues
- None.

# Original User Prompt(s)
> Review the current state of this repository. It looks to me like we're done Phase 0 and Phase 1 of https://github.com/egirard/LauncherUI/blob/main/docs/UI_OVERHAUL_DESIGN.md ... confirm that, and move on to Phase 2. Put up a PR with suitable e2e tests to validate the work for Phase 2.
> OK you killed the node 20 build when it was almost done and lost all that progress. If you want to install some version that will come from cache that is fine with me, but verify that you can get it from cache before updatign the project appropriately.
> no you must use nix and not brew to install things. FIx the nix configuration
> unstable should be fine, just find the right node package
> No there are no exceptions for zero pixel tolerance. I've looked at the screenshot difference and the two animations are displaying entirely different frames with the orbiting objects in different positions. Add programmatic asserts for the expected positions of the games in orbit so that you can detect that it is not a screenshot variance but a actual bug in the UI state that is tripping you up. NO EXCEPTIONS. NO BYPASSES. DETECT AND FIX THE ACTUAL PROBLEM.
> OK let's fix things up and get e2e passing locally and in CI on both platforms.
> Ok the boxes are just plain white boxes that aren't using the graphics that are in the PR. Let's fix that.
