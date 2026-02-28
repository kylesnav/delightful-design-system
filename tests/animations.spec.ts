import { test, expect } from '@playwright/test';
import path from 'path';

const designSystemPath = path.resolve(__dirname, '..', 'delightful-design-system.html');
const fileUrl = `file://${designSystemPath}`;

test.describe('Animation functionality', () => {

  test('reduced motion: animation-duration is near-zero', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(fileUrl);
    await page.waitForLoadState('networkidle');

    // The CSS rule sets animation-duration: 0.01ms and transition-duration: 0.01ms for all elements
    const durations = await page.evaluate(() => {
      // Sample several elements that would normally be animated
      const selectors = ['*'];
      const results: { animation: string; transition: string }[] = [];
      // Check a representative set of elements
      const els = document.querySelectorAll('.btn, .card, .tile, .sidebar-item');
      for (const el of Array.from(els).slice(0, 5)) {
        const cs = getComputedStyle(el);
        results.push({
          animation: cs.animationDuration,
          transition: cs.transitionDuration,
        });
      }
      return results;
    });

    for (const d of durations) {
      // With prefers-reduced-motion: reduce, durations should be 0.01ms or 0s
      const animMs = parseFloat(d.animation);
      const transMs = parseFloat(d.transition);
      // Animation duration should be effectively zero (0s or 0.01ms)
      expect(animMs).toBeLessThanOrEqual(0.01);
      expect(transMs).toBeLessThanOrEqual(0.01);
    }
  });

  test('text-stamp keyframe exists in stylesheet', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForLoadState('networkidle');

    const hasTextStamp = await page.evaluate(() => {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            // Check top-level keyframes
            if (rule instanceof CSSKeyframesRule && rule.name === 'text-stamp') {
              return true;
            }
            // Check inside @layer and @media blocks
            if ('cssRules' in rule) {
              for (const nested of (rule as CSSGroupingRule).cssRules) {
                if (nested instanceof CSSKeyframesRule && nested.name === 'text-stamp') {
                  return true;
                }
                // One more level of nesting (e.g., @layer > @media > @keyframes)
                if ('cssRules' in nested) {
                  for (const deep of (nested as CSSGroupingRule).cssRules) {
                    if (deep instanceof CSSKeyframesRule && deep.name === 'text-stamp') {
                      return true;
                    }
                  }
                }
              }
            }
          }
        } catch { /* skip cross-origin sheets */ }
      }
      return false;
    });

    expect(hasTextStamp).toBe(true);
  });

  test('accordion-squish: CSS defines 0fr closed and 1fr open', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForLoadState('networkidle');

    // Verify the CSS rules define the accordion-squish pattern correctly
    const rules = await page.evaluate(() => {
      const result = { closed: '', open: '', hasOverflow: false };

      function scanRules(ruleList: CSSRuleList) {
        for (const rule of ruleList) {
          if (rule instanceof CSSStyleRule) {
            if (rule.selectorText === '.accordion-squish') {
              result.closed = rule.style.gridTemplateRows;
            }
            if (rule.selectorText === '.accordion-squish.accordion-open') {
              result.open = rule.style.gridTemplateRows;
            }
            if (rule.selectorText === '.accordion-squish > *') {
              result.hasOverflow = rule.style.overflow === 'hidden';
            }
            // Check nested rules
            if ('cssRules' in rule && (rule as any).cssRules) {
              scanRules((rule as any).cssRules);
            }
          }
          if ('cssRules' in rule) {
            scanRules((rule as CSSGroupingRule).cssRules);
          }
        }
      }

      for (const sheet of document.styleSheets) {
        try { scanRules(sheet.cssRules); } catch { /* skip */ }
      }
      return result;
    });

    expect(rules.closed).toBe('0fr');
    expect(rules.open).toBe('1fr');
    expect(rules.hasOverflow).toBe(true);
  });

  test('spring easing tokens are valid linear() functions', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForLoadState('networkidle');

    const springs = await page.evaluate(() => {
      const cs = getComputedStyle(document.documentElement);
      return {
        gentle: cs.getPropertyValue('--ease-spring-gentle').trim(),
        bouncy: cs.getPropertyValue('--ease-spring-bouncy').trim(),
      };
    });

    expect(springs.gentle).toMatch(/^linear\(/);
    expect(springs.bouncy).toMatch(/^linear\(/);
  });

  test('fadeInUp keyframe exists', async ({ page }) => {
    await page.goto(fileUrl);
    await page.waitForLoadState('networkidle');

    const hasFadeInUp = await page.evaluate(() => {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule instanceof CSSKeyframesRule && rule.name === 'fadeInUp') return true;
            if ('cssRules' in rule) {
              for (const nested of (rule as CSSGroupingRule).cssRules) {
                if (nested instanceof CSSKeyframesRule && nested.name === 'fadeInUp') return true;
                if ('cssRules' in nested) {
                  for (const deep of (nested as CSSGroupingRule).cssRules) {
                    if (deep instanceof CSSKeyframesRule && deep.name === 'fadeInUp') return true;
                  }
                }
              }
            }
          }
        } catch { /* skip cross-origin sheets */ }
      }
      return false;
    });

    expect(hasFadeInUp).toBe(true);
  });
});
