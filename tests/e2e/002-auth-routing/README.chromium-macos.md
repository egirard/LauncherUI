# Test: Sign-in gating

**As a** player, **I want** sign-in required before the launcher, **so that** sessions stay scoped.

## Root redirects to sign-in

![Root redirects to sign-in](./screenshots/chromium-macos/000-root-redirect.png)

**Verifications:**
- [x] URL ends with /signin
- [x] Sign-in heading is visible

---

## Launcher routes to sign-in when unauthenticated

![Launcher routes to sign-in when unauthenticated](./screenshots/chromium-macos/001-launcher-redirect.png)

**Verifications:**
- [x] URL ends with /signin
- [x] Sign-in screen is rendered

---

