import { expect, test } from "@playwright/test";
import { ExcelUtil } from "../utils/ExcelUtil";

test("Upload download excel validation", async ({ page }) => {
  const filePath = "download.xlsx";
  const textSearch = "Mango";
  const updateValue = "350";
  const excelUtil = new ExcelUtil();

  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html",
  );

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Download" }).click(),
  ]);

  expect(download.suggestedFilename()).toContain(filePath);
  await download.saveAs(filePath);

  excelUtil.writeData(
    textSearch,
    updateValue,
    { rowChange: 0, colChange: 2 },
    filePath,
  );

  await page.getByRole("button", { name: "Choose File" }).click();
  await page
    .getByRole("button", { name: "Choose File" })
    .setInputFiles(filePath);

  const textLocator = page.getByText(textSearch);
  const desiredRow = page.getByRole("row").filter({ has: textLocator });

  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(
    updateValue,
  );
});
