# Agent Guidelines

This document provides essential guidelines for AI agents working on this codebase.

## Core Principles

1.  **E2E Zero-Pixel Tolerance**: Always prioritize visual correctness. Deviations are bugs.
2.  **No Scrolling Standard**: Unless specified, interfaces should often fit within the viewport (check specific project logic for exceptions).
3.  **Minimal Changes**: When fixing bugs or adding features, make the smallest possible change. Avoid refactoring unrelated code unless explicitly requested.

## Project Structure

*   \`src/\`: Application Source.
*   \`tests/\`: Unit and E2E tests.

## Development Workflow

### 1. Test-Driven Development (TDD)
Always write tests before implementation.
*   **Logic**: Write unit tests in \`vitest\`.
*   **UI Features**: Write E2E tests in \`playwright\`.

### 2. E2E Testing Guidelines
*   **Definitive Guide**: Follow \`E2E_TESTING_GUIDELINES.md\` strictly.
*   **Visual Regression**: Every UI change must be verified with visual snapshots.
*   **Documentation**: Tests must generate their own documentation using \`TestStepHelper\`.

### 3. Documentation
*   Keep \`docs/\` up to date if it exists.
*   Update \`AGENTS.md\` if new standard procedures are established.

## Common Procedures

### Modifying UI
1.  Run \`npm run test:e2e\` to establish baseline.
2.  Make changes.
3.  Run \`npm run test:e2e -- --update-snapshots\` to generate new snapshots.
4.  Manually inspect the diffs to ensure they are correct.
