import { Page, expect } from '@playwright/test';

export class CartPage {
  private readonly removeButtons = () =>
    this.page.locator('table tbody tr a.btn-danger');

  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');
    await this.page
      .locator('[data-test="nav-menu"], [data-test="nav-sign-in"]')
      .first()
      .waitFor();

    const cartLink = this.page.locator('[data-test="nav-cart"]');
    if ((await cartLink.count()) > 0) {
      await cartLink.click();
      await this.page.waitForURL('**/checkout**');
    } else {
      await this.page.goto('/checkout');
    }

    await this.page.waitForLoadState('domcontentloaded');
  }

  async removeFirstItem() {
    await this.removeButtons().first().click();
    await expect(this.removeButtons()).toHaveCount(0);
  }

  async clearCart() {
    await this.page.goto('/');
    await this.page
      .locator('[data-test="nav-menu"], [data-test="nav-sign-in"]')
      .first()
      .waitFor();

    const quantity = this.page.locator('[data-test="cart-quantity"]');
    if ((await quantity.count()) === 0) {
      return;
    }

    const count = Number((await quantity.textContent()) ?? '0');
    if (count === 0) {
      return;
    }

    await this.navigate();
    while ((await this.removeButtons().count()) > 0) {
      await this.removeButtons().first().click();
    }
    await expect(this.removeButtons()).toHaveCount(0);
  }

  async isCartEmpty(): Promise<boolean> {
    return (await this.removeButtons().count()) === 0;
  }
}
