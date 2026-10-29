// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('Overview totals', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);

    // 1. Add Backpack ($29.99) and Bike Light ($9.99), checkout, enter valid info (e.g. John / Doe / 12345), Continue.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    // expect: Overview lists both items
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    const items = page.locator('[data-test="inventory-item"]');
    await expect(items).toHaveCount(2);
    await expect(items.nth(0).locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
    await expect(items.nth(0).locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
    await expect(items.nth(1).locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Bike Light');
    await expect(items.nth(1).locator('[data-test="inventory-item-price"]')).toHaveText('$9.99');

    // expect: Item total, tax and total
    await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $39.98');
    await expect(page.locator('[data-test="tax-label"]')).toHaveText('Tax: $3.20');
    await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $43.18');

    // expect: Payment info and shipping info shown
    await expect(page.locator('[data-test="payment-info-label"]')).toHaveText('Payment Information:');
    await expect(page.locator('[data-test="payment-info-value"]')).toBeVisible();
    await expect(page.locator('[data-test="payment-info-value"]')).not.toBeEmpty();
    await expect(page.locator('[data-test="shipping-info-label"]')).toHaveText('Shipping Information:');
    await expect(page.locator('[data-test="shipping-info-value"]')).toBeVisible();
    await expect(page.locator('[data-test="shipping-info-value"]')).not.toBeEmpty();
  });
});
