import { chromium } from 'file:///E:/tools/rea/node_modules/rea-agents/node_modules/playwright-core/index.mjs';
import fs from 'node:fs/promises';
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const results = [];
try {
  for (const width of [1440, 820, 390, 320]) {
    const page = await browser.newPage({viewport:{width,height:900}});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:4176/');
    await page.locator('.showcase').scrollIntoViewIfNeeded();
    await page.getByRole('button',{name:'Replay buyer enquiry demonstration'}).click();
    const before=await page.locator('.showcase__scene').boundingBox();
    await page.waitForTimeout(1700);
    const mid=await page.locator('.showcase-brief__count').innerText();
    await page.waitForTimeout(3200);
    const after=await page.locator('.showcase__scene').boundingBox();
    const info=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,disabled:document.querySelectorAll('.showcase [role=tab]:disabled').length,final:document.querySelector('.showcase-brief__status').textContent,font:document.fonts.check('16px Figtree')}));
    await page.getByRole('tab',{name:'Buyer enquiries',exact:true}).focus();
    await page.keyboard.press('ArrowRight');
    const arrowFocus=await page.getByRole('tab',{name:'Buyer enquiries',exact:true}).evaluate(el=>el===document.activeElement);
    await page.keyboard.press('Tab');
    const panelFocus=await page.locator('[role=tabpanel]').evaluate(el=>el===document.activeElement);
    results.push({width,mid,...info,stableHeight:before.height===after.height,arrowFocus,panelFocus,errors});
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.reload();
    await page.locator('.showcase__scene').scrollIntoViewIfNeeded();
    results.push({width,reducedMotion:true,replayCount:await page.getByRole('button',{name:'Replay buyer enquiry demonstration'}).count(),count:await page.locator('.showcase-brief__count').innerText()});
    await page.close();
  }
  await fs.writeFile('E:/manzil-aiwebsite/review-screenshots/showcase-checks.json',JSON.stringify(results,null,2));
  console.log(JSON.stringify(results,null,2));
} finally { await browser.close(); }
