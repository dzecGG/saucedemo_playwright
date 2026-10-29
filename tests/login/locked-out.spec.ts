// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('Locked out user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // 1. Enter locked_out_user / secret_sauce and click Login.
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    const error = page.locator('[data-test="error"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(error).toHaveText('Epic sadface: Sorry, this user has been locked out.');

    // 2. Click the Dismiss error (X) button.
    await page.locator('[data-test="error-button"]').click();
    await expect(error).toBeHidden();
  });
});
