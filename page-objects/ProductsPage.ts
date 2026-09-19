import { Locator, Page } from '@playwright/test';
import { Navbar } from './components/Navbar';

export class ProductsPage {
  readonly page: Page;
  readonly navbar: Navbar;
  readonly productItems: Locator;
  readonly addToCartButtons: Locator;
  readonly itemTitles: Locator;

  constructor(page: Page, navbar: Navbar = new Navbar(page)) {
    this.page = page;
    this.navbar = navbar;
    this.productItems = page.getByTestId('inventory-item');
    this.addToCartButtons = page.getByRole('button', {
      name: /add to cart/i,
    });
    this.itemTitles = page.getByTestId('inventory-item-name');
  }

  async addItemToCart(itemName: string): Promise<void> {
    const item = this.productItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: /add to cart/i }).click();
  }

  async navigateToDetailPage(itemName: string): Promise<void> {
    const item = this.productItems.filter({ hasText: itemName });
    await item.getByTestId('inventory-item-name').click();
  }
}