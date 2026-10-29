// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('Empty password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // 1. Enter standard_user, leave password empty, click Login.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();

    // expect: Error: 'Epic sadface: Password is required'
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toHaveText('Epic sadface: Password is required');
  });
});
