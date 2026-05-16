import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';

test.describe('Remove from Cart Feature', () => {
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await cartPage.clearCart();
    await homePage.navigate();
    await homePage.clickFirstProduct();
    await productPage.addToCart();
  });

  test('should remove a product from cart', async () => {
    await cartPage.navigate();
    await cartPage.removeFirstItem();

    expect(await cartPage.isCartEmpty()).toBe(true);
  });
});
