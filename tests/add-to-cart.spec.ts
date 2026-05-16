import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';

test.describe('Add to Cart Feature', () => {
  let homePage: HomePage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await cartPage.clearCart();
    await homePage.navigate();
  });

  test('should add a product to cart', async ({ page }) => {
    await homePage.clickFirstProduct();
    await productPage.addToCart();

    await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');
  });
});
