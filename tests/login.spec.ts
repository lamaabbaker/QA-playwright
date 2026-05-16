import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

const invalidLoginCases = [
  {
    name: 'wrong password',
    email: process.env.USER_EMAIL!,
    password: 'WrongPassword!@99',
    assert: async (loginPage: LoginPage) => {
      const error = await loginPage.getErrorMessage();
      expect(error).toContain('Invalid');
    },
  },
  {
    name: 'empty credentials',
    email: '',
    password: '',
    assert: async (_loginPage: LoginPage, page: import('@playwright/test').Page) => {
      await expect(page).toHaveURL(/\/auth\/login/);
    },
  },
];

test.describe('Login Feature', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test.afterEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await page.waitForURL('**/account');
    await expect(page).toHaveURL(/\/account/);
  });

  for (const loginCase of invalidLoginCases) {
    test(`should fail with ${loginCase.name}`, async ({ page }) => {
      await loginPage.login(loginCase.email, loginCase.password);
      await loginCase.assert(loginPage, page);
    });
  }
});
