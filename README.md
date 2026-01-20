# LauncherUI

Installation and configuration Stuff
bun i
bunx firebase login
>>>> probably not needed bunx firebase init

Build website and deploy to firebase server
bun run build
bunx firebase deploy

Run continuous integration tests:
bun run ci
Fix linting (necessary for checkin)
bun run lint:fix
Run the dev server (only have to do this once; server will auto-reload on save)
bun run dev

For general dev work,
bun run dev

## Agent Workflow
- See `AGENTS.md` for AI agent rules.
- See `WORKFLOW.md` for PR requirements.
- See `E2E_GUIDE.md` for zero-pixel tolerance tests.
