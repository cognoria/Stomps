import { Crawler } from "../../AI/newCrwler";
import seed from "../../AI/seed";
import { KnowledgebaseStatus } from "../../enums";
import { db } from "../db";
import { createPinconeIndex } from "../../AI/pinecone";
import { headers } from "next/headers";

const User = db.User;
const Chatbot = db.Chatbot;

export const chatbotRepo = {
    create,
    update,
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
    const indexName = `${params.name.toLowerCase()}-${generateRandomString(6)}-index`
    
    await createPinconeIndex(indexName)

    params.pIndex = indexName;
    params.owner = ownerId;

    const newchatbot = await Chatbot.create(params)
    return newchatbot;
}

async function trainChatbot(chatbotId) {
    const chatbot = Chatbot.findById(chatbotId);

    if (!chatbot) throw 'Chatbot not found';

    const crawler = new Crawler(chatbot.id)

    const crawlPages = new Promise(async (resolve, reject) => {
        try {
            await crawler.crawl();
            resolve('Crawl completed successfully');
        } catch (error) {
            chatbot.status = KnowledgebaseStatus.CRAWL_ERROR;
            await chatbot.save()

            reject(`Crawl failed: ${error.message}`);
        }
    });
    
    await crawlPages;

    const seedAndEmbbed = seed(chatbot.id)

}

async function update(id, params) {
    const ownerId = headers().get('userId');
    const chatbot = await Chatbot.findById(id);

    // validate
    if (!chatbot) throw 'chatbot not found';
    if (chatbot.name !== params.name && await Chatbot.findOne({ name: params.name, owner: ownerId })) {
        throw 'Chatbot with name "' + params.name + '" is already exist';
    }

    // copy params properties to chatbot
    Object.assign(chatbot, params);

    await chatbot.save();
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
    return await Chatbot.find({ status: KnowledgebaseStatus.CRAWLED }).sort({ timestamp: -1 })
}

async function _delete(id) {
    return await Chatbot.findByIdAndRemove(id);
}

function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}