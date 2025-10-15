import { Page } from '@playwright/test';

/**
 * Utility helper functions for tests
 */

/**
 * Wait for a specified amount of time
 * @param ms - milliseconds to wait
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a random string
 * @param length - length of the string
 * @returns random string
 */
export function randomString(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a random email
 * @returns random email address
 */
export function randomEmail(): string {
  return `test-${randomString(8)}@example.com`;
}

/**
 * Format date to ISO string
 * @param date - date to format
 * @returns ISO formatted date string
 */
export function formatDate(date: Date = new Date()): string {
  return date.toISOString();
}

/**
 * Scroll to bottom of page
 * @param page - Playwright page object
 */
export async function scrollToBottom(page: Page): Promise<void> {
  await page.evaluate(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).scrollTo(0, (document as any).body.scrollHeight);
  });
}

/**
 * Scroll to top of page
 * @param page - Playwright page object
 */
export async function scrollToTop(page: Page): Promise<void> {
  await page.evaluate(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).scrollTo(0, 0);
  });
}

/**
 * Get current timestamp in milliseconds
 * @returns current timestamp
 */
export function timestamp(): number {
  return Date.now();
}

/**
 * Wait for element to be visible with custom timeout
 * @param page - Playwright page object
 * @param selector - element selector
 * @param timeout - timeout in milliseconds
 */
export async function waitForElement(
  page: Page,
  selector: string,
  timeout: number = 30000
): Promise<void> {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

/**
 * Check if element exists on page
 * @param page - Playwright page object
 * @param selector - element selector
 * @returns true if element exists
 */
export async function elementExists(page: Page, selector: string): Promise<boolean> {
  const element = await page.$(selector);
  return element !== null;
}

/**
 * Get environment variable with fallback
 * @param key - environment variable key
 * @param defaultValue - default value if not found
 * @returns environment variable value or default
 */
export function getEnv(key: string, defaultValue: string = ''): string {
  return process.env[key] || defaultValue;
}
