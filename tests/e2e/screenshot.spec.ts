import { test, expect } from '@playwright/test';

test('Signal EcoGaz card screenshot — light theme', async ({ page }) => {
  await page.goto('/tests/e2e/screenshot.html');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/signal-ecogaz-card.light.png', fullPage: true });
});

test('Signal EcoGaz card screenshot — dark theme', async ({ page }) => {
  await page.goto('/tests/e2e/screenshot.html');
  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/signal-ecogaz-card.dark.png', fullPage: true });
});
