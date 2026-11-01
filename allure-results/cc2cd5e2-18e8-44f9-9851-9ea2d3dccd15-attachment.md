# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppOtherWay.spec.js >> @Web Browser Context - Validating Error login
- Location: tests/ClientAppOtherWay.spec.js:3:5

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [aria-hidden] [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("@Web Browser Context - Validating Error login", async ({ page }) => {
  4  |   const email = "doansontung2608@gmail.com";
  5  |   const password = "Test@123";
  6  |   const productName = "ZARA COAT 3";
  7  |   await page.goto("https://rahulshettyacademy.com/client/");
  8  |   await page.getByPlaceholder("email@example.com").fill(email);
  9  |   await page.getByPlaceholder("enter your passsword").fill(password);
  10 |   await page.getByRole("button", { name: "Login" }).click();
  11 |   await page.waitForLoadState("networkidle");
  12 | 
  13 |   await page.locator(".card-body b").first().waitFor();
  14 |   await page
  15 |     .locator(".card-body")
  16 |     .filter({ hasText: productName })
  17 |     .getByRole("button", { name: "Add To Cart" })
  18 |     .click();
  19 | 
  20 |   await page
  21 |     .getByRole("listitem")
  22 |     .getByRole("button", { name: "Cart" })
  23 |     .click();
  24 | 
> 25 |   await page.locator("div li").first().waitFor();
     |                                        ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  26 | 
  27 |   await expect(page.getByText(productName)).toBeVisible();
  28 | 
  29 |   await page.getByRole("button", { name: "Checkout" }).click();
  30 | 
  31 |   await page.getByPlaceholder("Select Country").pressSequentially("ind");
  32 | 
  33 |   await page.getByRole("button", { name: "India" }).nth(1).click();
  34 | 
  35 |   await page.getByText("PLACE ORDER").click();
  36 | 
  37 |   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
  38 | 
  39 |   const orderId = (
  40 |     await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
  41 |   )
  42 |     .replaceAll("|", "")
  43 |     .trim();
  44 |   console.log(orderId);
  45 | 
  46 |   await page.getByRole("button", { name: "ORDERS" }).click();
  47 |   await page.locator("tbody").waitFor();
  48 | 
  49 |   await page.locator("tbody tr").filter({ hasText: orderId }).first().click();
  50 | 
  51 |   const orderIdDetails = await page.getByText(orderId).textContent();
  52 |   expect(orderId.includes(orderIdDetails)).toBeTruthy();
  53 | });
  54 | 
```