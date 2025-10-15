# Architecture Overview

This document describes the architecture and design patterns used in the Playwright BDD TypeScript Starter template.

## Project Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Test Execution Layer                      │
│                                                               │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐  │
│  │  Cucumber  │  │ Playwright │  │  Allure Reporter     │  │
│  │    BDD     │  │   Runner   │  │   (HTML Reports)     │  │
│  └────────────┘  └────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Feature Layer (Gherkin)                   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Feature Files (.feature)                             │  │
│  │  • Business-readable test scenarios                   │  │
│  │  • Given-When-Then syntax                             │  │
│  │  • Tags for test organization                         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   Step Definitions Layer                     │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Step Definitions (.steps.ts)                         │  │
│  │  • Maps Gherkin steps to code                         │  │
│  │  • Uses CustomWorld for test context                  │  │
│  │  • Orchestrates page actions                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     Page Object Layer                        │
│                                                               │
│  ┌────────────────────┐        ┌───────────────────────┐   │
│  │  Page Locators     │   →    │   Page Actions        │   │
│  │  (.locators.ts)    │        │   (.actions.ts)       │   │
│  │                    │        │                       │   │
│  │  • Element selectors        │  • User interactions  │   │
│  │  • CSS selectors   │        │  • Navigation         │   │
│  │  • XPath queries   │        │  • Data retrieval     │   │
│  │  • Test IDs        │        │  • Assertions helpers │   │
│  └────────────────────┘        └───────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Support & Utilities                       │
│                                                               │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │   Hooks     │  │ Custom World │  │  Utilities      │   │
│  │             │  │              │  │                 │   │
│  │ • Before    │  │ • Browser    │  │ • Helpers       │   │
│  │ • After     │  │ • Context    │  │ • Wait funcs    │   │
│  │ • BeforeAll │  │ • Page       │  │ • Random data   │   │
│  │ • AfterAll  │  │ • Screenshot │  │ • Formatters    │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Design Patterns

### 1. Page Object Model (POM)

The template uses a **two-layer Page Object Model**:

#### Locators Layer
```typescript
// Centralized element selectors
export class LoginPageLocators {
  readonly usernameInput = '#username';
  readonly passwordInput = '#password';
  readonly submitButton = 'button[type="submit"]';
}
```

#### Actions Layer
```typescript
// Page-specific actions
export class LoginPageActions {
  constructor(private page: Page) {}
  
  async login(username: string, password: string) {
    await this.page.fill(loginPageLocators.usernameInput, username);
    await this.page.fill(loginPageLocators.passwordInput, password);
    await this.page.click(loginPageLocators.submitButton);
  }
}
```

### 2. Cucumber World Pattern

```typescript
export class CustomWorld extends World {
  public browser?: Browser;
  public context?: BrowserContext;
  public page?: Page;
  
  async init(): Promise<void> {
    // Initialize browser based on configuration
  }
}
```

### 3. Hooks Pattern

```typescript
Before(async function (this: CustomWorld, { pickle }) {
  await this.init(); // Setup before each scenario
});

After(async function (this: CustomWorld, { result }) {
  if (result?.status === Status.FAILED) {
    await this.screenshot(); // Capture on failure
  }
  await this.close(); // Cleanup
});
```

## Best Practices Implemented

1. **Separation of Concerns**: Locators, actions, and steps are separate
2. **Single Responsibility**: Each file has one clear purpose
3. **DRY Principle**: Reusable actions and locators
4. **Type Safety**: Full TypeScript support
5. **Error Handling**: Proper error messages
6. **Screenshot on Failure**: Automatic debugging aid
7. **Parallel Execution**: Faster test runs
8. **Cloud Testing Support**: BrowserStack integration
9. **Accessibility First**: Built-in WCAG testing
10. **CI/CD Ready**: GitHub Actions workflow included
