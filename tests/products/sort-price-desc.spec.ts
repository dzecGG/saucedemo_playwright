// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test('Sort by Price (high to low)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // 1. Log in and select 'Price (high to low)'.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

    // expect: Prices descending: 49.99, 29.99, 15.99, 15.99, 9.99, 7.99
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText([
      '$49.99',
      '$29.99',
      '$15.99',
      '$15.99',
      '$9.99',
      '$7.99',
    ]);
  });
});
