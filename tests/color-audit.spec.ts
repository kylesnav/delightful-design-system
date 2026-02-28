import { test } from '@playwright/test';
import path from 'path';

test('screenshot color audit - light mode', async ({ page }) => {
  const filePath = path.resolve(__dirname, '..', 'color-audit.html');
  await page.goto(`file://${filePath}`);
  await page.waitForLoadState('networkidle');

  await page.screenshot({
    path: path.resolve(__dirname, '..', 'test-results', 'screenshots', 'color-audit-light.png'),
    fullPage: true,
  });
});

test('screenshot color audit - dark mode', async ({ page }) => {
  const filePath = path.resolve(__dirname, '..', 'color-audit.html');
  await page.goto(`file://${filePath}`);
  await page.waitForLoadState('networkidle');

  // Click the dark mode toggle
  await page.click('#theme-toggle');

  // Small wait for any transition
  await page.waitForTimeout(300);

  await page.screenshot({
    path: path.resolve(__dirname, '..', 'test-results', 'screenshots', 'color-audit-dark.png'),
    fullPage: true,
  });
});
