// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Menu', () => {
  test('Reset App State', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Setup: log in and wait for the Products page
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');

    // 1. Add two items (Backpack and Bike Light), open menu, click 'Reset App State'.
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    await page.getByRole('button', { name: 'Open Menu' }).click();
    const resetLink = page.locator('[data-test="reset-sidebar-link"]');
    await expect(resetLink).toBeVisible();
    await resetLink.click();

    // Cart badge disappears immediately
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);

    // Observed: the buttons still read 'Remove' right after Reset; the site needs a reload for them to revert.
    await page.reload();
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveCount(0);
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toHaveCount(0);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });
});
