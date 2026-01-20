import config from "../playwright.config";

console.log("Verifying Zero Tolerance Policy in playwright.config.ts...");

// @ts-ignore - Playwright config types might vary, we access it dynamically or trust the structure 
// strictly speaking we should type cast it if we want full safety but this script is simple
const maxDiffPixels = (config.expect as any)?.toHaveScreenshot?.maxDiffPixels;

if (maxDiffPixels !== 0 && maxDiffPixels !== undefined) {
    // If it is undefined, it defaults to non-zero? No, Playwright defaults to allowing some? 
    // Actually we want to EXPLICITLY see 0 or defaults might vary. 
    // But usually default is not 0 for some configurations. 
    // Let's assume we want to see it set to 0. 
}

// Re-implementing logic from reference:
// const maxDiffPixels = config.expect?.toHaveScreenshot?.maxDiffPixels;
// if (maxDiffPixels !== 0) { ... }
// If undefined, it !== 0 is true (undefined !== 0). So it forces distinct 0. Good.

if (maxDiffPixels !== 0) {
  console.error(
    `❌ ZERO TOLERANCE VIOLATION: maxDiffPixels is set to ${maxDiffPixels}. It must be 0.`,
  );
  console.error("   ******************************************");
  console.error("   ** You may NOT bypass precommit checks  **");
  console.error("   ** You MAY NOT mark e2e tests as skip.  **");
  console.error("   ** Fixing e2e tests is ALWAYS IN SCOPE. **");
  console.error("   ******************************************");

  process.exit(1);
}

console.log("✅ Zero Tolerance Policy Verified: maxDiffPixels is 0.");
