// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test('Add and remove items from product list', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // 1. Log in. Click 'Add to cart' on Backpack and Bike Light.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory\.html/);

    const badge = page.locator('[data-test="shopping-cart-badge"]');
    const backpackAdd = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    const bikeLightAdd = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    const backpackRemove = page.locator('[data-test="remove-sauce-labs-backpack"]');
    const bikeLightRemove = page.locator('[data-test="remove-sauce-labs-bike-light"]');

    await expect(badge).toHaveCount(0);
    await backpackAdd.click();
    await bikeLightAdd.click();

    // expect: both buttons change to 'Remove', badge shows 2
    await expect(backpackRemove).toHaveText('Remove');
    await expect(bikeLightRemove).toHaveText('Remove');
    await expect(badge).toHaveText('2');

    // 2. Click 'Remove' on Backpack.
    await backpackRemove.click();

    // expect: button reverts to 'Add to cart', badge shows 1
    await expect(backpackAdd).toHaveText('Add to cart');
    await expect(badge).toHaveText('1');

    // 3. Remove Bike Light.
    await bikeLightRemove.click();

    // expect: badge disappears
    await expect(bikeLightAdd).toHaveText('Add to cart');
    await expect(badge).toHaveCount(0);
  });
});
