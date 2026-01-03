import '../../framework/env/env'; 

import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

// Load a specific env file manually
const env = process.env.ENV;
const envPath = path.resolve(__dirname, `../../profiles/.env.${env}`);
config({ path: envPath });

const BROWSER_CHROME = "chrome";
const BROWSER_FIREFOX = "firefox";
const BROWSER_WEBKIT = "webkit";
const BROWSER_EDGE = "edge";

export const invokeBrowser = async () => {
    const browserType = process.env.BROWSER || BROWSER_EDGE;
    const headless = process.env.HEADLESS === 'true';
    const options: LaunchOptions = { headless };

    const customChromePath = process.env.CHROME_PATH;
    switch (browserType) {
        case BROWSER_CHROME:
            const executablePath = customChromePath && fs.existsSync(customChromePath) ? customChromePath : undefined;
            return chromium.launch({ ...options, executablePath });

        case BROWSER_EDGE:
            return chromium.launch({ ...options, channel: 'msedge' });

        case BROWSER_FIREFOX:
            return firefox.launch(options);

        case BROWSER_WEBKIT:
            return webkit.launch(options);

        default:
            throw new Error(`Unsupported browser type: ${browserType}`);
    }
};
