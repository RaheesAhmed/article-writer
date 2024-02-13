import puppeteer from "puppeteer";

async function scrapeGoogleSearchResults(keyword) {
  const browser = await puppeteer.launch({ headless: true }); // Set headless: true for no GUI
  const page = await browser.newPage();
  await page.goto("https://www.google.com/");
  await page.type("textarea[name=q]", keyword); // Correct the selector to 'input[name=q]'
  await page.keyboard.press("Enter");
  await page.waitForNavigation();

  const searchResults = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("h3")).map((anchor) => ({
      title: anchor.innerText,
      url: anchor.parentElement.href,
    }));
    return links.slice(0, 2);
  });

  const resultsData = [];
  for (const result of searchResults) {
    console.log(`Visiting: ${result.url}`);
    try {
      const newPage = await browser.newPage();
      await newPage.goto(result.url, { waitUntil: "networkidle0" });
      const data = await newPage.evaluate(() => {
        const articleTitle = document.title;
        const metaKeywords = document.querySelector('meta[name="keywords"]')
          ? document.querySelector('meta[name="keywords"]').content
          : null;
        const articleContent = document.body.innerText;
        return { articleTitle, metaKeywords, articleContent };
      });
      console.log(data); // or push to resultsData
      resultsData.push({ url: result.url, ...data });
      await newPage.close();
    } catch (error) {
      console.error(`Error visiting ${result.url}: ${error.message}`);
    }
  }

  await browser.close();
  return resultsData;
}

export default scrapeGoogleSearchResults;
