import { test, expect,devices } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.route(/.css$/, route => route.abort());
});
test.describe('Network Tests', () => {
  test('loads page without css', async ({ page }) => {
    await page.goto('https://playwright.dev');
  });
test('network request', async ({ page }) => {
  const [response] = await Promise.all([
    page.waitForResponse('https://jsonplaceholder.typicode.com/posts/1'),
    page.evaluate(() => fetch('https://jsonplaceholder.typicode.com/posts/1')),
  ]);

  expect(response.status()).toBe(200);
});

test('modify request',async ({page})=>{
await page.route('**/*', async route => {
  const headers = route.request().headers();
  delete headers['X-Secret'];
  await route.continue({ headers });
});


await page.route('**/*', route => route.continue({ method: 'POST' }));
})
test('abort request',async({page})=>{
  await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
await page.route('**/*', route => {
  return route.request().resourceType() === 'image' ? route.abort() : route.continue();
});
})
test('modify response',async ({page})=>{  
await page.route('**/title.html', async route => {
  const response = await route.fetch();
  let body = await response.text();
  body = body.replace('<title>', '<title>My prefix:');
  await route.fulfill({
    response,
    body,
    headers: {
      ...response.headers(),
      'content-type': 'text/html'
    }
  });
});
});
test('advanced user interactions ', async ({ browser }) => {
 
  const context = await browser.newContext({
    httpCredentials: {
      username: 'admin',
      password: 'admin'
    },
    permissions: ['geolocation']
  });

  const page = await context.newPage();
  await page.goto('https://the-internet.herokuapp.com/basic_auth');


  await page.mouse.move(100, 100);
  await page.mouse.down();
  await page.mouse.up();
  await page.mouse.click(100, 200);

  
  await page.keyboard.type('Playwright Test', { delay: 1000 });
  await page.keyboard.press('Enter');

  await page.keyboard.down('Control');
  await page.keyboard.press('KeyA');
  await page.keyboard.up('Control');


  await page.goto('https://the-internet.herokuapp.com/upload');
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.click('input[type="file"]');
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles('C:\\Users\\iyyntech\\Desktop\\Network-test\\Net-test\\tests\\testfile.txt'); 

await page.goto('https://file-examples.com/index.php/sample-documents-download/');
  await page.waitForLoadState('load');
  
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  page.once('dialog', async dialog => {
    console.log('Dialog message:', dialog.message());
    await dialog.accept('Playwright'); 
  });
 await page.click('button[onclick="jsPrompt()"]'); 
  

  await page.goto('http://localhost:5173/');
  await page.waitForLoadState('domcontentloaded');

  await page.hover('text=Vite'); // hover over 'Vite' text

 await page.click('button:text-matches("^count is \\\\d+$", "i")', { button: 'right' }); // ✅ Correct


  // Type into the page
  await page.keyboard.type('Testing chain');
  await page.keyboard.press('Enter');

  // 4. Cleanly close context and browser
  await context.close();
  await browser.close();
  
});

});