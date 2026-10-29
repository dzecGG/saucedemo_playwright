// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Product Details Page', () => {
  test('Back to products', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 1. Open a product (use Sauce Labs Backpack), add to cart, click 'Back to products'.
    await page.locator('[data-test="inventory-item-name"]', { hasText: 'Sauce Labs Backpack' }).click();
    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);
    await page.locator('[data-test="add-to-cart"]').click();
    await page.locator('[data-test="back-to-products"]').click();

    // Expect: returns to /inventory.html
    await expect(page).toHaveURL(/\/inventory\.html/);

    // Expect: item still shows 'Remove' and badge 1
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText('Remove');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
