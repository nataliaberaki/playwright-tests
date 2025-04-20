import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 60 * 1000,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
    ['github']
  ],

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }
  ],

  use: {
    baseURL: 'https://parabank.parasoft.com/parabank',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    viewport: { width: 1920, height: 1080 },
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },

  outputDir: 'test-results'
  // Removed global setup/teardown
});