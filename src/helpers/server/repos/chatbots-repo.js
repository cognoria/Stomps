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
    
    await crawlPages;

   const sm = await seed(chatbotId)
    return sm
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
    return await Chatbot.find({ status: KnowledgebaseStatus.CREATED }).sort({ timestamp: -1 })
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