# SauceDemo Test Plan

## Application Overview

Test plan for https://www.saucedemo.com/ (Swag Labs). Seed file: tests/seed.spec.ts (opens the login page). All scenarios assume a fresh browser state (empty cart, logged out). Credentials: standard_user / secret_sauce. Catalog prices: Sauce Labs Backpack $29.99, Sauce Labs Bike Light $9.99, Sauce Labs Bolt T-Shirt $15.99, Sauce Labs Fleece Jacket $49.99, Sauce Labs Onesie $7.99, Test.allTheThings() T-Shirt (Red) $15.99. Tax is 8%.

## Test Scenarios

### 1. Login Page

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with standard_user

**File:** `tests/login/successful-login.spec.ts`

**Steps:**
  1. Navigate to https://www.saucedemo.com/. Enter username standard_user and password secret_sauce, click Login.
    - expect: URL is /inventory.html
    - expect: Products page shows 'Products' title and 6 items

#### 1.2. Locked out user

**File:** `tests/login/locked-out.spec.ts`

**Steps:**
  1. Enter locked_out_user / secret_sauce and click Login.
    - expect: User stays on login page
    - expect: Error: 'Epic sadface: Sorry, this user has been locked out.'
  2. Click the Dismiss error (X) button.
    - expect: Error message disappears

#### 1.3. Wrong password

**File:** `tests/login/wrong-password.spec.ts`

**Steps:**
  1. Enter standard_user / wrong_password and click Login.
    - expect: Error: 'Epic sadface: Username and password do not match any user in this service'
    - expect: Remains on login page

#### 1.4. Empty username

**File:** `tests/login/empty-username.spec.ts`

**Steps:**
  1. Leave username empty, enter password secret_sauce, click Login.
    - expect: Error: 'Epic sadface: Username is required'

#### 1.5. Empty password

**File:** `tests/login/empty-password.spec.ts`

**Steps:**
  1. Enter standard_user, leave password empty, click Login.
    - expect: Error: 'Epic sadface: Password is required'

#### 1.6. Both fields empty

**File:** `tests/login/both-empty.spec.ts`

**Steps:**
  1. Click Login with both fields empty.
    - expect: Error: 'Epic sadface: Username is required'

### 2. Products Page

**Seed:** `tests/seed.spec.ts`

#### 2.1. Sort by Name (A to Z)

**File:** `tests/products/sort-name-asc.spec.ts`

**Steps:**
  1. Log in as standard_user. Select 'Name (A to Z)' in the sort dropdown.
    - expect: Items ordered Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Test.allTheThings() T-Shirt (Red)

#### 2.2. Sort by Name (Z to A)

**File:** `tests/products/sort-name-desc.spec.ts`

**Steps:**
  1. Log in and select 'Name (Z to A)'.
    - expect: Items in exact reverse alphabetical order, Test.allTheThings() first, Backpack last

#### 2.3. Sort by Price (low to high)

**File:** `tests/products/sort-price-asc.spec.ts`

**Steps:**
  1. Log in and select 'Price (low to high)'.
    - expect: Prices ascending: 7.99, 9.99, 15.99, 15.99, 29.99, 49.99

#### 2.4. Sort by Price (high to low)

**File:** `tests/products/sort-price-desc.spec.ts`

**Steps:**
  1. Log in and select 'Price (high to low)'.
    - expect: Prices descending: 49.99, 29.99, 15.99, 15.99, 9.99, 7.99

#### 2.5. Add and remove items from product list

**File:** `tests/products/add-remove.spec.ts`

**Steps:**
  1. Log in. Click 'Add to cart' on Backpack and Bike Light.
    - expect: Both buttons change to 'Remove'
    - expect: Cart badge shows 2
  2. Click 'Remove' on Backpack.
    - expect: Button reverts to 'Add to cart'
    - expect: Badge shows 1
  3. Remove Bike Light.
    - expect: Badge disappears

### 3. Product Details Page

**Seed:** `tests/seed.spec.ts`

#### 3.1. Verify product details

**File:** `tests/details/verify-details.spec.ts`

**Steps:**
  1. Log in and click the 'Sauce Labs Backpack' name.
    - expect: URL is /inventory-item.html?id=4
    - expect: Name, description and price $29.99 match the list; image displayed

#### 3.2. Add and remove from details page

**File:** `tests/details/add-remove.spec.ts`

**Steps:**
  1. Open Backpack details, click 'Add to cart'.
    - expect: Button becomes 'Remove'
    - expect: Badge shows 1
  2. Click 'Remove'.
    - expect: Button returns to 'Add to cart'
    - expect: Badge disappears

#### 3.3. Back to products

**File:** `tests/details/back.spec.ts`

**Steps:**
  1. Open a product, add to cart, click 'Back to products'.
    - expect: Returns to /inventory.html
    - expect: Item still shows 'Remove' and badge 1

### 4. Cart Page

**Seed:** `tests/seed.spec.ts`

#### 4.1. Cart lists items with quantity and price

**File:** `tests/cart/list-items.spec.ts`

**Steps:**
  1. Log in, add Backpack and Bike Light, click cart icon.
    - expect: URL /cart.html, title 'Your Cart'
    - expect: Each item shows QTY 1, name, description, price ($29.99, $9.99)

#### 4.2. Remove items from cart

**File:** `tests/cart/remove.spec.ts`

**Steps:**
  1. With two items in cart, click Remove on one, then the other.
    - expect: Items disappear, badge decrements then vanishes
    - expect: Cart empty

#### 4.3. Continue Shopping

**File:** `tests/cart/continue-shopping.spec.ts`

**Steps:**
  1. Add an item, open cart, click 'Continue Shopping'.
    - expect: Returns to /inventory.html with item still in cart

#### 4.4. Checkout button

**File:** `tests/cart/checkout.spec.ts`

**Steps:**
  1. Add an item, open cart, click 'Checkout'.
    - expect: Navigates to /checkout-step-one.html 'Checkout: Your Information'

#### 4.5. Checkout with empty cart (edge case)

**File:** `tests/cart/empty-checkout.spec.ts`

**Steps:**
  1. With no items, open cart and click Checkout.
    - expect: Observe and document behavior (site is known to allow proceeding with empty cart)

### 5. Checkout Flow

**Seed:** `tests/seed.spec.ts`

#### 5.1. Missing first name

**File:** `tests/checkout/missing-first-name.spec.ts`

**Steps:**
  1. Add item, go to checkout, leave First Name empty, fill Last Name and Zip, click Continue.
    - expect: Error: 'Error: First Name is required'

#### 5.2. Missing last name

**File:** `tests/checkout/missing-last-name.spec.ts`

**Steps:**
  1. Fill First Name and Zip only, click Continue.
    - expect: Error: 'Error: Last Name is required'

#### 5.3. Missing postal code

**File:** `tests/checkout/missing-postal.spec.ts`

**Steps:**
  1. Fill First and Last Name only, click Continue.
    - expect: Error: 'Error: Postal Code is required'

#### 5.4. Overview totals

**File:** `tests/checkout/overview-totals.spec.ts`

**Steps:**
  1. Add Backpack ($29.99) and Bike Light ($9.99), checkout, enter valid info, Continue.
    - expect: Overview lists both items
    - expect: Item total: $39.98
    - expect: Tax: $3.20
    - expect: Total: $43.18
    - expect: Payment info and shipping info shown

#### 5.5. Finish order and Back Home

**File:** `tests/checkout/finish.spec.ts`

**Steps:**
  1. Complete overview and click Finish.
    - expect: URL /checkout-complete.html
    - expect: 'Thank you for your order!' displayed
    - expect: Cart badge cleared
  2. Click 'Back Home'.
    - expect: Returns to inventory with empty cart

#### 5.6. Cancel from Your Information

**File:** `tests/checkout/cancel-step1.spec.ts`

**Steps:**
  1. On Your Information click Cancel.
    - expect: Returns to /cart.html with items intact

#### 5.7. Cancel from Overview

**File:** `tests/checkout/cancel-step2.spec.ts`

**Steps:**
  1. On Overview click Cancel.
    - expect: Returns to /inventory.html; cart items retained

### 6. Menu

**Seed:** `tests/seed.spec.ts`

#### 6.1. All Items link

**File:** `tests/menu/all-items.spec.ts`

**Steps:**
  1. From the cart page open the burger menu and click 'All Items'.
    - expect: Navigates to /inventory.html

#### 6.2. Reset App State

**File:** `tests/menu/reset.spec.ts`

**Steps:**
  1. Add two items, open menu, click 'Reset App State'.
    - expect: Cart badge disappears
    - expect: All buttons revert to 'Add to cart' (may require page refresh in some builds; document)

#### 6.3. Logout

**File:** `tests/menu/logout.spec.ts`

**Steps:**
  1. Log in, open menu, click 'Logout'.
    - expect: Returns to login page with empty fields

#### 6.4. Protected pages inaccessible after logout

**File:** `tests/menu/protected.spec.ts`

**Steps:**
  1. After logout navigate directly to /inventory.html and /cart.html.
    - expect: Redirected to login page with error: "Epic sadface: You can only access '/inventory.html' when you are logged in." (path varies per page)
