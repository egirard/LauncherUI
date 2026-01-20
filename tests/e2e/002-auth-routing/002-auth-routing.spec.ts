import { expect, test } from "@playwright/test";
import { TestStepHelper } from "../helpers/test-step-helper";

test("Sign-in gating routes to launcher", async ({ page }, testInfo) => {
  const tester = new TestStepHelper(page, testInfo);
  tester.setMetadata(
    "Sign-in gating",
    "**As a** player, **I want** sign-in required before the launcher, **so that** sessions stay scoped.",
  );

  await page.goto("/");

  await tester.step("root-redirect", {
    description: "Root redirects to sign-in",
    verifications: [
      {
        spec: "URL ends with /signin",
        check: async () => expect(page).toHaveURL(/\/signin$/),
      },
      {
        spec: "Sign-in heading is visible",
        check: async () =>
          expect(
            page.getByRole("heading", { name: "Sign in to continue" }),
          ).toBeVisible(),
      },
    ],
  });

  await page.goto("/launcher");

  await tester.step("launcher-redirect", {
    description: "Launcher routes to sign-in when unauthenticated",
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
    ],
  });

  tester.generateDocs();
});
