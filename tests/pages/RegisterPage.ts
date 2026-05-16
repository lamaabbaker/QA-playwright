import { Page } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/auth/register');
    await this.page.locator('[data-test="register-form"]').waitFor();
  }

  async register(data: {
    firstName: string;
    lastName: string;
    dob: string;
    street: string;
    postalCode: string;
    houseNumber: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
    password: string;
  }) {
    await this.page.locator('[data-test="first-name"]').fill(data.firstName);
    await this.page.locator('[data-test="last-name"]').fill(data.lastName);
    await this.page.locator('[data-test="dob"]').fill(data.dob);
    if (data.country) {
      await this.page.locator('[data-test="country"]').selectOption(data.country);
    }
    await this.page.locator('[data-test="postal_code"]').fill(data.postalCode);
    await this.page.locator('[data-test="house_number"]').fill(data.houseNumber);
    await this.page.locator('[data-test="street"]').fill(data.street);
    await this.page.locator('[data-test="city"]').fill(data.city);
    await this.page.locator('[data-test="state"]').fill(data.state);
    await this.page.locator('[data-test="phone"]').fill(data.phone);
    await this.page.locator('[data-test="email"]').fill(data.email);
    await this.page.locator('[data-test="password"]').fill(data.password);
    await this.page.locator('[data-test="register-submit"]').click();
  }
}
