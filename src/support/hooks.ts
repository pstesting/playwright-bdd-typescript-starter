import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Global setup before all tests
 */
BeforeAll(async function () {
  console.log('Starting test execution...');
  
  // Ensure directories exist
  const dirs = ['test-results', 'test-results/screenshots', 'test-results/videos', 'allure-results'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
});

/**
 * Setup before each scenario
 */
Before(async function (this: CustomWorld, { pickle }) {
  console.log(`\nStarting scenario: ${pickle.name}`);
  await this.init();
});

/**
 * Cleanup after each scenario
 */
After(async function (this: CustomWorld, { pickle, result }) {
  console.log(`Finished scenario: ${pickle.name} - Status: ${result?.status}`);
  
  // Take screenshot on failure
  if (result?.status === Status.FAILED && this.page) {
    try {
      const screenshotName = `failure-${pickle.name.replace(/\s+/g, '-')}-${Date.now()}`;
      const screenshot = await this.screenshot(screenshotName);
      
      // Attach screenshot to Allure report
      if (screenshot) {
        this.attach(screenshot, 'image/png');
      }
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    }
  }

  // Cleanup
  await this.close();
});

/**
 * Global cleanup after all tests
 */
AfterAll(async function () {
  console.log('\nTest execution completed.');
  
  // Copy allure history if it exists (for trend charts)
  const historySource = path.join('allure-report', 'history');
  const historyDest = path.join('allure-results', 'history');
  
  if (fs.existsSync(historySource)) {
    if (!fs.existsSync(historyDest)) {
      fs.mkdirSync(historyDest, { recursive: true });
    }
    
    try {
      fs.cpSync(historySource, historyDest, { recursive: true });
      console.log('Allure history preserved for trend tracking');
    } catch (error) {
      console.log('Could not preserve allure history (this is normal for first run)');
    }
  }
});
