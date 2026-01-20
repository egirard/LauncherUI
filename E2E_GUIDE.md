# E2E Testing Guide

This project uses [Playwright](https://playwright.dev/) for End-to-End testing. Our E2E tests are the primary source of truth for application correctness.

## 1. The Philosophy: "Zero-Pixel Tolerance"

We enforce a strict **Zero-Pixel Tolerance** policy for visual regression. Since visual state is a primary feedback mechanism for the launcher, any deviation is considered a bug.

- **Software Rendering**: Tests run with software rendering flags to keep snapshots consistent.
- **Determinism**: Tests must be perfectly deterministic. Avoid random seeds and non-deterministic data.

## 2. Test Structure

All E2E tests live in `tests/e2e/`. Each test case gets its own directory.

```
tests/e2e/
├── helpers/                   # Shared utilities (TestStepHelper)
├── 001-launcher-home/         # Scenario Directory
│   ├── 001-launcher-home.spec.ts
│   ├── README.md              # Auto-generated verification doc
│   └── screenshots/           # Committed baseline images
```

## 3. The "Unified Step Pattern"

To prevent synchronization errors between documentation and screenshots, we use a **Unified Step API**. You must **never** manually manage filenames or counters.

### The `TestStepHelper`

Use `TestStepHelper` to combine documentation, verification, and screenshot capture into a single atomic operation: `step()`.

```typescript
import { test, expect } from '@playwright/test';
import { TestStepHelper } from '../helpers/test-step-helper';

test('Launcher surface', async ({ page }, testInfo) => {
  const tester = new TestStepHelper(page, testInfo);
  tester.setMetadata('Launcher Surface', 'As a user, I want a clear launcher entry point.');

  await page.goto('/e2e');
  await tester.step('initial-load', {
    description: 'Launcher loads the deterministic surface',
    verifications: [
      { spec: 'Header is visible', check: async () => await expect(page.getByRole('heading')).toBeVisible() }
    ]
  });

  tester.generateDocs();
});
```

This automatically:
1. Generates numbered screenshots (e.g., `000-initial-load.png`).
2. Runs verifications.
3. Generates a documentation markdown file for the test run.

## 4. Playwright Configuration

- **Browsers**: Tests run in Chromium by default.
- **Flags**: We use flags like `--disable-gpu`, `--font-render-hinting=none` for consistent rendering.
- **Timeouts**: The maximum acceptable timeout for any condition is **2000ms**.
- **Waits**: `waitForTimeout` and other arbitrary waits are not allowed; always wait on real UI conditions like `expect().toBeVisible()` or `waitForSelector()`.
