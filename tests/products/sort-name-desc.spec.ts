// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test('Sort by Name (Z to A)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // 1. Log in and select 'Name (Z to A)'.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);

    await page.locator('[data-test="product-sort-container"]').selectOption('za');

    // expect: exact reverse alphabetical order
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText([
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Onesie',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Bike Light',
      'Sauce Labs Backpack',
    ]);
  });
});
