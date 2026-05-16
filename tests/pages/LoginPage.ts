import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/auth/login');
    await this.page.locator('[data-test="email"]').waitFor();
  }

  async login(email: string, password: string) {
    await this.page.locator('[data-test="email"]').fill(email);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator('[data-test="login-submit"]').click();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.page.locator('[data-test="login-error"]').textContent()) ?? '';
  }
}
