import { test as setup } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LoginPage } from './pages/LoginPage';

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page }) => {
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
  await page.waitForURL('**/account');
  await page.context().storageState({ path: authFile });
});
