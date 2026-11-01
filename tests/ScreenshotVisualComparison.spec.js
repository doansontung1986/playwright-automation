import { test, expect } from "@playwright/test";

test("Screenshot & Visual Comparison", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page
    .locator("#displayed-text")
    .screenshot({ path: "partialScreenshot.png" });
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: "screenshot.png" });
  await expect(page.locator("#displayed-text")).toBeHidden();
});

test("Visual", async ({ page }) => {
  await page.goto("https://www.google.com.vn/");
  expect(await page.screenshot()).toMatchSnapshot("landing.png");
});
