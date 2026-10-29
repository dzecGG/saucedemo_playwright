// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Menu', () => {
  test('Protected pages inaccessible after logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Setup: log in, open menu, logout
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await page.getByRole('button', { name: 'Open Menu' }).click();
    const logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    await expect(logoutLink).toBeVisible();
    await logoutLink.click();
    const loginButton = page.locator('[data-test="login-button"]');
    await expect(loginButton).toBeVisible();

    // 1. After logout navigate directly to /inventory.html and /cart.html
    const error = page.locator('[data-test="error"]');

    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(loginButton).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(error).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");

    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(loginButton).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(error).toHaveText("Epic sadface: You can only access '/cart.html' when you are logged in.");
  });
});
