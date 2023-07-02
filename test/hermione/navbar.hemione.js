describe("Navbar", async () => {
  const mainPage = `http://localhost:3000/hw/store/${process.env.BUG_ID ? `?bug_id=${process.env.BUG_ID}` : ''}`;

  it("прячет ссылки за бургер при ширине экрана меньше 576px", async ({
    browser,
  }) => {
    const pupBrowser = await browser.getPuppeteer();
    const page = await pupBrowser.newPage();

    await page.goto(mainPage);
    const navbar = await page.$(".navbar");
    const navbarContainer = await navbar.$(".container");

    browser.debug();

    browser.setWindowSize(577, 768);
    expect(
      await navbarContainer.$eval(
        ".navbar-toggler",
        (el) => window.getComputedStyle(el).display
      )
    ).toEqual("none");

    browser.setWindowSize(574, 768);
    await page.waitForTimeout(1000);
    expect(
      await navbarContainer.$eval(
        ".navbar-toggler",
        (el) => window.getComputedStyle(el).display
      )
    ).toEqual("block");

    page.close();
  });

  it("закрывает меню при выборе элемента из гамбургера", async ({
    browser,
  }) => {
    const pupBrowser = await browser.getPuppeteer();
    const page = await pupBrowser.newPage();

    await page.goto(mainPage);
    const navbarContainer = await page.$(".navbar .container");

    browser.setWindowSize(574, 768);
    await page.waitForTimeout(1000);
    const burger = await navbarContainer.$(".navbar-toggler");
    await burger.click();
    await page.waitForTimeout(1000);
    const linksContainer = await navbarContainer.$(".navbar-collapse");
    const links = await linksContainer.$$("a");
    links[0].click();
    await page.waitForNavigation({ timeout: 5000 });
    expect(
      await navbarContainer.$eval(".navbar-collapse", (el) =>
        el.classList.contains("collapse")
      )
    ).toBe(true);

    page.close();
  });
});
