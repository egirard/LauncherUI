# LauncherUI

## Setup
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.emulator` (or `.env.staging`, `.env.production`) and fill in values.
3. Switch environments with `npm run env:local` (or `env:staging`, `env:production`).

## Local Emulator Workflow
- Ensure Java is installed (required for the Firestore emulator).
- Start emulators: `npm run emulators:start`
- Seed Firestore: `npm run emulators:seed`
- Run the dev server: `npm run dev:emulator`

## Testing
- Lint: `npm run lint:fix`
- Unit tests: `npm test`
- E2E tests: `npm run test:e2e`

## Agent Workflow
- See `AGENTS.md` for AI agent rules.
- See `WORKFLOW.md` for PR requirements.
- See `E2E_GUIDE.md` for zero-pixel tolerance tests.
