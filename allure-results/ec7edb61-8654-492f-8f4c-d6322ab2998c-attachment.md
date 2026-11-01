# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ScreenshotVisualComparison.spec.js >> Visual
- Location: tests/ScreenshotVisualComparison.spec.js:14:5

# Error details

```
Error: expect(Buffer).toMatchSnapshot(expected) failed

  6967 pixels (ratio 0.01 of all image pixels) are different.

  Snapshot: landing.png

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e3]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - link "Gmail" [ref=e8] [cursor=pointer]:
          - /url: https://mail.google.com/mail/&ogbl
        - link "Tìm kiếm hình ảnh" [ref=e10] [cursor=pointer]:
          - /url: https://www.google.com/imghp?hl=vi&ogbl
          - text: Hình ảnh
      - button "Các ứng dụng của Google" [ref=e13] [cursor=pointer]
      - link "Đăng nhập" [ref=e18] [cursor=pointer]:
        - /url: https://accounts.google.com/ServiceLogin?hl=vi&passive=true&continue=https://www.google.com/&ec=futura_exp_og_so_72776762_e
  - img "Google" [ref=e21]
  - search [ref=e29]:
    - generic [ref=e31]:
      - generic [ref=e33]:
        - combobox "Tìm kiếm" [active] [ref=e40]
        - generic [ref=e42]:
          - button "Công cụ nhập" [ref=e43] [cursor=pointer]
          - button "Tìm kiếm bằng giọng nói" [ref=e47] [cursor=pointer]
          - button "Tìm kiếm bằng hình ảnh" [ref=e50] [cursor=pointer]
      - generic [ref=e54]:
        - button "Tìm trên Google" [ref=e55] [cursor=pointer]
        - button "Xem trang đầu tiên tìm được" [ref=e56] [cursor=pointer]
  - generic [ref=e59]:
    - text: "Google hỗ trợ các ngôn ngữ:"
    - link "English" [ref=e60] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_4zu2c30SR7OKHLFZsfNs5FamF28%3D&hl=en&source=homepage&sa=X&ved=2ahUKEwiWoaiBo-aXAxX2cmwGHZ1QA-IQ2ZgBegQIABAT
    - link "Français" [ref=e61] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_4zu2c30SR7OKHLFZsfNs5FamF28%3D&hl=fr&source=homepage&sa=X&ved=2ahUKEwiWoaiBo-aXAxX2cmwGHZ1QA-IQ2ZgBegQIABAU
    - link "繁體中文" [ref=e62] [cursor=pointer]:
      - /url: https://www.google.com/setprefs?sig=0_4zu2c30SR7OKHLFZsfNs5FamF28%3D&hl=zh-TW&source=homepage&sa=X&ved=2ahUKEwiWoaiBo-aXAxX2cmwGHZ1QA-IQ2ZgBegQIABAV
  - contentinfo [ref=e64]:
    - generic [ref=e65]: Việt Nam
    - generic [ref=e66]:
      - generic [ref=e67]:
        - link "Giới thiệu" [ref=e68] [cursor=pointer]:
          - /url: https://about.google/?utm_source=google-VN&utm_medium=referral&utm_campaign=hp-footer&fg=1
        - link "Quảng cáo" [ref=e69] [cursor=pointer]:
          - /url: https://www.google.com/intl/vi_vn/ads/?subid=ww-ww-et-g-awa-a-g_hpafoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpafooter&fg=1
        - link "Doanh nghiệp" [ref=e70] [cursor=pointer]:
          - /url: https://www.google.com/services/?subid=ww-ww-et-g-awa-a-g_hpbfoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpbfooter&fg=1
        - link "Cách hoạt động của Tìm kiếm" [ref=e71] [cursor=pointer]:
          - /url: https://google.com/search/howsearchworks/?fg=1
      - generic [ref=e72]:
        - link "Quyền riêng tư" [ref=e73] [cursor=pointer]:
          - /url: https://policies.google.com/privacy?hl=vi&fg=1
        - link "Điều khoản" [ref=e74] [cursor=pointer]:
          - /url: https://policies.google.com/terms?hl=vi&fg=1
        - button "Cài đặt" [ref=e78] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("Screenshot & Visual Comparison", async ({ page }) => {
  4  |   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  5  |   await expect(page.locator("#displayed-text")).toBeVisible();
  6  |   await page
  7  |     .locator("#displayed-text")
  8  |     .screenshot({ path: "partialScreenshot.png" });
  9  |   await page.locator("#hide-textbox").click();
  10 |   await page.screenshot({ path: "screenshot.png" });
  11 |   await expect(page.locator("#displayed-text")).toBeHidden();
  12 | });
  13 | 
  14 | test("Visual", async ({ page }) => {
  15 |   await page.goto("https://www.google.com.vn/");
> 16 |   expect(await page.screenshot()).toMatchSnapshot("landing.png");
     |                                   ^ Error: expect(Buffer).toMatchSnapshot(expected) failed
  17 | });
  18 | 
```