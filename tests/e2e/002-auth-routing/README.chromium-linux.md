# Test: Sign-in gating

**As a** player, **I want** sign-in required before the launcher, **so that** sessions stay scoped.

## Sign-in is available when auth is required

![Sign-in is available when auth is required](./screenshots/chromium-linux/000-signin-required.png)

**Verifications:**
- [x] Sign-in heading is visible

---

## Launcher routes to sign-in when auth is required

![Launcher routes to sign-in when auth is required](./screenshots/chromium-linux/001-launcher-redirect.png)

**Verifications:**
- [x] URL ends with /signin
- [x] Sign-in screen is rendered

---

