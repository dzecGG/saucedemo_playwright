// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cart Page', () => {
  test('Continue Shopping', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 1. Add an item (Sauce Labs Backpack), open cart, click 'Continue Shopping'.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
    await page.locator('[data-test="continue-shopping"]').click();

    // expect: Returns to /inventory.html with item still in cart
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText('Remove');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
