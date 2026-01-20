import { test, expect } from '@playwright/test';
import { TestStepHelper } from '../helpers/test-step-helper';

test('Application loads and shows title', async ({ page }, testInfo) => {
  const tester = new TestStepHelper(page, testInfo);
  tester.setMetadata('Sanity Check', 'Ensure the application loads successfully.');

  await page.goto('/');

  await tester.step('initial-load', {
    description: 'Home page loads',
    verifications: [
      {
        spec: 'Welcome heading is visible',
        check: async () => {
             await expect(page.locator('h1')).toHaveText("Welcome to Tabletop's Launcher UI");
        }
      }
    ]
  });

  tester.generateDocs();
});
