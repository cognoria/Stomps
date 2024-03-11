import cheerio from "cheerio";
import { NodeHtmlMarkdown } from "node-html-markdown";

export class Crawler {
  constructor(options) {
    this._seen = new Set();
    this._pages = [];
    this._queue = [];
    this._maxDepth = 5; // Default value
    this._maxPages = options.maxPages || 100; // Default value
    this._includePatterns = options.include.map(pattern => new RegExp(pattern, 'i'));
    this._excludePatterns = options.exclude.map(pattern => new RegExp(pattern, 'i'));

    // Add the start URLs to the queue
    options.urls.forEach(url => this._addToQueue(url));
  }

  async crawl() {
    console.log("Crawl started");
    // While there are URLs in the queue and we haven't reached the maximum number of pages...
    while (this._shouldContinueCrawling()) {
      // Dequeue the next URL and depth
      const { url, depth } = this._queue.shift();

      // If the depth is too great or we've already seen this URL, skip it
      if (this._isTooDeep(depth) || this._isAlreadySeen(url)) continue;

      // Add the URL to the set of seen URLs
      this._seen.add(url);

      // Fetch the page HTML
      const html = await this._fetchPage(url);

      // Parse the HTML and add the page to the list of crawled pages
      this._pages.push({ url, content: this._parseHtml(html) });

      // Extract new URLs from the page HTML and add them to the queue
      this._addNewUrlsToQueue(this._extractUrls(html, url), depth);
    }

    // Return the list of crawled pages
    return this._pages;
  }

  _isTooDeep(depth) {
    return depth > this._maxDepth;
  }

  _isAlreadySeen(url) {
    return this._seen.has(url);
  }

  _shouldContinueCrawling() {
    return this._queue.length > 0 && this._pages.length < this._maxPages;
  }

  _addToQueue(url, depth = 0) {
    // Check if URL matches include patterns and doesn't match exclude patterns
    const shouldInclude = this._includePatterns.some(pattern => pattern.test(url));
    const shouldExclude = this._excludePatterns.some(pattern => pattern.test(url));

    if (shouldInclude && !shouldExclude) {
      this._queue.push({ url, depth });
    }
  }

  _addNewUrlsToQueue(urls, depth) {
    urls.forEach((url) => {
      this._addToQueue(url, depth + 1);
    });
  }

  async _fetchPage(url) {
    console.log("fetching ", url);
    try {
      const response = await fetch(url);
      const contentType = response.headers.get("content-type");

      console.log("content type: ", contentType);
      if (contentType && contentType.includes("pdf")) {
        console.log("a pdf was found");
        // Custom handling for PDF content could be added here
      }

      return await response.text();
    } catch (error) {
      console.error(`Failed to fetch ${url}: ${error}`);
      return "";
    }
  }

  _parseHtml(html) {
    // Assuming cheerio and NodeHtmlMarkdown are available in your environment
    const $ = cheerio.load(html);
    $("a").removeAttr("href");
    return NodeHtmlMarkdown.translate($.html());
  }

  _extractUrls(html, baseUrl) {
    const $ = cheerio.load(html);
    const relativeUrls = $("a")
      .map((_, link) => $(link).attr("href"))
      .get();
    return relativeUrls.map((relativeUrl) => new URL(relativeUrl, baseUrl).href);
  }
}

