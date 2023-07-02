describe("Страница", () => {
  const mainPage = 'http://localhost:3000/hw/store';

  it("'Главная' должна иметь статическое содержимое", async ({ browser }) => {
    const pupBrowser = await browser.getPuppeteer();
    const page = await pupBrowser.newPage();

    await page.goto(mainPage);
    await page.waitForNetworkIdle({ timeout: 5000 });

    await browser.assertView("plain", "body", {tolerance: 4});

    page.close();
  });
  it("'Условия доставки' должна иметь статическое содержимое", async ({
    browser,
  }) => {
    const pupBrowser = await browser.getPuppeteer();
    const page = await pupBrowser.newPage();

    await page.goto(`${mainPage}/delivery`);
    await page.waitForNetworkIdle({ timeout: 5000 });

    await browser.assertView("plain", "body", {tolerance: 4});

    page.close();
  });
  it("'Контакты' должна иметь статическое содержимое", async ({ browser }) => {
    const pupBrowser = await browser.getPuppeteer();
    const page = await pupBrowser.newPage();

    await page.goto(`${mainPage}/contacts`);
    await page.waitForNetworkIdle({ timeout: 5000 });

    await browser.assertView("plain", "body", {tolerance: 4});

    page.close();
  });
});
