import { expect, test } from "@playwright/test";
import { TestStepHelper } from "../helpers/test-step-helper";

test("Launcher UI E2E surface loads", async ({ page }, testInfo) => {
  const tester = new TestStepHelper(page, testInfo);
  tester.setMetadata(
    "Launcher UI E2E Surface",
    "**As a** developer, **I want** a deterministic launcher surface, **so that** pixel diffs are meaningful.",
  );

  await page.goto("/e2e");

  await tester.step("initial-load", {
    description: "E2E surface renders deterministic content",
    verifications: [
      {
        spec: "Surface header is visible",
        check: async () =>
          expect(
            page.getByRole("heading", { name: "Launcher UI E2E Surface" }),
          ).toBeVisible(),
      },
      {
        spec: "Status badge reads Ready",
        check: async () =>
          expect(page.getByTestId("e2e-status")).toHaveText("Ready"),
      },
    ],
  });

  tester.generateDocs();
});
