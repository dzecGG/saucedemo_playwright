// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Cart Page', () => {
  test('Cart lists items with quantity and price', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // 1. Log in, add Backpack and Bike Light, click cart icon.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Capture descriptions from the inventory page
    const products = [
      { name: 'Sauce Labs Backpack', price: '$29.99' },
      { name: 'Sauce Labs Bike Light', price: '$9.99' },
    ];
    const descriptions: string[] = [];
    for (const product of products) {
      const listItem = page
        .locator('[data-test="inventory-item"]')
        .filter({ hasText: product.name });
      const desc = (await listItem.locator('[data-test="inventory-item-desc"]').innerText()).trim();
      expect(desc).not.toBe('');
      descriptions.push(desc);
    }

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    // expect: URL /cart.html, title 'Your Cart'
    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');

    // expect: Each item shows QTY 1, name, description, price
    const cartItems = page.locator('[data-test="inventory-item"]');
    await expect(cartItems).toHaveCount(2);

    for (let i = 0; i < products.length; i++) {
      const cartItem = cartItems.filter({ hasText: products[i].name });
      await expect(cartItem).toHaveCount(1);
      await expect(cartItem.locator('[data-test="item-quantity"]')).toHaveText('1');
      await expect(cartItem.locator('[data-test="inventory-item-name"]')).toHaveText(products[i].name);
      await expect(cartItem.locator('[data-test="inventory-item-desc"]')).toHaveText(descriptions[i]);
      await expect(cartItem.locator('[data-test="inventory-item-price"]')).toHaveText(products[i].price);
    }
  });
});
