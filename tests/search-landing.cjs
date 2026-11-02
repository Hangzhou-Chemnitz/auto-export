const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');
(async () => {
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
  try {
    for (const width of [390, 1440]) {
      for (const file of ['vehicle-config-teramont.html', 'vehicle-config-sylphy-2026.html', 'es/colombia.html']) {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        const errors = [];
        page.on('pageerror', e => errors.push(e.message));
        await page.goto(pathToFileURL(path.join(root, file)).href);
        assert.equal(errors.length, 0, errors.join('\n'));
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, file);
        const source = fs.readFileSync(path.join(root, file), 'utf8');
        assert.equal(await page.title(), source.match(/<title>(.*?)<\/title>/)[1]);
        for (const json of await page.locator('script[type="application/ld+json"]').allTextContents()) JSON.parse(json);
        for (const href of await page.locator('.seo-link-grid a').evaluateAll(links => links.map(a => a.getAttribute('href')))) {
          assert.ok(fs.existsSync(path.resolve(path.dirname(path.join(root, file)), href)), href);
        }
        if (file.startsWith('vehicle-')) {
          await page.locator('.seo-copy button').click();
          assert.ok(await page.locator('#contact-overlay').isVisible());
          await page.screenshot({ path: `/tmp/chemnitz-search-${width}-${file}.png` });
          await page.goto(pathToFileURL(path.join(root, file)).href + '?specid=' + (file.includes('teramont') ? '74970' : '76613'));
          assert.ok((await page.title()).startsWith(await page.locator('h1').innerText()), 'Selected trim title');
          await page.goto(pathToFileURL(path.join(root, file)).href + '?lang=es');
          assert.notEqual(await page.title(), source.match(/<title>(.*?)<\/title>/)[1], 'Localized title');
        }
        console.log('PASS', width, file);
        await page.close();
      }
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
