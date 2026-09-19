import { expect, Locator, Page } from '@playwright/test';

export class Navbar {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    // this.cartLink = page.getByRole('link', { name: /shopping cart/i });
    // Inside Navbar.ts constructor
    this.cartLink = page.getByTestId('shopping-cart-link'); 
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async getCartItemCount(): Promise<number> {
    if (!(await this.cartBadge.isVisible())) {
      return 0;
    }

    const count = await this.cartBadge.textContent();
    return Number(count?.trim() ?? 0);
  }
}