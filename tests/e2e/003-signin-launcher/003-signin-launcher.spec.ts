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
            page.getByRole("heading", { name: "Launcher", exact: true }),
          ).toBeVisible(),
      },
      {
        spec: "Games are rendered in deterministic alphabetical order",
        check: async () => {
          await expect(page.locator(".game-card")).toHaveCount(3);

          // Verify exact deterministic order due to Firestore sorting
          const expectedTitles = [
            "Nano Banana",
            "Orbit Arcade",
            "Tabletop Core",
          ];
          for (let i = 0; i < 3; i++) {
            await expect(page.locator(".game-card").nth(i)).toHaveText(
              expectedTitles[i],
            );
          }

          // Log and verify exact deterministic 3D positions mapped to 2D
          const initialBoxes: { x: number; y: number }[] = [];
          for (let i = 0; i < 3; i++) {
            const box = await page.locator(".game-card").nth(i).boundingBox();
            expect(box).not.toBeNull();
            if (!box) throw new Error("Box was null");
            initialBoxes.push(box);
          }

          // Wait to ensure UI state is actually frozen
          await page.waitForTimeout(500);

          for (let i = 0; i < 3; i++) {
            const box = await page.locator(".game-card").nth(i).boundingBox();
            expect(box).not.toBeNull();

            // Programmatically assert none of the games are moving/orbiting.
            // If these fail, Svelte/ThreeJS is leaking animations into the E2E state.
            if (!box || !initialBoxes[i]) throw new Error("Box was null");
            expect(Math.round(box.x)).toBe(Math.round(initialBoxes[i].x));
            expect(Math.round(box.y)).toBe(Math.round(initialBoxes[i].y));
          }
        },
      },
    ],
  });

  tester.generateDocs();
});
