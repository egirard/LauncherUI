import { defineConfig } from "@playwright/test";

const platformMap: Record<string, string> = {
  darwin: "macos",
  linux: "linux",
  win32: "windows",
};

const snapshotTarget =
  process.env.E2E_SNAPSHOT_TARGET ??
  platformMap[process.platform] ??
  "linux";

const projectName = `chromium-${snapshotTarget}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5188",
    trace: "on-first-retry",
    contextOptions: { reducedMotion: "reduce" },
    serviceWorkers: "block",
    launchOptions: {
      args: [
        "--font-render-hinting=none",
        "--disable-font-subpixel-positioning",
        "--disable-lcd-text",
        "--disable-skia-runtime-opts",
        "--disable-system-font-check",
        "--disable-features=FontAccess,WebRtcHideLocalIpsWithMdns",
        "--force-device-scale-factor=1",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--use-gl=swiftshader",
        "--disable-smooth-scrolling",
        "--disable-partial-raster",
      ],
    },
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    timezoneId: "UTC",
    locale: "en-US",
  },
  snapshotPathTemplate:
    "{testDir}/{testFileDir}/screenshots/{projectName}/{arg}.png",
  projects: [
    {
      name: projectName,
      use: { browserName: "chromium" },
    },
  ],
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 5188 --strictPort",
    url: "http://localhost:5188",
    reuseExistingServer: false,
  },
  timeout: 60000,
  expect: {
    timeout: 2000,
    toHaveScreenshot: { maxDiffPixels: 0 },
  },
});
