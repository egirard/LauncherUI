# Summary
- Add an E2E sign-in flow that transitions to the launcher using a deterministic bypass.
- Allow auth-required mode via query params so auth gating can still be tested under E2E bypass.
- Capture new platform-specific E2E baselines for the auth routing coverage.

# Testing
- `npm run ci`
- `npm test`
- `npm run test:e2e`

# Questions / Open Issues
- None.

# Original User Prompt(s)
> Yes we need e2e coverage of all code as you produce it.
>
> Yes, you must always generate Linux CI baselines so that the PR looks clean.
>
> There's no E2E test that shows the user signing in and then seing teh launcher screen. There should be one. You may need to use firebase's auth emulator for the purpose.
