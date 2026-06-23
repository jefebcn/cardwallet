const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1223/chrome-linux64/chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--ignore-certificate-errors', '--font-render-hinting=none'],
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage({ deviceScaleFactor: 2, ignoreHTTPSErrors: true });

  const fileUrl = 'file://' + path.resolve(__dirname, 'posts.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 60000 });

  // make sure the webfont is actually applied before snapshotting
  await page.evaluate(async () => { try { await document.fonts.ready; } catch (e) {} });
  await page.waitForTimeout(1500);

  const slides = await page.$$('[data-slide]');
  console.log('Found', slides.length, 'slides');

  const outDir = path.resolve(__dirname, 'png');
  for (const el of slides) {
    const name = await el.getAttribute('data-slide');
    const file = path.join(outDir, `crest-${name}.png`);
    await el.screenshot({ path: file });
    console.log('✓', `crest-${name}.png`);
  }

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
