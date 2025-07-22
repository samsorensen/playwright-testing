import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
  timeout: 30000, // 30 seconds
  retries: 0,     // 0 retries
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000, // timeout for playwright actions (fill, click, etc.)
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
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