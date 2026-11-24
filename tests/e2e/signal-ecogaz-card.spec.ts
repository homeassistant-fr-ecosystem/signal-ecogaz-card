import { test, expect } from '@playwright/test';

test('Signal EcoGaz card bundle loads and registers the custom element', async ({ page }) => {
  // Listen for any page errors (failed script load, runtime exceptions, etc.)
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/tests/e2e/index.html');

  // Screenshot de la carte chargée
  await page.screenshot({ path: 'screenshots/signal-ecogaz-card.png', fullPage: true });

  // The custom element should be defined by the bundle
  const result = page.locator('#result');
  await expect(result).toHaveText('custom element defined: OK');

  // No script/runtime errors should have occurred
  expect(errors).toHaveLength(0);
});
