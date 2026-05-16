import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async addToCart() {
    await this.page.locator('[data-test="add-to-cart"]').click();
    await this.page.locator('[data-test="cart-quantity"]').waitFor();
  }

  async goToCart() {
    await this.page.locator('[data-test="nav-cart"]').click();
  }
}
