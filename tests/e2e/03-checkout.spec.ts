import { config } from '../../config/env.config';
import { expect, test } from '../../utils/customFixtures';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(config.users.standard, config.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('completes the end-to-end checkout flow', async ({
    productsPage,
    navbar,
    cartPage,
    checkoutPage,
  }) => {
    await productsPage.addItemToCart('Sauce Labs Backpack');

    await navbar.openCart();
    await cartPage.verifyItemPresent('Sauce Labs Backpack');
    await cartPage.proceedToCheckout();

    await checkoutPage.fillInformation('Test', 'Customer', '12345');
    await checkoutPage.completeOrder();
    await checkoutPage.verifyOrderSuccess();
  });
});