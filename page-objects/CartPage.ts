import { expect, Locator, Page } from '@playwright/test';
import { Navbar } from './components/Navbar';

export class CartPage {
  readonly page: Page;
  readonly navbar: Navbar;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new Navbar(page);
    this.checkoutButton = page.getByTestId('checkout');
    this.cartItems = page.getByTestId('inventory-item');
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async removeItemByName(itemName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async verifyItemPresent(itemName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: itemName });
    await expect(item).toBeVisible();
  }
}