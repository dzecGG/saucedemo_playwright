// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Menu', () => {
  test('All Items link', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');

    // 1. From the cart page open the burger menu and click 'All Items'.
    await page.getByRole('button', { name: 'Open Menu' }).click();
    const allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
    await expect(allItemsLink).toBeVisible();
    await allItemsLink.click();

    // expect: Navigates to /inventory.html
    await expect(page).toHaveURL(/\/inventory\.html/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });
});
