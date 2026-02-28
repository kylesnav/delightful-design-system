import { test } from '@playwright/test';
import path from 'path';

const screenshotDir = path.resolve(__dirname, '..', 'test-results', 'screenshots');

const htmlFiles = [
  { name: 'design-system', file: 'delightful-design-system.html' },
  { name: 'motion', file: 'delightful-motion.html' },
  { name: 'animation', file: 'delightful-animation.html' },
];

for (const { name, file } of htmlFiles) {
  const filePath = path.resolve(__dirname, '..', file);
  const fileUrl = `file://${filePath}`;

  test.describe(`Visual regression: ${name}`, () => {

    test(`${name} - light mode screenshot`, async ({ page }) => {
      await page.goto(fileUrl);
      await page.waitForLoadState('networkidle');

      // Ensure light mode is active
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'light');
      });
      await page.waitForTimeout(200);

      await page.screenshot({
        path: path.join(screenshotDir, `${name}-light.png`),
        fullPage: true,
      });
    });

    test(`${name} - dark mode screenshot`, async ({ page }) => {
      await page.goto(fileUrl);
      await page.waitForLoadState('networkidle');

      // Toggle to dark mode via data-theme attribute
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
      });
      await page.waitForTimeout(300);

      await page.screenshot({
        path: path.join(screenshotDir, `${name}-dark.png`),
        fullPage: true,
      });
    });

    test(`${name} - reduced motion screenshot`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(fileUrl);
      await page.waitForLoadState('networkidle');

      await page.screenshot({
        path: path.join(screenshotDir, `${name}-reduced-motion.png`),
        fullPage: true,
      });
    });
  });
}
