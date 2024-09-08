import * as cheerio from "cheerio";

const output: {[key: string]: number} = {};
const page = await (await fetch("https://upcfoodsearch.com/food-ingredients")).text();
const $ = cheerio.load(page);
const links: string[] = [];

// Collect all the links to scrape
$("a.list-group-item").each((i, element) => {
    const elem = $(element);
    const content = elem.text();
    if (content.startsWith(" ")) {
        return;
    }
    const link = elem.attr("href");
    if (link) {
        links.push(link);
        output[content.toLowerCase().replaceAll(" ", "_")] = null; // Initialize with null
    }
});

// Scrape all links concurrently
const scrapePromises = links.map(async (link) => {
    return await scrape(link);
});

// Wait for all scrape operations to complete
const results = await Promise.all(scrapePromises);

// Update the output with results
Object.keys(output).forEach((key, index) => {
    output[key] = results[index];
});

console.log(output);
console.log(JSON.stringify(output));

async function scrape(link: string): Promise<number> {
    const page = await (await fetch(link)).text();
    const result = /const percent = '(.+)%';/.exec(page)!;
    return Number.parseFloat((result ? result[1] : "NaN") || "NaN");
}
