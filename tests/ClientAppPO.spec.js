import { test, expect } from "@playwright/test";
import { customTest, DataSet } from "../fixtures/fixtures";

for (const data of DataSet) {
  customTest.describe(`Place order - ${data.productName}`, () => {
    customTest.use({ testDataForOrder: data });

    customTest(
      `Client App login for ${data.productName}`,
      { tag: "@web" },
      async ({ authenticatedPage }) => {
        const dashboardPage = authenticatedPage.getDashboardPage();
        await dashboardPage.searchProduct(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = authenticatedPage.getCartPage();
        await cartPage.verifyProductIsDisplayed(data.productName);
        await cartPage.doCheckout();

        const orderReviewPage = authenticatedPage.getOrderReviewPage();
        await orderReviewPage.searchCountryAndSelect("ind", " India");

        expect(orderReviewPage.emailId).toHaveText(data.username);

        const orderId = await orderReviewPage.submitAndGetOrderId();
        console.log(orderId);

        await dashboardPage.navigateToOrders();

        const orderHistoryPage = authenticatedPage.getOrderHistoryPage();
        await orderHistoryPage.searchOrderAndSelect(orderId);

        expect(
          orderId.includes(await orderHistoryPage.getOrderId()),
        ).toBeTruthy();
      },
    );
  });
}
