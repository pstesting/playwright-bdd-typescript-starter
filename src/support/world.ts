import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { getBrowserStackConfig } from './browserstack.config';

export interface CustomWorldOptions {
  headed?: boolean;
  browserstack?: boolean;
}

/**
 * Custom World class that extends Cucumber World
 * Manages Playwright browser, context, and page instances
 */
export class CustomWorld extends World {
  public browser?: Browser;
  public context?: BrowserContext;
  public page?: Page;
  private browserName: string = 'chromium';

  constructor(options: IWorldOptions) {
    super(options);
  }

  /**
   * Initialize browser based on configuration
   */
  async init(): Promise<void> {
    const worldParams = this.parameters as CustomWorldOptions;
    
    if (worldParams.browserstack) {
      await this.initBrowserStack();
    } else {
      await this.initLocal(worldParams.headed || false);
    }
  }

  /**
   * Initialize local browser
   */
  private async initLocal(headed: boolean): Promise<void> {
    const launchOptions = {
      headless: !headed,
      slowMo: headed ? 100 : 0,
    };

    switch (this.browserName) {
      case 'firefox':
        this.browser = await firefox.launch(launchOptions);
        break;
      case 'webkit':
        this.browser = await webkit.launch(launchOptions);
        break;
      default:
        this.browser = await chromium.launch(launchOptions);
    }

    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: process.env.CI ? { dir: 'test-results/videos' } : undefined,
    });
    
    this.page = await this.context.newPage();
  }

  /**
   * Initialize BrowserStack browser
   */
  private async initBrowserStack(): Promise<void> {
    const bsConfig = getBrowserStackConfig();
    
    this.browser = await chromium.connect(bsConfig.cdpUrl);
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    this.page = await this.context.newPage();
  }

  /**
   * Close browser and cleanup
   */
  async close(): Promise<void> {
    if (this.page) {
      await this.page.close();
    }
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }

  /**
   * Take a screenshot
   */
  async screenshot(name: string): Promise<Buffer> {
    if (!this.page) {
      throw new Error('Page not initialized');
    }
    return await this.page.screenshot({ path: `test-results/screenshots/${name}.png` });
  }
}

setWorldConstructor(CustomWorld);
