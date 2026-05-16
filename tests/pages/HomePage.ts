import { Page } from '@playwright/test';

export class HomePage {
  private readonly productCards = () => this.page.locator('a[href^="/product/"]');

  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');
    await this.productCards().first().waitFor();
  }

  async sortBy(option: string) {
    const response = this.page.waitForResponse(
      (res) => res.url().includes('/products') && res.status() === 200
    );
    await this.page.locator('[data-test="sort"]').selectOption(option);
    await response;
  }

  async getProductNames(): Promise<string[]> {
    const names = await this.productCards().locator('h5').allTextContents();
    return names.map((name) => name.trim());
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.productCards().evaluateAll((cards) =>
      cards
        .map((card) => card.textContent?.match(/\$[\d.]+/g)?.pop())
        .filter((price): price is string => Boolean(price))
    );
    return priceTexts.map((price) => parseFloat(price.replace('$', '')));
  }

  async clickFirstProduct() {
    await this.productCards().first().click();
  }
}
