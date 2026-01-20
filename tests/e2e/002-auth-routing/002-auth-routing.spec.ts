import { expect, test } from "@playwright/test";
import { TestStepHelper } from "../helpers/test-step-helper";

test("Sign-in gating routes to launcher", async ({ page }, testInfo) => {
  const tester = new TestStepHelper(page, testInfo);
  tester.setMetadata(
    "Sign-in gating",
    "**As a** player, **I want** sign-in required before the launcher, **so that** sessions stay scoped.",
  );

  await page.goto("/signin");

  await tester.step("signin-required", {
    description: "Sign-in is available when auth is required",
    verifications: [
      {
        spec: "Sign-in heading is visible",
        check: async () =>
          expect(
            page.getByRole("heading", { name: "Sign in to continue" }),
          ).toBeVisible(),
      },
      {
        spec: "Emulator sign-in is available",
        check: async () =>
          expect(page.getByTestId("emulator-signin")).toBeVisible(),
      },
    ],
  });

  await page.goto("/launcher");

  await tester.step("launcher-redirect", {
    description: "Launcher routes to sign-in when auth is required",
    verifications: [
      {
        spec: "URL ends with /signin",
        check: async () => expect(page).toHaveURL(/\/signin$/),
      },
      {
        spec: "Sign-in screen is rendered",
        check: async () =>
          expect(
            page.getByText("Your session unlocks the launcher experience."),
          ).toBeVisible(),
      },
      {
        spec: "Emulator sign-in is available",
        check: async () =>
          expect(page.getByTestId("emulator-signin")).toBeVisible(),
      },
    ],
  });

  tester.generateDocs();
});
