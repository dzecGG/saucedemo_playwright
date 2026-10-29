// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cart Page', () => {
  test('Checkout with empty cart (edge case)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 1. With no items, open cart and click Checkout.
    await page.locator('[data-test="shopping-cart-link"]').click();
    const title = page.locator('[data-test="title"]');
    await expect(title).toHaveText('Your Cart');
    await expect(page).toHaveURL(/\/cart\.html/);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(0);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);

    await page.locator('[data-test="checkout"]').click();

    // Known site behavior (not a test bug): saucedemo allows proceeding to checkout with an empty cart.
    await expect(title).toHaveText('Checkout: Your Information');
    await expect(page).toHaveURL(/\/checkout-step-one\.html/);
  });
});
