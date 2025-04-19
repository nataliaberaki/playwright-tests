import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Global timeout (30 minutes)
  timeout: 30 * 60 * 1000,

  // Retry failed tests on CI only
  retries: process.env.CI ? 1 : 0,

  // Parallelize tests in workers
  workers: process.env.CI ? 2 : 4,

  // Reporters
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
    ['github']
  ],

  // Configure projects for different browsers
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

  // Shared test settings
  use: {
    // Base URL for all tests
    baseURL: 'https://parabank.parasoft.com/parabank',

    // Capture screenshot on failure
    screenshot: 'only-on-failure',

    // Record video for all tests
    video: 'retain-on-failure',

    // Trace collection
    trace: 'retain-on-failure',

    // Viewport settings
    viewport: { width: 1920, height: 1080 },

    // Extra HTTP headers
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },

  // Folder structure
  outputDir: 'test-results',

  // Global setup/teardown
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
});
