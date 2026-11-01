// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { on, worker, workers } from "node:cluster";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  retries: 1,
  workers: 6,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    ["html"],
    ["list"],
    ["allure-playwright", { resultsDir: "allure-results" }],
  ],

  use: {
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    browserName: "chromium",
    headless: true,
    screenshot: "on",
    video: "retain-on-failure",
    trace: "on",
  },
};

module.exports = config;
