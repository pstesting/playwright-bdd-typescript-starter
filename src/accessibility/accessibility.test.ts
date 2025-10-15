import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y, getViolations } from 'axe-playwright';

/**
 * Accessibility testing examples using axe-playwright
 * These tests check for WCAG compliance and common accessibility issues
 */

test.describe('Accessibility Tests', () => {
  test('should not have any automatically detectable accessibility issues on homepage', async ({ page }) => {
    await page.goto('https://example.com');
    await injectAxe(page);

    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });

    const violations = await getViolations(page);
    expect(violations).toEqual([]);
  });

  test('should not have critical accessibility violations', async ({ page }) => {
    await page.goto('https://example.com');
    await injectAxe(page);

    const violations = await getViolations(page);
    
    // Filter for critical and serious violations only
    const criticalViolations = violations.filter(
      (violation: any) => violation.impact === 'critical' || violation.impact === 'serious'
    );

    expect(criticalViolations).toEqual([]);
  });

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('https://example.com');
    await injectAxe(page);

    const violations = await getViolations(page, undefined, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });

    const headingViolations = violations.filter(
      (violation: any) => violation.id.includes('heading')
    );

    expect(headingViolations).toEqual([]);
  });

  test('should check specific element for accessibility', async ({ page }) => {
    await page.goto('https://example.com');
    await injectAxe(page);

    const violations = await getViolations(page, 'body');

    // Log violations for debugging
    if (violations.length > 0) {
      console.log('Accessibility violations found:');
      violations.forEach((violation: any) => {
        console.log(`- ${violation.id}: ${violation.description}`);
        console.log(`  Impact: ${violation.impact}`);
        console.log(`  Help: ${violation.help}`);
      });
    }

    expect(violations.length).toBe(0);
  });

  test('should generate detailed accessibility report', async ({ page }) => {
    await page.goto('https://example.com');
    await injectAxe(page);

    const violations = await getViolations(page);

    // Attach report to test results
    test.info().annotations.push({
      type: 'accessibility-report',
      description: JSON.stringify(violations, null, 2)
    });
    
    // Verify no violations
    expect(violations).toEqual([]);
  });
});
