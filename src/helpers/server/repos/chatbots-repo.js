import { Crawler } from "../../AI/newCrwler";
import seed from "../../AI/seed";
import { KnowledgebaseStatus, chatBotCustomizeDataDefault } from "../../enums";
import { db } from "../db";
import { createPinconeIndex, deletePinconeIndex } from "../../AI/pinecone";
import { headers } from "next/headers";
import generateRandomString, { generateName } from "../../generaterandomString";

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

    const user = await User.findById(ownerId)
    if (!user) throw `User not found.`;

    // validate name
    // if (await Chatbot.findOne({ name: params.name })) {
    //     throw 'Chatbot with name "' + params.name + '"  already exist';
    // }

    //doing this because name input wasn't specified in the design.
    let chatbotName;
    let isNameUnique = false;

    // Loop until a unique chatbot name is found
    while (!isNameUnique) {
        chatbotName = generateName();
        const existingChatbot = await Chatbot.findOne({ name: chatbotName });

        if (!existingChatbot) {
            isNameUnique = true;
        }
    }

    //generate random index name
    const indexName = `${chatbotName}-${generateRandomString(6)}-index`

    //create pinecone index
    await createPinconeIndex(indexName)

    const newChatbotDetails = {
        name: chatbotName,
        owner: ownerId,
        pIndex: indexName,
        knowledgebase: {
            urls: params.urls,
            exclude: params.exclude,
            include: params.include,
            website: params.website,
            contents: params.contents
        },
        chatBotCustomizeData: chatBotCustomizeDataDefault
    }

    const newChatbot = await Chatbot.create(newChatbotDetails);

    return newChatbot;
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
    const chatbot = await Chatbot.findById(id).select(" +chatBotCustomizeData owner visibility status name").lean();
    if (!chatbot) throw 'Chatbot with id "' + id + '"  not found';

    const owner = headers().get('userId');
    if (chatbot.owner != owner) throw 'You do not own this chatbot'

    return chatbot;
}

async function getByName(name) {
    const ownerId = headers().get('userId');
    const chatbot = await Chatbot.findOne({ owner: ownerId, name }).lean()
    if (!chatbot) throw 'Chatbot with name "' + name + '"  not found';
    return chatbot
}

async function getAllUserBot() {
    const ownerId = headers().get('userId');
    return await Chatbot.find({ owner: ownerId }).sort({ timestamp: -1 }).lean()
}

async function getAllNewBot() {
    return await Chatbot.find({ status: KnowledgebaseStatus.CREATED }).sort({ timestamp: -1 }).lean()
}

async function _delete(id) {
    try {
        const chatbot = await Chatbot.findById(id).lean();
        if (!chatbot) throw `chatbot not found`;

        //delete pincone index
        await deletePinconeIndex(chatbot.pIndex)
        await chatbot.findByIdAndDelete(id)

        return true
    } catch (error) {
        // Handle any errors that occurred during the deletion process
        console.error('Error deleting chatbot:', error);
        throw error;
    }
}
