import { Crawler } from "../../AI/newCrwler";
import seed from "../../AI/seed";
import { KnowledgebaseStatus, chatBotCustomizeDataDefault } from "../../enums";
import { db } from "../db";
import { createPinconeIndex, deletePinconeIndex } from "../../AI/pinecone";
import { headers } from "next/headers";
import generateRandomString, { generateName } from "../../generaterandomString";
import { globalRepo } from "./global-repo";
const User = db.User;
const Chatbot = db.Chatbot;

export const chatbotRepo = {
    create,
    getById,
    getByName,
    updateName,
    getAllNewBot,
    trainChatbot,
    getAllUserBot,
    updateLeadInfo,
    delete: _delete,
    updateModelData,
    updateSecurityData,
    updateChatInterface,
    updateKnowledgebase,
}

async function create(params) {
    const ownerId = headers().get('userId');

    const user = await User.findById(ownerId)
    if (!user) throw `User not found.`;

    //check user has added api keys
    if (!(await globalRepo.isKeys())) throw 'Please add Api keys first';

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
    const chatbot = await Chatbot.findById(id).select(" +chatBotCustomizeData owner visibility status name createdAt updatedAt").lean();
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
        await Chatbot.findByIdAndDelete(id)

        return true
    } catch (error) {
        // Handle any errors that occurred during the deletion process
        console.error('Error deleting chatbot:', error);
        throw error;
    }
}

async function updateName(chatbotId, name) {
    const chatbotWname = await await Chatbot.findOne({ name });
    if (chatbotWname) throw 'Chatbot with name "' + name + '"  Already exists'

    const ownerId = headers().get('userId');
    const chatbot = await Chatbot.findOne({ owner: ownerId, _id: chatbotId })
    if (!chatbot) throw 'Chatbot with id "' + chatbotId + '"  not found';

    chatbot.name = name;
    await chatbot.save()

    return true;
}

async function updateModelData(chatbotId, modelData) {
    const ownerId = headers().get('userId');
    const chatbot = await Chatbot.findOne({ owner: ownerId, _id: chatbotId })
    if (!chatbot) throw 'Your Chatbot with id "' + chatbotId + '" not found';

    chatbot.chatBotCustomizeData.prompt = modelData.prompt
    chatbot.chatBotCustomizeData.model = modelData.model
    chatbot.chatBotCustomizeData.temparature = modelData.temparature
    await chatbot.save()

    return true;
}

async function updateChatInterface(chatbotId, interfaceData) {
    const ownerId = headers().get('userId');
    const chatbot = await Chatbot.findOne({ owner: ownerId, _id: chatbotId })
    if (!chatbot) throw 'Your Chatbot with id "' + chatbotId + '" not found';

    chatbot.chatBotCustomizeData.welcomeMessage = interfaceData.initialMsg
    chatbot.chatBotCustomizeData.questionExamples = interfaceData.suggestedMsgs
    chatbot.chatBotCustomizeData.chatInputPlaceholderText = interfaceData.msgPlaceholder
    chatbot.chatBotCustomizeData.widgetTheme = interfaceData.theme
    chatbot.chatBotCustomizeData.assistantTabHeader = interfaceData.displayName
    chatbot.chatBotCustomizeData.launcherIcon = interfaceData.chatIcon
    chatbot.chatBotCustomizeData.placement = interfaceData.alignChatButton
    chatbot.chatBotCustomizeData.popupDelay = interfaceData.autoShowMsg
    chatbot.chatBotCustomizeData.profileImage = interfaceData.profileImage
    await chatbot.save()

    return true;
}


async function updateSecurityData(chatbotId, securityData) {
    const ownerId = headers().get('userId');
    const chatbot = await Chatbot.findOne({ owner: ownerId, _id: chatbotId })
    if (!chatbot) throw 'Your Chatbot with id "' + chatbotId + '" not found';

    chatbot.visibility = securityData.visibility;
    chatbot.rateLimiting.limitMsg = securityData.rateLimit.limitMsg;
    chatbot.rateLimiting.msg_count = securityData.rateLimit.msgCount;
    chatbot.rateLimiting.timeframe = securityData.rateLimit.timeframe;
    chatbot.chatBotCustomizeData.allowPublicDomains = securityData.allowPublicDomains
    await chatbot.save()

    return true;
}

/**
 * 
 * @param {String} chatbotId 
 * @param {Object} leadInfo  {title: String, collectName: Boolean, collectEmail: Boolean, collectPhone: Boolean, }
 * @returns Boolean
 */
async function updateLeadInfo(chatbotId, leadInfo) {
    const ownerId = headers().get('userId');
    const chatbot = await Chatbot.findOne({ owner: ownerId, _id: chatbotId })
    if (!chatbot) throw 'Your Chatbot with id "' + chatbotId + '" not found';

    chatbot.chatBotCustomizeData.leadMsgDescription = leadInfo.title;
    chatbot.chatBotCustomizeData.collectName = leadInfo.collectName;
    chatbot.chatBotCustomizeData.collectEmail = leadInfo.collectEmail;
    chatbot.chatBotCustomizeData.collectPhone = leadInfo.collectPhone;
    await chatbot.save()

    return 'Lead informations updated';
}


async function updateKnowledgebase(chatbotId, params) {
    const ownerId = headers().get('userId');

    const chatbot = await Chatbot.findOne({ owner: ownerId, _id: chatbotId })
    if (!chatbot) throw 'Your Chatbot with id "' + chatbotId + '" not found';

    // Function to remove duplicates and merge arrays
    const mergeAndRemoveDuplicates = (existingData, newData) => {
        const mergedData = [...new Set([...existingData, ...newData])];
        return mergedData;
    };

    // Merge and remove duplicates from includes, urls, and contents
    chatbot.knowledgebase.include = mergeAndRemoveDuplicates(chatbot.knowledgebase.include, params.include);
    chatbot.knowledgebase.exclude = mergeAndRemoveDuplicates(chatbot.knowledgebase.exclude, params.exclude);
    chatbot.knowledgebase.urls = mergeAndRemoveDuplicates(chatbot.knowledgebase.urls, params.urls);

    // params.contents.forEach(content => {
    //     const existingContentIndex = chatbot.knowledgebase.contents.findIndex(c => c.url === content.url);
    //     if (existingContentIndex === -1) {
    //         chatbot.knowledgebase.contents.push(content);
    //     } else {
    //         // Replace existing content with new content
    //         chatbot.knowledgebase.contents[existingContentIndex] = content;
    //     }
    // });

    params.contents.forEach(content => {
        const existingContent = chatbot.knowledgebase.contents.find(c => c.content === content.content);
        if (!existingContent) {
            chatbot.knowledgebase.contents.push(content);
        }
    });

    await chatbot.save();
    return chatbot;
}
