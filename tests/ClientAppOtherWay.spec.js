import { test, expect } from "@playwright/test";

test(
  "Browser Context - Validating Error login",
  { tag: "@web" },
  async ({ page }) => {
    const email = "doansontung2608@gmail.com";
    const password = "Test@123";
    const productName = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill(password);
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForLoadState("networkidle");

    await page.locator(".card-body b").first().waitFor();
    await page
      .locator(".card-body")
      .filter({ hasText: productName })
      .getByRole("button", { name: "Add To Cart" })
      .click();

    await page
      .getByRole("listitem")
      .getByRole("button", { name: "Cart" })
      .click();

    await page.locator("div li").first().waitFor();

    await expect(page.getByText(productName)).toBeVisible();

    await page.getByRole("button", { name: "Checkout" }).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind");

    await page.getByRole("button", { name: "India" }).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    const orderId = (
      await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    )
      .replaceAll("|", "")
      .trim();
    console.log(orderId);

    await page.getByRole("button", { name: "ORDERS" }).click();
    await page.locator("tbody").waitFor();

    await page.locator("tbody tr").filter({ hasText: orderId }).first().click();

    const orderIdDetails = await page.getByText(orderId).textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  },
);
