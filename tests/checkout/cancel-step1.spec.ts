// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('Cancel from Your Information', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Setup: log in
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Setup: add two items, open cart, click Checkout
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');

    // 1. On Your Information click Cancel.
    await page.locator('[data-test="cancel"]').click();

    // Expect: Returns to /cart.html with items intact
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
    await expect(page).toHaveURL(/\/cart\.html$/);
    const items = page.locator('[data-test="inventory-item"]');
    await expect(items).toHaveCount(2);
    const names = page.locator('[data-test="inventory-item-name"]');
    await expect(names).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
  });
});
