import { test, expect } from "@playwright/test";

test(
  "Browser Context - Validating Error login",
  { tag: "@api" },
  async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    page.route("**/*.{jpg, png, jpeg}", (route) => route.abort());

    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    page.on("request", (request) => console.log(request.url()));
    page.on("response", (response) =>
      console.log(response.url(), response.status()),
    );

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
  },
);
