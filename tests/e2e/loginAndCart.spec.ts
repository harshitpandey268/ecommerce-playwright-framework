import { config } from '../../config/env.config';
import { expect, test } from '../../utils/customFixtures';

test.describe('Login and cart functionality', () => {
  test('successfully logs in with valid credentials', async ({
    loginPage,
    page,
  }) => {
    await loginPage.navigate();
    await loginPage.login(config.username, config.password);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('adds an item to the cart', async ({
    loginPage,
    productsPage,
    navbar,
  }) => {
    await loginPage.navigate();
    await loginPage.login(config.username, config.password);

    const initialCount = await navbar.getCartItemCount();

    await productsPage.addItemToCart('Sauce Labs Backpack');

    await expect
      .poll(() => navbar.getCartItemCount())
      .toBe(initialCount + 1);
  });
});