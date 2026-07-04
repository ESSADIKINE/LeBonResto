import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const OUT = 'screenshots/audit_after';
await mkdir(OUT, { recursive: true });
const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844, isMobile: true },
  { name: 'desktop', width: 1440, height: 900 },
];
const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: !!vp.isMobile,
    hasTouch: !!vp.isMobile,
    deviceScaleFactor: vp.isMobile ? 2 : 1,
  });
  const page = await ctx.newPage();
  try {
    await page.goto('http://localhost:3010/notre-solution', { waitUntil: 'networkidle', timeout: 30000 });
  } catch (e) {
    console.warn('soft timeout', vp.name, e.message);
  }
  await page.waitForTimeout(1000);
  const out = `${OUT}/notre-solution_${vp.name}.png`;
  await page.screenshot({ path: out, fullPage: true });
  console.log('captured', out);
  await ctx.close();
}
await browser.close();
