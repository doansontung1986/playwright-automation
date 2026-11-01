import { test, request } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";
import { POManager } from "../pageobjects/POManager";
import DataSet from "../data/placeOrderTestData.json";

const customTest = test.extend({
  // Option fixture: mặc định là dòng đầu của JSON, có thể override bằng test.use()
  testDataForOrder: [DataSet[0], { option: true }],

  // Fixture phụ thuộc vào testDataForOrder
  poManager: async ({ page }, use) => {
    await use(new POManager(page));
  },

  authenticatedPage: async ({ poManager, testDataForOrder }, use) => {
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(
      testDataForOrder.username,
      testDataForOrder.password,
    );

    await use(poManager);
  },

  createOrder: async ({ testDataForOrder }, use) => {
    const apiContext = await request.newContext();

    const loginPayload = {
      userEmail: testDataForOrder.username,
      userPassword: testDataForOrder.password,
    };

    const orderPayload = {
      orders: [
        {
          country: "India",
          productOrderedId: "6960eac0c941646b7a8b3e68",
        },
      ],
    };

    const apiUtils = new APIUtils(apiContext, loginPayload);
    await use(await apiUtils.createOrder(orderPayload));

    // teardown
    await apiContext.dispose();
  },
});

module.exports = { customTest, DataSet };
