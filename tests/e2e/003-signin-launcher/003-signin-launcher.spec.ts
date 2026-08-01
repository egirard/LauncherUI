import { type Page, expect, test } from "@playwright/test";
import { TestStepHelper } from "../helpers/test-step-helper";

const readGameCardPositions = async (page: Page) =>
  page.locator(".game-card").evaluateAll((cards) =>
    cards.map((card) => {
      const box = card.getBoundingClientRect();
      return {
        x: Math.round(box.x),
        y: Math.round(box.y),
      };
    }),
  );

const waitForAnimationFrames = async (page: Page, frameCount = 2) =>
  page.evaluate(
    (frames) =>
      new Promise<void>((resolve) => {
        let remaining = frames;
        const tick = () => {
          remaining -= 1;
          if (remaining <= 0) {
            resolve();
            return;
          }
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
    frameCount,
  );

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

          const initialPositions = await readGameCardPositions(page);
          await waitForAnimationFrames(page);
          const nextPositions = await readGameCardPositions(page);

          // Programmatically assert none of the games are moving/orbiting.
          // If this fails, Svelte/ThreeJS is leaking animations into the E2E state.
          expect(nextPositions).toEqual(initialPositions);
        },
      },
    ],
  });

  tester.generateDocs();
});
