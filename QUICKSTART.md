# Quick Start Guide

Get up and running with Playwright BDD TypeScript Starter in 5 minutes!

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

## Installation

```bash
# Clone the repository
git clone https://github.com/pstesting/playwright-bdd-typescript-starter.git
cd playwright-bdd-typescript-starter

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

## Your First Test

The project comes with example tests ready to run!

### Run Cucumber BDD Tests

```bash
npm test
```

This will:
- Run the example feature file (`src/features/example.feature`)
- Execute tests against https://example.com
- Generate test reports

### Run in Headed Mode (See Browser)

```bash
npm run test:headed
```

### Run Accessibility Tests

```bash
npm run test:accessibility
```

## View Test Reports

### Allure Report (Recommended)

```bash
# Generate and open Allure report
npm run allure:serve
```

This will start a local server and open the beautiful Allure report in your browser.

## Project Structure Overview

```
src/
├── features/           # Your .feature files (Gherkin)
├── step_definitions/   # Step implementations
├── locators/          # Page element selectors
├── actions/           # Page interaction methods
├── support/           # Test setup (hooks, world)
└── accessibility/     # Accessibility tests
```

## Writing Your First Custom Test

### 1. Create a Feature File

Create `src/features/my-test.feature`:

```gherkin
Feature: My First Test
  Scenario: Visit homepage
    Given I visit the homepage
    Then I see a welcome message
```

### 2. Define Locators

Create `src/locators/homepage.locators.ts`:

```typescript
export class HomepageLocators {
  readonly welcomeMessage = '.welcome';
}

export const homepageLocators = new HomepageLocators();
```

### 3. Create Actions

Create `src/actions/homepage.actions.ts`:

```typescript
import { Page } from '@playwright/test';
import { homepageLocators } from '../locators/homepage.locators';

export class HomepageActions {
  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('https://example.com');
  }

  async getWelcomeMessage(): Promise<string> {
    return await this.page.locator(homepageLocators.welcomeMessage).textContent() || '';
  }
}
```

### 4. Implement Steps

Create `src/step_definitions/my-test.steps.ts`:

```typescript
import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { HomepageActions } from '../actions/homepage.actions';

Given('I visit the homepage', async function (this: CustomWorld) {
  const homepage = new HomepageActions(this.page!);
  await homepage.navigate();
});

Then('I see a welcome message', async function (this: CustomWorld) {
  const homepage = new HomepageActions(this.page!);
  const message = await homepage.getWelcomeMessage();
  expect(message.length).toBeGreaterThan(0);
});
```

### 5. Run Your Test

```bash
npm test
```

## BrowserStack Setup (Optional)

1. Sign up at https://www.browserstack.com
2. Get your credentials
3. Create `.env` file:

```bash
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
```

4. Run tests on BrowserStack:

```bash
npm run test:browserstack
```

## Common Commands

```bash
# Development
npm run type-check      # Check TypeScript types
npm run lint           # Run ESLint

# Testing
npm test              # Run all Cucumber tests
npm run test:headed   # Run with visible browser
npm run test:accessibility  # Run accessibility tests
npm run test:browserstack   # Run on BrowserStack

# Reports
npm run allure:generate    # Generate Allure report
npm run allure:open        # Open existing report
npm run allure:serve       # Generate and serve report
```

## Tips

1. **Tag Your Tests**: Use `@smoke`, `@regression`, etc. to organize tests
2. **Use .only**: Run specific scenarios during development
3. **Screenshots on Failure**: Automatically captured in `test-results/`
4. **Parallel Execution**: Configured by default for faster runs
5. **CI/CD Ready**: GitHub Actions workflow included

## Troubleshooting

### Browsers not found
```bash
npx playwright install
```

### Port already in use (Allure)
```bash
pkill -f allure
npm run allure:serve
```

### TypeScript errors
```bash
npm run type-check
```

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check out [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- Explore example tests in `src/features/`
- Add your own page objects and tests
- Set up CI/CD for automated testing

## Need Help?

- Check existing issues on GitHub
- Create a new issue with details
- Review Playwright docs: https://playwright.dev

Happy Testing! 🎭
