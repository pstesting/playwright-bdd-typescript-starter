/**
 * Page locators for Example Domain page
 * This file contains all selectors used to locate elements on the page
 */

export class ExamplePageLocators {
  // Page elements
  readonly heading = 'h1';
  readonly paragraph = 'p';
  readonly moreInfoLink = 'a[href*="iana.org"]';
  
  // Alternative locators using different strategies
  readonly headingByText = 'text=Example Domain';
  readonly paragraphByRole = 'role=paragraph';
  
  // Data test IDs (if your application uses them)
  readonly contentSection = '[data-testid="content"]';
}

// Export a singleton instance
export const examplePageLocators = new ExamplePageLocators();
