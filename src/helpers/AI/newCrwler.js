import cheerio from "cheerio";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { db } from '../server/db';
import { KnowledgebaseStatus } from "../enums";

const Chatbot = db.Chatbot;

export class Crawler {
    constructor(chatbotId) {
        this.chatbotId = chatbotId;
        this.chatbot = null;
        this._seen = new Set();
        this._queue = [];
        this._maxDepth = 5;
        this._maxPages = 100;
        this.chatbot;
        this._includePatterns;
        this._excludePatterns;
    }

    async _loadChatbotData() {
        this.chatbot = await Chatbot.findById(this.chatbotId).select("+crawlData knowledgebase");

        if (!this.chatbot || !this.chatbot.knowledgebase) {
            throw 'Chatbot or knowledgebase not found';
        }

        // Ensure crawlData is initialized
        if (!this.chatbot.crawlData) {
            this.chatbot.crawlData = { pagesContent: [], crawledUrls: [], queue: [] };
        } else {
            // Ensure sub-properties are initialized
            this.chatbot.crawlData.pagesContent ??= [];
            this.chatbot.crawlData.crawledUrls ??= [];
            this.chatbot.crawlData.queue ??= [];
        }

        // Setup crawler options based on knowledgebase settings
        this._maxPages = this.chatbot.knowledgebase.maxPages || 100;
        this._includePatterns = this.chatbot.knowledgebase.include.map(pattern => new RegExp(pattern, 'i'));
        this._excludePatterns = this.chatbot.knowledgebase.exclude.map(pattern => new RegExp(pattern, 'i'));

        // Initialize queue with starting URLs
        this.chatbot.knowledgebase.urls.forEach(url => this._addToQueue(url));
    }

    async crawl() {
        await this._loadChatbotData(); // Load chatbot data

        await Chatbot.findByIdAndUpdate(this.chatbotId, { status: KnowledgebaseStatus.CRAWLING });

        while (this._queue.length > 0 && this.chatbot.crawlData.pagesContent.length < this._maxPages) {
            const { url, depth } = this._queue.shift();

            if (depth > this._maxDepth || this._seen.has(url)) continue;

            this._seen.add(url);
            const html = await this._fetchPage(url);

            // Parse and store the page content
            const content = this._parseHtml(html);
            await this._storeCrawlData(url, content);

            // Extract and queue new URLs
            this._extractUrls(html, url).forEach(newUrl => {
                if (this._shouldIncludeUrl(newUrl)) {
                    this._addToQueue(newUrl, depth + 1);
                }
            });
        }

        console.log("Crawling completed")
        return await Chatbot.findByIdAndUpdate(this.chatbotId, { status: KnowledgebaseStatus.CRAWLED });
    }

    _addToQueue(url, depth = 0) {
        if (!this._seen.has(url)) {
            this._queue.push({ url, depth });
        }
    }

    _shouldIncludeUrl(url) {
        const isExcluded = this._excludePatterns.some(pattern => pattern.test(url));
        const isIncluded = this._includePatterns.some(pattern => pattern.test(url));
        return isIncluded && !isExcluded;
    }

    async _fetchPage(url) {
        console.log(`Fetching: ${url}`);
        try {
            const response = await fetch(url); // Ensure 'fetch' is available or use a node-fetch package
            return await response.text();
        } catch (error) {
            console.error(`Failed to fetch ${url}: ${error}`);
            return '';
        }
    }

    _parseHtml(html) {
        const $ = cheerio.load(html);
        $("a").removeAttr("href");
        return NodeHtmlMarkdown.translate($.html());
    }

    async _storeCrawlData(url, content) {
        // Avoid duplicate URLs in crawledUrls
        if (!this.chatbot.crawlData.crawledUrls.includes(url)) {
            this.chatbot.crawlData.crawledUrls.push(url);
        }

        const isUnique = this.chatbot.crawlData.pagesContent.every(entry => entry.url !== url && entry.content !== content);
        if (isUnique) {
            // Push new page content
            this.chatbot.crawlData.pagesContent.push({ url, content });
        }

        await this.chatbot.save();
    }

    _extractUrls(html, url) {
        const $ = cheerio.load(html);
        const uniqueUrls = new Set();

        $('a[target="_blank"], a').each((_, element) => {
            const href = $(element).attr('href');
            let completeUrl;
            try {
                completeUrl = new URL(href, url).href;
            } catch (e) {
                // if (href.startsWith('//')) {
                //     completeUrl = new URL(`https:${href}`, baseUrl).href;
                // } else {
                //     console.error(`Skipping invalid URL: ${href}`);
                //     return;
                // }
                console.error(`Skipping invalid URL: ${href}`);
            }
            if (completeUrl && !/^(https?:\/\/|\/\/|#|.*\.(png|jpg|jpeg|gif|svg))$/i.test(completeUrl)) {
                // Check if the URL has a query parameter or a hash fragment
                if (!completeUrl.includes('?') && !completeUrl.includes('#') && !completeUrl.includes('tel')) {
                    if (!completeUrl.startsWith('javascript:') && completeUrl.trim() !== '') {
                        // const completeUrl = new URL(href, baseUrl).href;
                        uniqueUrls.add(completeUrl);
                    }
                }
            }
        });

        return Array.from(uniqueUrls);
    }
}
