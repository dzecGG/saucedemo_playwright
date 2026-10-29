// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('Both fields empty', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // 1. Click Login with both fields empty.
    await page.locator('[data-test="login-button"]').click();

    // Expect: Error: 'Epic sadface: Username is required'
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toHaveText('Epic sadface: Username is required');
  });
});
