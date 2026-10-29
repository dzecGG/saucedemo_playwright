// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('Empty username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // 1. Leave username empty, enter password secret_sauce, click Login.
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // expect: Error: 'Epic sadface: Username is required'
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
  });
});
