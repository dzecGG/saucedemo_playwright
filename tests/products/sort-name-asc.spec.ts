// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test('Sort by Name (A to Z)', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // 1. Log in as standard_user. Select 'Name (A to Z)' in the sort dropdown.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);

    await page.locator('[data-test="product-sort-container"]').selectOption('az');

    // expect: Items ordered alphabetically A to Z
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
    ]);
  });
});
