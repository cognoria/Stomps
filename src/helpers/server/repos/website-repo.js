import cheerio from 'cheerio'
import xml2js from 'xml2js';
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
    Urls.add(url)

    $('a[target="_blank"], a').each((_, element) => {
        const href = $(element).attr('href');
        if (href && !/^(javascript:|https?:\/\/|\/\/|#|.*\.(png|jpg|jpeg|gif|svg))$/i.test(href)) {
            // Check if the URL has a query parameter or a hash fragment
            if (!href.includes('?') && !href.includes('#')) {
                if (!href.startsWith('javascript:') && href.trim() !== '') {
                    const completeUrl = new URL(href, baseUrl).href;
                    Urls.add(completeUrl);
                }
            }
        }
    });

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

async function fetchWithRetry(url) {
    try {
        const response = await fetch(url);
        return response;
    } catch (error) {
        // Retry logic if fetch fails
        if (!url.startsWith("http://www.") && !url.startsWith("https://www.")) {
            // Retry with URL having www prefix
            const retryUrl = url.replace(/^https?:\/\//, "https://www.");
            return fetch(retryUrl);
        } else {
            // Re-throw the error if retry also fails
            throw error;
        }
    }
}
