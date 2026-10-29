// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Product Details Page', () => {
  test('Add and remove from details page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    const addButton = page.locator('[data-test="add-to-cart"]');
    const removeButton = page.locator('[data-test="remove"]');
    const badge = page.locator('[data-test="shopping-cart-badge"]');

    // 1. Open Backpack details, click 'Add to cart'.
    await page.locator('[data-test="inventory-item-name"]:has-text("Sauce Labs Backpack")').click();
    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);
    await expect(addButton).toHaveText('Add to cart');
    await addButton.click();
    await expect(removeButton).toHaveText('Remove');
    await expect(badge).toHaveText('1');

    // 2. Click 'Remove'.
    await removeButton.click();
    await expect(addButton).toHaveText('Add to cart');
    await expect(badge).toHaveCount(0);
  });
});
