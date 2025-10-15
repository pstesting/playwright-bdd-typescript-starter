# Contributing to Playwright BDD TypeScript Starter

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Getting Started

1. **Fork the repository**
   - Click the "Fork" button at the top right of the repository page

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/playwright-bdd-typescript-starter.git
   cd playwright-bdd-typescript-starter
   ```

3. **Install dependencies**
   ```bash
   npm install
   npx playwright install
   ```

4. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running Tests

Before submitting a PR, ensure all tests pass:

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run Cucumber BDD tests
npm test

# Run accessibility tests
npm run test:accessibility
```

### Code Style

- Use TypeScript for all new code
- Follow the existing code style (ESLint configuration)
- Write clear, descriptive commit messages
- Add comments for complex logic

### File Organization

When adding new features, follow the existing structure:

- **Features**: Place `.feature` files in `src/features/`
- **Locators**: Define page locators in `src/locators/`
- **Actions**: Implement page actions in `src/actions/`
- **Step Definitions**: Add step definitions in `src/step_definitions/`
- **Utilities**: Helper functions go in `src/utils/`

### Writing Tests

1. **Feature Files**: Write in Gherkin syntax
   ```gherkin
   Feature: Feature Name
     Scenario: Scenario Name
       Given some precondition
       When some action
       Then expected outcome
   ```

2. **Locators**: Use descriptive names
   ```typescript
   export class MyPageLocators {
     readonly submitButton = '#submit-btn';
   }
   ```

3. **Actions**: Keep actions focused and reusable
   ```typescript
   export class MyPageActions {
     async clickSubmit(): Promise<void> {
       await this.page.click(myPageLocators.submitButton);
     }
   }
   ```

4. **Step Definitions**: Keep them clean and readable
   ```typescript
   When('I click submit', async function (this: CustomWorld) {
     const myPage = new MyPageActions(this.page!);
     await myPage.clickSubmit();
   });
   ```

## Pull Request Process

1. **Update documentation**
   - Update README.md if you add new features
   - Add inline comments for complex code
   - Update CHANGELOG.md (if it exists)

2. **Ensure quality**
   - All tests must pass
   - No TypeScript errors
   - No ESLint errors (warnings are acceptable if justified)

3. **Write a good PR description**
   - Describe what changes you made and why
   - Reference any related issues
   - Include screenshots for UI changes

4. **PR Checklist**
   - [ ] Code follows the project's style guidelines
   - [ ] Tests pass locally
   - [ ] New tests added for new features
   - [ ] Documentation updated
   - [ ] Commit messages are clear and descriptive

## Reporting Issues

When reporting issues, please include:

- A clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Your environment (OS, Node.js version, etc.)
- Screenshots (if applicable)

## Feature Requests

We welcome feature requests! Please:

- Check if the feature has already been requested
- Provide a clear use case
- Explain how it would benefit the project
- Be open to discussion about implementation

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## Questions?

If you have questions, feel free to:
- Open an issue
- Start a discussion
- Reach out to the maintainers

Thank you for contributing! 🎉
