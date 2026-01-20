import { expect, test } from "@playwright/test";
import { TestStepHelper } from "../helpers/test-step-helper";

test("E2E sign-in leads to launcher", async ({ page }, testInfo) => {
  const tester = new TestStepHelper(page, testInfo);
  tester.setMetadata(
    "E2E sign-in flow",
    "**As a** player, **I want** to sign in and land on the launcher, **so that** I can start a session.",
  );

  await page.goto("/signin");

  await tester.step("signin-ready", {
    description: "Sign-in screen is ready",
    verifications: [
      {
        spec: "Emulator sign-in button is visible",
        check: async () =>
          expect(page.getByTestId("emulator-signin")).toBeVisible(),
      },
    ],
  });

  await page.getByTestId("emulator-signin").click();

  await tester.step("launcher-visible", {
    description: "Launcher loads after sign-in",
    verifications: [
      {
        spec: "URL ends with /launcher",
        check: async () => expect(page).toHaveURL(/\/launcher$/),
      },
      {
        spec: "Launcher heading is visible",
        check: async () =>
          expect(
            page.getByRole("heading", { name: "Launcher Orbit View" }),
          ).toBeVisible(),
      },
      {
        spec: "Games section is present",
        check: async () =>
          expect(
            page.getByRole("heading", { name: "Available Games" }),
          ).toBeVisible(),
      },
      {
        spec: "Games list is populated",
        check: async () =>
          expect(
            page.getByTestId("applications-list").locator("li"),
          ).toHaveCount(3),
      },
    ],
  });

  tester.generateDocs();
});
