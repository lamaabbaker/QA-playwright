import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const authenticatedTests = /\/(add-to-cart|remove-from-cart)\.spec\.ts/;

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 1,
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,

  reporter: [['html', { open: 'never' }]],

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: [authenticatedTests, /auth\.setup\.ts/],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: [authenticatedTests, /auth\.setup\.ts/],
    },
    {
      name: 'chromium-authenticated',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
      testMatch: authenticatedTests,
    },
    {
      name: 'firefox-authenticated',
      use: {
        ...devices['Desktop Firefox'],
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
      testMatch: authenticatedTests,
    },
  ],

  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
});
