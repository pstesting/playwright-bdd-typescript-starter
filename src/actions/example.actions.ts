import { Page } from '@playwright/test';
import { examplePageLocators } from '../locators/example.locators';

/**
 * Page actions for Example Domain page
 * This file contains all user actions that can be performed on the page
 */

export class ExamplePageActions {
  constructor(private page: Page) {}

  /**
   * Navigate to the example homepage
   */
  async navigateToHomepage(): Promise<void> {
    await this.page.goto('https://example.com');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get the page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get heading text
   */
  async getHeadingText(): Promise<string> {
    return await this.page.locator(examplePageLocators.heading).textContent() || '';
  }

  /**
   * Get paragraph text
   */
  async getParagraphText(): Promise<string> {
    return await this.page.locator(examplePageLocators.paragraph).first().textContent() || '';
  }

  /**
   * Check if heading is visible
   */
  async isHeadingVisible(): Promise<boolean> {
    return await this.page.locator(examplePageLocators.heading).isVisible();
  }

  /**
   * Check if paragraph is visible
   */
  async isParagraphVisible(): Promise<boolean> {
    const paragraphs = this.page.locator(examplePageLocators.paragraph);
    const count = await paragraphs.count();
    return count > 0;
  }

  /**
   * Click on more information link
   */
  async clickMoreInfoLink(): Promise<void> {
    await this.page.locator(examplePageLocators.moreInfoLink).click();
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Take a screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }
}
