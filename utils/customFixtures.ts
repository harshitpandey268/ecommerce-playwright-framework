import { test as base } from '@playwright/test';
import { CartPage } from '../page-objects/CartPage';
import { CheckoutPage } from '../page-objects/CheckoutPage';
import { LoginPage } from '../page-objects/LoginPage';
import { Navbar } from '../page-objects/components/Navbar';
import { ProductsPage } from '../page-objects/ProductsPage';

type CustomFixtures = {
  loginPage: LoginPage;
  navbar: Navbar;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  navbar: async ({ page }, use) => {
    await use(new Navbar(page));
  },

  productsPage: async ({ page, navbar }, use) => {
    await use(new ProductsPage(page, navbar));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { expect } from '@playwright/test';