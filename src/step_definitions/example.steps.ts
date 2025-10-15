import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { ExamplePageActions } from '../actions/example.actions';

let examplePageActions: ExamplePageActions;

Given('I am on the example homepage', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  examplePageActions = new ExamplePageActions(this.page);
  await examplePageActions.navigateToHomepage();
});

When('I see the page title', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  const title = await examplePageActions.getPageTitle();
  console.log(`Page title: ${title}`);
});

Then('the page title should contain {string}', async function (this: CustomWorld, expectedTitle: string) {
  const title = await examplePageActions.getPageTitle();
  expect(title).toContain(expectedTitle);
});

When('I check the page content', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  const isHeadingVisible = await examplePageActions.isHeadingVisible();
  expect(isHeadingVisible).toBeTruthy();
});

Then('I should see the heading {string}', async function (this: CustomWorld, expectedHeading: string) {
  const headingText = await examplePageActions.getHeadingText();
  expect(headingText).toContain(expectedHeading);
});

Then('I should see a paragraph with information', async function (this: CustomWorld) {
  const isParagraphVisible = await examplePageActions.isParagraphVisible();
  expect(isParagraphVisible).toBeTruthy();
  
  const paragraphText = await examplePageActions.getParagraphText();
  expect(paragraphText.length).toBeGreaterThan(0);
});

When('I click on the {string} link', async function (this: CustomWorld, _linkText: string) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  await examplePageActions.clickMoreInfoLink();
});

Then('I should be redirected to a new page', async function (this: CustomWorld) {
  await examplePageActions.waitForNavigation();
  const currentUrl = examplePageActions.getCurrentUrl();
  expect(currentUrl).not.toBe('https://example.com');
  expect(currentUrl).toContain('iana.org');
});
