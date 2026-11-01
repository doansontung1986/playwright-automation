// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { on, worker, workers } from "node:cluster";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  retries: 1,
  workers: process.env.CI ? 4 : 6,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    ["list"],
    ["junit", { outputFile: "reports/junit.xml" }],
    ["allure-playwright", { resultsDir: "allure-results" }],
  ],

  projects: [
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: true,
        screenshot: "retain-on-failure",
        video: "retain-on-failure",
        trace: "retain-on-failure",
        // viewport: { width: 1024, height: 768 },
        ignoreHttpsErrors: true,
        permissions: ["geolocation"],
      },
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox",
        headless: true,
        screenshot: "retain-on-failure",
        video: "retain-on-failure",
        trace: "retain-on-failure",
      },
    },
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: true,
        screenshot: "retain-on-failure",
        video: "retain-on-failure",
        trace: "retain-on-failure",
        ...devices["iPad (gen 6)"],
      },
    },
  ],
};

module.exports = config;
