import { Crawler } from "../../AI/newCrwler";
import seed from "../../AI/seed";
import { KnowledgebaseStatus } from "../../enums";
import { db } from "../db";
import { createPinconeIndex } from "../../AI/pinecone";
import { headers } from "next/headers";
import generateRandomString from "../../generaterandomString";

const User = db.User;
const Chatbot = db.Chatbot;

export const chatbotRepo = {
    create,
    getById,
    getByName,
    getAllNewBot,
    trainChatbot,
    getAllUserBot,
    delete: _delete,
}

async function create(params) {
    const ownerId = headers().get('userId');

    // validate
    if (await Chatbot.findOne({ name: params.name })) {
        throw 'Chatbot with name "' + params.name + '"  already exist';
    }

    //generate random index name
    const indexName = `${params.name.toLowerCase()}-${generateRandomString(6)}-index`

    //create pinecone index
    await createPinconeIndex(indexName)

    const newChatbotDetails = {
        name: params.name,
        owner: ownerId,
        pIndex: indexName,
        knowledgebase: {
            urls: params.urls,
            exclude: params.exclude,
            include: params.include,
            website: params.website,
            filePaths: params.filePaths
        }
    }

    return await Chatbot.create(newChatbotDetails);
}

async function trainChatbot(chatbotId) {
    const crawler = new Crawler(chatbotId)

    const crawlPages = new Promise(async (resolve, reject) => {
        try {
            await crawler.crawl();
            resolve('Crawl completed successfully');
        } catch (error) {
            await Chatbot.findByIdAndUpdate(chatbotId, { status: KnowledgebaseStatus.CRAWL_ERROR });
            console.log(error)
            reject(`Crawl failed: ${error.message}`);
        }
    });
    //crawl the webpages
    await crawlPages;

    //seed websontents into pinecone vector db
    return await seed(chatbotId)
}

async function getById(id) {
    return await Chatbot.findById(id);
}

async function getByName(name) {
    const ownerId = headers().get('userId');
    return await Chatbot.findOne({ owner: ownerId, name })
}

async function getAllUserBot() {
    const ownerId = headers().get('userId');
    return await Chatbot.find({ owner: ownerId }).sort({ timestamp: -1 })
}

async function getAllNewBot() {
    return await Chatbot.find({ status: KnowledgebaseStatus.CREATED }).sort({ timestamp: -1 })
}

async function _delete(id) {
    return await Chatbot.findByIdAndDelete(id);
}
