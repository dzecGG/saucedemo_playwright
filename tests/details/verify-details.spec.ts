// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Product Details Page', () => {
  test('Verify product details', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // 1. Log in and click the 'Sauce Labs Backpack' name.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Capture values from the inventory list before clicking
    const item = page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: 'Sauce Labs Backpack' });
    const listName = (await item.locator('[data-test="inventory-item-name"]').innerText()).trim();
    const listDesc = (await item.locator('[data-test="inventory-item-desc"]').innerText()).trim();
    const listPrice = (await item.locator('[data-test="inventory-item-price"]').innerText()).trim();
    expect(listName).toBe('Sauce Labs Backpack');
    expect(listPrice).toBe('$29.99');

    await page
      .locator('[data-test="inventory-item-name"]')
      .filter({ hasText: 'Sauce Labs Backpack' })
      .click();

    // expect: URL is /inventory-item.html?id=4
    await expect(page).toHaveURL(/\/inventory-item\.html\?id=4$/);
    // The URL updates before the list is replaced; wait for the details view to render
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();

    // expect: Name, description and price match the list; image displayed
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(listName);
    await expect(page.locator('[data-test="inventory-item-desc"]')).toHaveText(listDesc);
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText(listPrice);
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
    await expect(page.locator('[data-test="item-sauce-labs-backpack-img"]')).toBeVisible();
  });
});
