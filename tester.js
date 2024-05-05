import cheerio from 'cheerio'
import fs from 'fs';

async function getWebLinksFromUrl(url = "au.int") {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const baseUrl = new URL(url).origin;
    const Urls = new Set();
    const unfiltered = new Set();

    Urls.add(url);

    $('a[target="_blank"], a').each((_, element) => {
        const href = $(element).attr('href');
        unfiltered.add(href);
        const completeUrl = new URL(href, baseUrl).href
        if (completeUrl && !/^(javascript:|https?:\/\/|\/\/|#|.*\.(png|jpg|jpeg|gif|svg))$/i.test(completeUrl)) {
            if (!completeUrl.includes('?') && !completeUrl.includes('#') && !completeUrl.includes('tel')) {
                if (!completeUrl.startsWith('javascript:') && completeUrl.trim() !== '') {
                    Urls.add(completeUrl);
                }
            }
        }
    });

    // Convert sets to arrays
    const filteredUrls = Array.from(Urls);

    // Save unfiltered URLs to a file
    fs.writeFileSync('unfiltered_urls.txt', Array.from(unfiltered).join('\n'));

    // Save filtered URLs to a file
    fs.writeFileSync('filtered_urls.txt', filteredUrls.join('\n'));

    return filteredUrls;
}
getWebLinksFromUrl()
// async function getWebLinksFromUrl(url="medscape.com") {
//     if (!url.startsWith("http://") && !url.startsWith("https://")) {
//         url = "https://" + url;
//     }

//     const response = await fetch(url);
//     const html = await response.text();
//     const $ = cheerio.load(html);
//     const baseUrl = new URL(url).origin
//     const Urls = new Set();
//     const unfiltered = []
//     Urls.add(url)
//     ////DONE TODO: log unfiltered href
//     $('a[target="_blank"], a').each((_, element) => {
//         const href = $(element).attr('href');
//         unfiltered.push(href)
//         const completeUrl = new URL(href, baseUrl).href;
//         console.log(completeUrl)
//         if (completeUrl && !/^(javascript:|https?:\/\/|\/\/|#|.*\.(png|jpg|jpeg|gif|svg))$/i.test(completeUrl)) {
//             // Check if the URL has a query parameter or a hash fragment
//             if (!completeUrl.includes('?') && !completeUrl.includes('#') && !completeUrl.includes('tel')) {
//                 if (!completeUrl.startsWith('javascript:') && completeUrl.trim() !== '') {
//                     // const completeUrl = new URL(href, baseUrl).href;
//                     Urls.add(completeUrl);
//                 }
//             }
//         }
//     });

//     // logger.crawl(`${url} crawled unfiltered ${JSON.stringify(unfiltered)}`)
//     // logger.crawl(`${url} crawled filtered ${JSON.stringify(Array.from(Urls))}`)

//     // return Array.from(Urls);
    
// }