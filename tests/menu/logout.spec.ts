// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Menu', () => {
  test('Logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // 1. Log in, open menu, click 'Logout'.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');

    await page.getByRole('button', { name: 'Open Menu' }).click();
    const logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    await expect(logoutLink).toBeVisible();
    await logoutLink.click();

    // Expect: returns to login page with empty fields
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    await expect(page.locator('[data-test="username"]')).toHaveValue('');
    await expect(page.locator('[data-test="password"]')).toHaveValue('');
  });
});
