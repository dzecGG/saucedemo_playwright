// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('Successful login with standard_user', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com/. Enter username standard_user and password secret_sauce, click Login.
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // expect: URL is /inventory.html
    await expect(page).toHaveURL(/\/inventory\.html$/);

    // expect: Products page shows 'Products' title and 6 items
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  });
});
