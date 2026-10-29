// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cart Page', () => {
  test('Checkout button', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // 1. Add an item (Sauce Labs Backpack), open cart, click 'Checkout'.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    const title = page.locator('[data-test="title"]');
    await expect(title).toHaveText('Your Cart');

    await page.locator('[data-test="checkout"]').click();

    // expect: Navigates to /checkout-step-one.html 'Checkout: Your Information'
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await expect(title).toHaveText('Checkout: Your Information');
  });
});
