import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // The directory where your tests will be located
  timeout: 30000, // Timeout for each test
  expect: {
    timeout: 5000, // Timeout for assertions
  },
  fullyParallel: true, // Run tests in parallel for faster execution
  reporter: [['dot'], ['json', { outputFile: 'results.json' }]], // Reporting options
  use: {
    baseURL: 'http://localhost:3000', // Replace with your dev server's base URL
    trace: 'on-first-retry', // Enable trace for debugging failed tests
  },
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
