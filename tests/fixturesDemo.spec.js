import { expect } from "@playwright/test";
import { customTest } from "../fixtures/fixtures";

customTest(
  "Fixtures demo",
  async ({ authenticatedPage, createOrder, testDataForOrder }) => {
    const loginPage = authenticatedPage.getLoginPage();
    await loginPage.goTo();

    const dashboardPage = authenticatedPage.getDashboardPage();
    await dashboardPage.navigateToOrders();

    const orderHistoryPage = authenticatedPage.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(createOrder.orderId);

    expect(
      createOrder.orderId.includes(await orderHistoryPage.getOrderId()),
    ).toBeTruthy();

    console.log(testDataForOrder.productName);
  },
);
