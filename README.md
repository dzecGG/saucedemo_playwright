# saucedemo_playwright

[![Playwright Tests](https://github.com/dzecGG/saucedemo_playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/dzecGG/saucedemo_playwright/actions/workflows/playwright.yml)
[![Tested with Playwright](https://img.shields.io/badge/tested%20with-Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)

End-to-end tests for [Swag Labs](https://www.saucedemo.com/) (saucedemo.com), written with [Playwright Test](https://playwright.dev/) in TypeScript.

The tests were generated from the test plan in [`specs/saucedemo.md`](specs/saucedemo.md) using the Playwright test agents (planner, generator, healer) in `.claude/agents/`.

## Requirements

- Node.js (LTS)
- Playwright browsers

```sh
npm install
npx playwright install
```

## Running the tests

```sh
# All tests, all browsers (chromium, firefox, webkit)
npx playwright test

# One browser
npx playwright test --project=chromium

# One area
npx playwright test tests/checkout

# Open the HTML report from the last run
npx playwright show-report
```

## Project layout

```
specs/saucedemo.md      Test plan (scenarios, steps, expected results)
tests/seed.spec.ts      Seed test used by the generator agent (opens the login page)
tests/login/            1. Login page
tests/products/         2. Products page (sorting, add/remove)
tests/details/          3. Product details page
tests/cart/             4. Cart page
tests/checkout/         5. Checkout flow (validation, totals, finish, cancel)
tests/menu/             6. Burger menu (All Items, Reset App State, Logout, protected pages)
tests/example.spec.ts   Playwright's default example test (not part of the suite)
playwright.config.ts    Playwright config (chromium, firefox, webkit projects)
.github/workflows/      CI: runs `npx playwright test` on push/PR to main
```

Each spec file maps to one scenario in the plan and starts with a header comment pointing to the plan and seed:

```ts
// spec: specs/saucedemo.md
// seed: tests/seed.spec.ts
```

## Test data

- User: `standard_user` / `secret_sauce` (other users such as `locked_out_user` are used in the login tests)
- Locators use the site's `data-test` attributes, e.g. `[data-test="username"]`, `[data-test="shopping-cart-badge"]`.

## Known site behavior

Some tests assert behavior of the site that may look like a bug:

- **Empty-cart checkout** (`tests/cart/empty-checkout.spec.ts`): the site lets you proceed to checkout with an empty cart.
- **Reset App State** (`tests/menu/reset.spec.ts`): the cart badge clears immediately, but product buttons keep reading "Remove" until the page is reloaded.
- **Default sort** (`tests/products/sort-name-asc.spec.ts`): products are already sorted A to Z after login, so this test passes even if the sort control does nothing.
- **SPA navigation**: the URL can change before the new view renders, so tests wait for an element unique to the new page (usually the `[data-test="title"]` text) before asserting.

## Playwright test agents

The agents in `.claude/agents/` use the `playwright-test` MCP server configured in `.mcp.json`:

- **playwright-test-planner**: explores the app and writes a test plan to `specs/`.
- **playwright-test-generator**: turns one plan scenario into a spec file, using the seed test.
- **playwright-test-healer**: runs failing tests, debugs them and fixes them.

`.mcp.json` starts the server with `cmd /c npx playwright run-test-mcp-server`, which is Windows-specific. On macOS/Linux use `"command": "npx"` with `"args": ["playwright", "run-test-mcp-server"]`.
