# Agent Guidelines for Launcher UI

This document defines the expectations for AI agents working on the Launcher UI for the tabletop game system.

## Core Principles
1. **Launcher-first experience**: The launcher is the front door to the tabletop system. The primary view must stay clear, legible, and action-ready.
2. **No-scroll default**: The launcher surface should fit within standard 16:9 viewports without scrolling. If scrolling is unavoidable, call it out explicitly.
3. **Zero-pixel tolerance**: Visual diffs are treated as regressions. E2E snapshots must be deterministic.
4. **Minimal, scoped changes**: Avoid refactors or unrelated cleanup unless explicitly requested.

## Development Workflow
- Follow `WORKFLOW.md` for branching and PR requirements.
- Use `PR_DESCRIPTION.md` for PR bodies and include the original user prompt(s) verbatim.
- Never bypass pre-commit hooks. Fix the tests instead.

## E2E Testing
- Follow `E2E_GUIDE.md` for structure, helper usage, and snapshot rules.
- Use the unified `TestStepHelper` for all screenshots and documentation.
- Do not mark E2E tests as skipped. Zero-pixel tolerance is enforced by script.

## Project Structure (High-Level)
- `src/routes/`: SvelteKit routes for the launcher UI.
- `src/lib/`: Shared services (Firebase, utilities).
- `tests/`: Unit tests and E2E scenarios.
