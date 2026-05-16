import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

const sortCases = [
  {
    name: 'A to Z',
    option: 'name,asc',
    assert: async (homePage: HomePage) => {
      await expect
        .poll(async () => {
          const names = await homePage.getProductNames();
          const sorted = [...names].sort((a, b) => a.localeCompare(b));
          return JSON.stringify(names) === JSON.stringify(sorted);
        })
        .toBe(true);
    },
  },
  {
    name: 'price high to low',
    option: 'price,desc',
    assert: async (homePage: HomePage) => {
      await expect
        .poll(async () => {
          const prices = await homePage.getProductPrices();
          return prices.every((price, index) => index === 0 || prices[index - 1] >= price);
        })
        .toBe(true);
    },
  },
];

test.describe('Sort Feature', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  for (const sortCase of sortCases) {
    test(`should sort products ${sortCase.name}`, async ({ page }) => {
      await homePage.sortBy(sortCase.option);
      await expect(page.locator('[data-test="sort"]')).toHaveValue(sortCase.option);
      await sortCase.assert(homePage);
    });
  }
});
