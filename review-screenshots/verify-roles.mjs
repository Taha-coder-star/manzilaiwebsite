import { chromium } from 'file:///E:/tools/rea/node_modules/rea-agents/node_modules/playwright-core/index.mjs';

const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const results = [];
try {
  for (const width of [1440, 820, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: width < 600 ? 844 : 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:4176/');
    await page.locator('.roles').scrollIntoViewIfNeeded();
    const selected = [];
    for (const role of ['Customer', 'Broker', 'Staff']) {
      await page.getByRole('tab', { name: role, exact: false }).last().click();
      selected.push({role, heading: await page.locator('.roles__detail h3').innerText(), actions: await page.locator('.roles__actions li').count()});
    }
    await page.getByRole('tab', { name: 'Customer', exact: false }).last().focus();
    await page.keyboard.press('ArrowRight');
    const keyboardSelect = await page.locator('#brokers').getAttribute('aria-selected');
    const metrics = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth, hash: location.hash, active: document.querySelector('.roles__tabs [aria-selected="true"]')?.id }));
    await page.goto('http://127.0.0.1:4176/#staff');
    await page.waitForTimeout(200);
    const deepLink = await page.locator('.roles__detail h3').innerText();
    await page.locator('.roles').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `E:/manzil-aiwebsite/review-screenshots/roles-${width}.png` });
    results.push({ width, selected, keyboardSelect, ...metrics, deepLink, errors });
    await page.close();
  }
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }
