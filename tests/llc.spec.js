import { expect, test } from "@playwright/test";

test("@Web Playwright Special locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("abc123");
  await page.getByRole("button", { name: "Submit" }).click();

  // 5 seconds default timeout for expect assertions -- {timeout: 10_000 } is step level
  await expect(
    page.getByText("Success! The Form has been submitted successfully!."),
  ).toBeVisible({ timeout: 10_000 });
  await page.getByRole("link", { name: "Shop" }).click();
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click();
});

test("@Web Playwright Test level timeout", async ({ page }) => {
  test.setTimeout(60_000);
  const slowExpect = expect.configure({ timeout: 9000 });

  page.setDefaultTimeout(9000);
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").check();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Female");
  await page.getByPlaceholder("Password").fill("abc123");
  await page.getByRole("button", { name: "Submit" }).click(); // 10 seconds

  // 5 seconds default timeout for expect assertions -- {timeout: 10_000 } is step level
  await slowExpect(
    page.getByText("Success! The Form has been submitted successfully!."),
  ).toBeVisible();
  await page.getByRole("link", { name: "Shop" }).click({ timeout: 15_000 });
  await slowExpect(page.locator(".my-4").first()).toContainText("Shop");
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" })
    .getByRole("button")
    .click();
});
