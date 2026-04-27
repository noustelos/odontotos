const { chromium, devices } = require('playwright');
const fs = require('fs');

async function warmUpPage(page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');

  await page.evaluate(async () => {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const lazyImages = Array.from(document.querySelectorAll('img[loading="lazy"]'));

    lazyImages.forEach((image) => {
      image.loading = 'eager';
      image.decoding = 'sync';

      const currentSrc = image.getAttribute('src');
      if (currentSrc) {
        image.src = currentSrc;
      }
    });

    const checkpoints = [
      '.first-images-grid',
      '.image-section',
      '.train-visuals',
      '#railway-route',
      '.google-map-card',
    ];

    for (const selector of checkpoints) {
      const element = document.querySelector(selector);
      if (!element) {
        continue;
      }

      element.scrollIntoView({ behavior: 'auto', block: 'center' });
      await wait(250);
    }

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
    await wait(300);
    window.scrollTo({ top: 0, behavior: 'auto' });
  });

  await page.waitForFunction(
    () => {
      const relevantImages = Array.from(
        document.querySelectorAll('.first-images-grid img, .image-section img, .train-visuals img')
      );

      if (!relevantImages.length) {
        return true;
      }

      return relevantImages.every((image) => image.complete && image.naturalWidth > 0);
    },
    { timeout: 10000 }
  );

  const routeSection = page.locator('#railway-route');
  if (await routeSection.count()) {
    await routeSection.scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () => {
        const skeleton = document.querySelector('[data-map-skeleton]');
        const map = document.getElementById('map');
        const loadedTiles = document.querySelectorAll('.leaflet-tile-loaded').length;

        return Boolean(
          map &&
            loadedTiles > 0 &&
            (!skeleton || skeleton.classList.contains('is-hidden'))
        );
      },
      { timeout: 12000 }
    ).catch(() => {});
  }

  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  });
}

(async () => {
  fs.mkdirSync('qa-shots', { recursive: true });
  const browser = await chromium.launch({ headless: true });

  const configs = [
    { name: 'iphone13', context: { ...devices['iPhone 13'] } },
    { name: 'ipad', context: { ...devices['iPad (gen 7)'] } },
    {
      name: 'desktop',
      context: {
        viewport: { width: 1440, height: 2200 },
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36',
      },
    },
  ];

  for (const cfg of configs) {
    const context = await browser.newContext(cfg.context);
    const page = await context.newPage();
    await page.goto('http://127.0.0.1:8080/index.html', { waitUntil: 'networkidle' });
    await warmUpPage(page);
    await page.screenshot({ path: `qa-shots/${cfg.name}.png`, fullPage: true });
    await context.close();
  }

  await browser.close();
})();
