import { config } from '../../config/env.config';
import { expect, test } from '../../utils/customFixtures';

test.describe('Inventory', () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.navigate();
    await loginPage.login(config.users.standard, config.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('sorts products by price from low to high', async ({ page }) => {
    await page.getByTestId('product-sort-container').selectOption('lohi');

    const prices = await page
      .getByTestId('inventory-item-price')
      .allTextContents();

    const numericPrices = prices.map((price) =>
      Number(price.replace('$', '').trim()),
    );

    expect(numericPrices).toEqual([...numericPrices].sort((a, b) => a - b));
  });

  test('adds multiple items and updates the cart badge', async ({
    productsPage,
    navbar,
  }) => {
    await productsPage.addItemToCart('Sauce Labs Backpack');
    await productsPage.addItemToCart('Sauce Labs Bike Light');

    await expect.poll(() => navbar.getCartItemCount()).toBe(2);
  });

  test('removes an item from the products page', async ({
    productsPage,
    navbar,
  }) => {
    await productsPage.addItemToCart('Sauce Labs Backpack');
    await productsPage.addItemToCart('Sauce Labs Bike Light');

    await expect.poll(() => navbar.getCartItemCount()).toBe(2);

    const item = productsPage.productItems.filter({
      hasText: 'Sauce Labs Backpack',
    });

    await item.getByRole('button', { name: /remove/i }).click();

    await expect.poll(() => navbar.getCartItemCount()).toBe(1);
  });
});