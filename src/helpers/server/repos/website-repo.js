import cheerio from 'cheerio'
import xml2js from 'xml2js';
import logger from '../../logger';
// import { deletePincone } from '../../AI/pinecone';

export const websiteRepo = {
    getUrls
}

async function getUrls(type, url) {
    if (!type || !url) throw 'url type and url are required';
    // console.log(await deletePincone())
    switch (type) {
        case 'sitemap':
            return await getWebLinksFromSiteMap(url)
        case 'web':
            return await getWebLinksFromUrl(url)
        default:
            throw 'unsuported url type'
    }
}

async function getWebLinksFromUrl(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    const response = await fetchWithRetry(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const baseUrl = new URL(url).origin
    const Urls = new Set();
    const unfiltered = []
    Urls.add(url)
    ////DONE TODO: log unfiltered href
    $('a[target="_blank"], a').each((_, element) => {
        const href = $(element).attr('href');
        unfiltered.push(href)
        const completeUrl = new URL(href, baseUrl).href;
        if (completeUrl && !/^(javascript:|https?:\/\/|\/\/|#|.*\.(png|jpg|jpeg|gif|svg))$/i.test(completeUrl)) {
            // Check if the URL has a query parameter or a hash fragment
            if (!completeUrl.includes('?') && !completeUrl.includes('#') && !completeUrl.includes('tel')) {
                if (!completeUrl.startsWith('javascript:') && completeUrl.trim() !== '') {
                    // const completeUrl = new URL(href, baseUrl).href;
                    Urls.add(completeUrl);
                }
            }
        }
    });

    logger.crawl(`${url} crawled unfiltered ${JSON.stringify(unfiltered)}`)
    logger.crawl(`${url} crawled filtered ${JSON.stringify(Array.from(Urls))}`)

    return Array.from(Urls);
}

async function getWebLinksFromSiteMap(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }
    const response = await fetchWithRetry(url);

    const sitemapXml = await response.text();

    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(sitemapXml);

    return await result.urlset.url.map((url) => url.loc[0]);
}

// async function fetchWithRetry(url) {
//     try {
//         const response = await fetch(url);
//         return response;
//     } catch (error) {
//         // Retry logic if fetch fails
//         if (!url.startsWith("http://www.") && !url.startsWith("https://www.")) {
//             // Retry with URL having www prefix
//             const retryUrl = url.replace(/^https?:\/\//, "https://www.");
//             return fetchWithRetry(retryUrl);
//         } else {
//             // Re-throw the error if retry also fails
//             throw error;
//         }
//     }
// }

async function fetchWithRetry(url, options = {}, maxRetries = 3, delay = 100) {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                return response;
            }
            throw new Error(`Fetch failed with status ${response.status}`);
        } catch (error) {
            console.error(`Fetch attempt ${retries + 1} failed:`, error.message);
            retries++;
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, retries)));
        }
    }
    throw new Error(`Max retries (${maxRetries}) exceeded for fetch operation`);
}

