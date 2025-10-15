import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface BrowserStackConfig {
  cdpUrl: string;
  capabilities: {
    'bstack:options': {
      userName: string;
      accessKey: string;
      buildName: string;
      projectName: string;
      sessionName: string;
      local?: boolean;
      networkLogs?: boolean;
      consoleLogs?: string;
      video?: boolean;
    };
  };
}

/**
 * Get BrowserStack configuration from environment variables
 */
export function getBrowserStackConfig(): BrowserStackConfig {
  const username = process.env.BROWSERSTACK_USERNAME;
  const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;

  if (!username || !accessKey) {
    throw new Error(
      'BrowserStack credentials not found. Please set BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY environment variables.'
    );
  }

  const buildName = process.env.BROWSERSTACK_BUILD_NAME || `Build ${new Date().toISOString()}`;
  const projectName = process.env.BROWSERSTACK_PROJECT_NAME || 'Playwright BDD TypeScript Starter';
  const sessionName = process.env.BROWSERSTACK_SESSION_NAME || 'Test Session';

  // Construct CDP URL for Playwright
  const cdpUrl = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(
    JSON.stringify({
      browser: 'chrome',
      browser_version: 'latest',
      os: 'Windows',
      os_version: '10',
      name: sessionName,
      build: buildName,
      project: projectName,
      'browserstack.username': username,
      'browserstack.accessKey': accessKey,
      'browserstack.networkLogs': true,
      'browserstack.video': true,
      'browserstack.console': 'verbose',
    })
  )}`;

  return {
    cdpUrl,
    capabilities: {
      'bstack:options': {
        userName: username,
        accessKey: accessKey,
        buildName,
        projectName,
        sessionName,
        local: false,
        networkLogs: true,
        consoleLogs: 'verbose',
        video: true,
      },
    },
  };
}

/**
 * Get BrowserStack hub URL
 */
export function getBrowserStackHubUrl(): string {
  const username = process.env.BROWSERSTACK_USERNAME;
  const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;

  if (!username || !accessKey) {
    throw new Error(
      'BrowserStack credentials not found. Please set BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY environment variables.'
    );
  }

  return `https://${username}:${accessKey}@hub-cloud.browserstack.com/wd/hub`;
}
