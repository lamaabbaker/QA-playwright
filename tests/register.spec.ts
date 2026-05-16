import { test, expect } from '@playwright/test';
import { RegisterPage } from './pages/RegisterPage';

function buildRegistrationData(overrides: Partial<Parameters<RegisterPage['register']>[0]> = {}) {
  return {
    firstName: process.env.USER_FIRST_NAME!,
    lastName: process.env.USER_LAST_NAME!,
    dob: process.env.USER_DOB!,
    street: process.env.USER_STREET!,
    postalCode: process.env.USER_POSTAL_CODE!,
    houseNumber: process.env.USER_HOUSE_NUMBER!,
    city: process.env.USER_CITY!,
    state: process.env.USER_STATE!,
    country: process.env.USER_COUNTRY!,
    phone: process.env.USER_PHONE!,
    email: `testuser_${Date.now()}@example.com`,
    password: `Zx9!kL${Date.now()}Qm2`,
    ...overrides,
  };
}

test.describe('Register Feature', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigate();
  });

  test('should register successfully with valid data', async ({ page }) => {
    await registerPage.register(buildRegistrationData());
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('should fail registration with missing fields', async ({ page }) => {
    await registerPage.register(
      buildRegistrationData({
        firstName: '',
        lastName: '',
        dob: '',
        street: '',
        postalCode: '',
        houseNumber: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        email: '',
        password: '',
      })
    );

    await expect(page).toHaveURL(/\/auth\/register/);
  });

  test('should fail with already registered email', async ({ page }) => {
    await registerPage.register(
      buildRegistrationData({
        email: process.env.USER_EMAIL!,
      })
    );

    await expect(page.locator('.alert-danger')).toBeVisible();
  });
});
