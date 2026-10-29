// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test('Sort by Price (low to high)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // 1. Log in and select 'Price (low to high)'.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);

    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    // expect: Prices ascending
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText([
      '$7.99',
      '$9.99',
      '$15.99',
      '$15.99',
      '$29.99',
      '$49.99',
    ]);
  });
});
