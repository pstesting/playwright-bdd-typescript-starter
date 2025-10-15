# Playwright BDD TypeScript Starter 🎭

A comprehensive Playwright BDD (Behavior-Driven Development) starter template using TypeScript, Cucumber, with built-in support for accessibility testing, Allure reporting, and BrowserStack integration.

## ✨ Features

- 🎭 **Playwright** - Modern end-to-end testing framework
- 🥒 **Cucumber BDD** - Write tests in Gherkin syntax for better collaboration
- 📘 **TypeScript** - Type-safe test development
- ♿ **Accessibility Testing** - Built-in axe-playwright for WCAG compliance
- 📊 **Allure Reporting** - Beautiful test reports with history tracking
- ☁️ **BrowserStack Support** - Run tests on cloud browsers
- 🏗️ **Organized Structure** - Separate folders for locators, actions, and step definitions
- 🔄 **CI/CD Ready** - GitHub Actions workflow included

## 📁 Project Structure

```
playwright-bdd-typescript-starter/
├── .github/
│   └── workflows/
│       └── ci.yml                # GitHub Actions CI/CD workflow
├── src/
│   ├── features/                 # Cucumber feature files (.feature)
│   │   └── example.feature
│   ├── step_definitions/         # Step definitions for features
│   │   └── example.steps.ts
│   ├── locators/                 # Page element locators
│   │   └── example.locators.ts
│   ├── actions/                  # Page actions/methods
│   │   └── example.actions.ts
│   ├── support/                  # Test support files
│   │   ├── hooks.ts              # Cucumber hooks (Before/After)
│   │   ├── world.ts              # Custom World context
│   │   └── browserstack.config.ts# BrowserStack configuration
│   ├── accessibility/            # Accessibility tests
│   │   └── accessibility.test.ts
│   └── utils/                    # Utility functions
│       └── helpers.ts
├── allure-results/               # Allure test results (generated)
├── allure-report/                # Allure HTML report (generated)
├── test-results/                 # Test artifacts (screenshots, videos)
├── playwright.config.ts          # Playwright configuration
├── cucumber.js                   # Cucumber configuration
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore patterns
├── .env.example                 # Example environment variables
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pstesting/playwright-bdd-typescript-starter.git
   cd playwright-bdd-typescript-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Set up environment variables (optional, for BrowserStack)**
   ```bash
   cp .env.example .env
   # Edit .env and add your BrowserStack credentials
   ```

## 🧪 Running Tests

### Cucumber BDD Tests

```bash
# Run all tests (headless)
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests on BrowserStack
npm run test:browserstack
```

### Accessibility Tests

```bash
# Run accessibility tests
npm run test:accessibility
```

### Allure Reports

```bash
# Generate Allure report
npm run allure:generate

# Open Allure report
npm run allure:open

# Generate and serve Allure report
npm run allure:serve
```

### Code Quality

```bash
# Run TypeScript type checking
npm run type-check

# Run ESLint
npm run lint
```

## 📝 Writing Tests

### 1. Create a Feature File

Create a new `.feature` file in `src/features/`:

```gherkin
Feature: Login Functionality
  As a user
  I want to be able to login
  So that I can access my account

  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    And I click the login button
    Then I should see the dashboard
```

### 2. Define Page Locators

Create a locators file in `src/locators/`:

```typescript
export class LoginPageLocators {
  readonly usernameInput = '#username';
  readonly passwordInput = '#password';
  readonly loginButton = 'button[type="submit"]';
  readonly errorMessage = '.error-message';
}

export const loginPageLocators = new LoginPageLocators();
```

### 3. Create Page Actions

Create an actions file in `src/actions/`:

```typescript
import { Page } from '@playwright/test';
import { loginPageLocators } from '../locators/login.locators';

export class LoginPageActions {
  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(loginPageLocators.usernameInput, username);
    await this.page.fill(loginPageLocators.passwordInput, password);
    await this.page.click(loginPageLocators.loginButton);
  }
}
```

### 4. Implement Step Definitions

Create step definitions in `src/step_definitions/`:

```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPageActions } from '../actions/login.actions';

Given('I am on the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPageActions(this.page!);
  await loginPage.navigate();
});

When('I enter valid credentials', async function (this: CustomWorld) {
  const loginPage = new LoginPageActions(this.page!);
  await loginPage.login('testuser', 'password123');
});
```

## ♿ Accessibility Testing

The project includes accessibility testing using `axe-playwright`. Example tests are in `src/accessibility/accessibility.test.ts`.

Run accessibility tests:
```bash
npm run test:accessibility
```

Accessibility tests check for:
- WCAG 2.0 Level A & AA compliance
- WCAG 2.1 compliance
- Best practices
- Color contrast issues
- Heading structure
- And more...

## ☁️ BrowserStack Integration

### Setup

1. Sign up for a BrowserStack account at https://www.browserstack.com
2. Get your username and access key from the BrowserStack dashboard
3. Set environment variables:

   ```bash
   export BROWSERSTACK_USERNAME=your_username
   export BROWSERSTACK_ACCESS_KEY=your_access_key
   ```

   Or add them to your `.env` file:
   ```
   BROWSERSTACK_USERNAME=your_username
   BROWSERSTACK_ACCESS_KEY=your_access_key
   ```

### Running Tests on BrowserStack

```bash
npm run test:browserstack
```

The BrowserStack configuration is in `src/support/browserstack.config.ts`. You can customize:
- Browser and OS combinations
- Build names
- Project names
- Session names
- Network logs
- Video recording

## 📊 Allure Reports

Allure provides rich test reports with:
- Test execution history
- Trend charts
- Test duration tracking
- Screenshots on failure
- Detailed error logs
- Test categorization

### Viewing Reports

After running tests, generate and view the report:

```bash
npm run allure:serve
```

Or generate and open separately:

```bash
npm run allure:generate
npm run allure:open
```

### Allure History

The project is configured to preserve Allure history between test runs for trend analysis. History is stored in `allure-results/history/`.

## 🔄 CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that:

- Runs on push and pull requests
- Tests on multiple Node.js versions (18.x, 20.x)
- Executes Cucumber BDD tests
- Runs accessibility tests
- Generates Allure reports
- Uploads test artifacts
- Optionally runs tests on BrowserStack (when secrets are configured)

### Setting up GitHub Secrets

For BrowserStack integration in CI/CD, add these secrets to your GitHub repository:

1. Go to your repository settings
2. Navigate to Secrets and variables → Actions
3. Add the following secrets:
   - `BROWSERSTACK_USERNAME`
   - `BROWSERSTACK_ACCESS_KEY`

## 🛠️ Configuration

### Playwright Configuration (`playwright.config.ts`)

Configure Playwright settings:
- Test directory
- Browser projects (Chromium, Firefox, WebKit)
- Base URL
- Viewport size
- Screenshots and videos
- Allure reporter integration

### Cucumber Configuration (`cucumber.js`)

Configure Cucumber settings:
- Feature file paths
- Step definition patterns
- Formatters (progress, HTML, JSON, Allure)
- Parallel execution
- Profiles (default, headed, browserstack)

### TypeScript Configuration (`tsconfig.json`)

TypeScript compiler options optimized for test automation.

## 📚 Best Practices

1. **Separate Concerns**: Keep locators, actions, and step definitions in separate files
2. **Page Object Model**: Use the actions layer to encapsulate page interactions
3. **Reusable Locators**: Define locators in a centralized location
4. **Descriptive Names**: Use clear, descriptive names for scenarios and steps
5. **Tag Your Tests**: Use Cucumber tags (@smoke, @regression, etc.) to organize tests
6. **Error Handling**: Add proper error messages and assertions
7. **Screenshots**: Automatically captured on failure via hooks
8. **Accessibility**: Run accessibility tests regularly
9. **CI/CD Integration**: Automate test execution on every commit

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues, questions, or contributions, please open an issue on GitHub.

## 📖 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Allure Report Documentation](https://docs.qameta.io/allure/)
- [axe-playwright Documentation](https://github.com/abhinaba-ghosh/axe-playwright)
- [BrowserStack Documentation](https://www.browserstack.com/docs/automate/playwright)

---

**Happy Testing! 🎉**
