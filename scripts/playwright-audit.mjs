import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const ROUTES = ['/notre-solution', '/restaurateurs', '/investisseurs', '/a-propos', '/tarifs', '/visite-360'];
const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844, isMobile: true },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];
const OUT = process.argv[2] || 'screenshots/audit';
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: !!vp.isMobile,
      hasTouch: !!vp.isMobile,
      deviceScaleFactor: vp.isMobile ? 2 : 1,
    });
    const page = await ctx.newPage();
    try {
      await page.goto('http://localhost:3010' + route, { waitUntil: 'networkidle', timeout: 30000 });
    } catch (e) {
      console.warn('soft timeout for', route, vp.name, '-', e.message);
    }
    await page.waitForTimeout(900);
    const slug = route.slice(1).replace(/\//g, '_');
    const out = OUT + '/' + slug + '_' + vp.name + '.png';
    await page.screenshot({ path: out, fullPage: true });
    console.log('captured', out);
    await ctx.close();
  }
}
await browser.close();
