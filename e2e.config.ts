import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
  timeout: 20000, // 20 seconds
  retries: 0,     // 0 retries
  testDir: 'tests/e2e',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000, // timeout for playwright actions (fill, click, etc.)
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot: 'off'
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'Webkit',
      use: { browserName: 'webkit' },
    }
  ]
}

export default config;