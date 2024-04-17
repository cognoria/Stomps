import { Crawler } from "../../AI/newCrwler";
import seed from "../../AI/seed";
import { db } from "../db";
import { AppServiceProviders, KnowledgebaseStatus, chatBotCustomizeDataDefault } from "../../enums";
import { createPinconeIndex, deletePinconeIndex } from "../../AI/pinecone";
import { headers } from "next/headers";
import generateRandomString, { generateName } from "../../generaterandomString";
import { globalRepo } from "./global-repo";
import { trainChatbotQueue } from "../addJob";

// Add a job to the queue
// queue.add({ data: 'your job data here' });
const User = db.User;
const Chatbot = db.Chatbot;

export const chatbotRepo = {
    create,
    getById,
    getByName,
    setPublic,
    updateName,
    getAllNewBot,
    trainChatbot,
    getAllUserBot,
    updateLeadInfo,
    delete: _delete,
    updateModelData,
    getChatbotSources,
    updateSecurityData,
    getChatbotInterface,
    updateChatInterface,
    updateKnowledgebase,
}

async function create(params) {
    const ownerId = headers().get('userId');

    const user = await User.findById(ownerId).select('+services')
    if (!user) throw `User not found.`;

    //check user has added api keys
    if (!(await globalRepo.isKeys())) throw 'Please add Api keys first';

    // Get the Pinecone service object
    const pineconeService = await globalRepo.getService(AppServiceProviders.PINECONE, ownerId);
    if (!pineconeService) {
        throw 'Pinecone key not found';
    }

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
    await createPinconeIndex(indexName, 'starter', ownerId)

    const newChatbotDetails = {
        name: chatbotName,
        owner: ownerId,
        pIndex: indexName,
        pineconeKeyId: pineconeService._id,
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

    await trainChatbotQueue.add("trainChatbot", { chatbotId: newChatbot._id })

    return newChatbot;
}

async function trainChatbot(chatbotId) {
    if (!chatbotId || chatbotId == 'undefined') throw 'Please provide a valid bot id'
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
    if (!id || id === 'undefined') throw 'Please provide a valid bot id';

    const chatbot = await Chatbot.findById(id)
        .select("+chatBotCustomizeData owner visibility status name createdAt updatedAt rateLimiting crawlData.charCount")
        .lean();

    if (!chatbot) throw `Chatbot with id "${id}" not found`;

    const owner = headers().get('userId');
    if (chatbot.owner.toString() !== owner) throw 'You do not own this chatbot';
    return chatbot
}

async function getChatbotSources(id) {
    if (!id || id == 'undefined') throw 'Please provide a valid bot id'
    const chatbot = await Chatbot.findById(id).select("+knowledgebase owner").lean();
    if (!chatbot) throw 'Chatbot with id "' + id + '"  not found';

    const owner = headers().get('userId');
    if (chatbot.owner != owner) throw 'You do not own this chatbot'

    return chatbot;
}

async function getByName(name) {
    const ownerId = headers().get('userId');
    if (!name || name == 'undefined') throw 'Please provide a valid bot name'
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
    if (!id || id == 'undefined') throw 'Please provide a valid bot id'
    try {
        const chatbot = await Chatbot.findById(id).lean();
        if (!chatbot) throw `chatbot not found`;

        //delete pincone index
        await deletePinconeIndex(chatbot.pIndex)
        await Chatbot.findByIdAndDelete(id)

        return { message: "Chatbot deleted" }
    } catch (error) {
        // Handle any errors that occurred during the deletion process
        console.error('Error deleting chatbot:', error);
        throw error;
    }
}


async function setPublic(id) {
    if (!id || id == 'undefined') throw 'Please provide a valid bot id'

    const ownerId = headers().get('userId');
    const chatbot = await Chatbot.findOneAndUpdate({ owner: ownerId, _id: id }, { visibility: 'PUBLIC' })
    if (!chatbot) throw `chatbot not found`;

    return { message: "Chatbot now public" }
}

async function updateName(chatbotId, name) {
    if (!chatbotId || chatbotId == 'undefined') throw 'Please provide a valid bot id'

    const chatbotWname = await await Chatbot.findOne({ name });
    if (chatbotWname) throw 'Chatbot with name "' + name + '"  Already exists'

    const ownerId = headers().get('userId');
    const chatbot = await Chatbot.findOne({ owner: ownerId, _id: chatbotId })
    if (!chatbot) throw 'Chatbot with id "' + chatbotId + '"  not found';

    chatbot.name = name;
    await chatbot.save()

    return { message: "Successfully updated chatbot name" };
}

async function updateModelData(chatbotId, modelData) {
    const ownerId = headers().get('userId');
    if (!chatbotId || chatbotId == 'undefined') throw 'Please provide a valid bot id'
    const chatbot = await Chatbot.findOne({ owner: ownerId, _id: chatbotId }).select("+chatBotCustomizeData ")
    if (!chatbot) throw 'Your Chatbot with id "' + chatbotId + '" not found';

    chatbot.chatBotCustomizeData.prompt = modelData.prompt
    chatbot.chatBotCustomizeData.model = modelData.model
    chatbot.chatBotCustomizeData.temparature = modelData.temparature
    await chatbot.save()

    return { message: "Successfully updated chatbot " };
}

async function updateChatInterface(chatbotId, interfaceData) {
    const ownerId = headers().get('userId');
    if (!chatbotId || chatbotId == 'undefined') throw 'Please provide a valid bot id'
    const chatbot = await Chatbot.findOne({ owner: ownerId, _id: chatbotId }).select("+chatBotCustomizeData ")
    if (!chatbot) throw 'Your Chatbot with id "' + chatbotId + '" not found';

    chatbot.chatBotCustomizeData.welcomeMessage = interfaceData.initialMsg
    chatbot.chatBotCustomizeData.questionExamples = interfaceData.suggestedMsgs
    chatbot.chatBotCustomizeData.chatInputPlaceholderText = interfaceData.msgPlaceholder
    chatbot.chatBotCustomizeData.widgetTheme = interfaceData.theme
    chatbot.chatBotCustomizeData.assistantTabHeader = interfaceData.displayName
    chatbot.chatBotCustomizeData.launcherIcon = interfaceData.chatIcon
    chatbot.chatBotCustomizeData.placement = interfaceData.alignChatButton.toUpperCase()
    chatbot.chatBotCustomizeData.popupDelay = interfaceData.autoShowMsg
    chatbot.chatBotCustomizeData.profileImage = interfaceData.profileImage
    await chatbot.save()

    return { message: "Successfully updated chatbot widget interface" };
}


async function updateSecurityData(chatbotId, securityData) {
    const ownerId = headers().get('userId');
    if (!chatbotId || chatbotId == 'undefined') throw 'Please provide a valid bot id'
    const chatbot = await Chatbot.findOne({ owner: ownerId, _id: chatbotId }).select("+chatBotCustomizeData visibility rateLimiting")
    if (!chatbot) throw 'Your Chatbot with id "' + chatbotId + '" not found';

    chatbot.visibility = securityData.visibility;
    chatbot.rateLimiting.limitMsg = securityData.rateLimit.limitMsg;
    chatbot.rateLimiting.msg_count = securityData.rateLimit.msgCount;
    chatbot.rateLimiting.timeframe = securityData.rateLimit.timeframe;
    chatbot.chatBotCustomizeData.allowPublicDomains = securityData.allowPublicDomains
    await chatbot.save()

    return { message: "Successfully updated chatbot security" };
}

/**
 * 
 * @param {String} chatbotId 
 * @param {Object} leadInfo  {title: String, collectName: Boolean, collectEmail: Boolean, collectPhone: Boolean, }
 * @returns Boolean
 */
async function updateLeadInfo(chatbotId, leadInfo) {
    const ownerId = headers().get('userId');
    if (!chatbotId || chatbotId == 'undefined') throw 'Please provide a valid bot id'
    const chatbot = await Chatbot.findOne({ owner: ownerId, _id: chatbotId }).select("+chatBotCustomizeData ")
    if (!chatbot) throw 'Your Chatbot with id "' + chatbotId + '" not found';

    chatbot.chatBotCustomizeData.leadMsgDescription = leadInfo.title;
    chatbot.chatBotCustomizeData.collectName = leadInfo.collectName;
    chatbot.chatBotCustomizeData.collectEmail = leadInfo.collectEmail;
    chatbot.chatBotCustomizeData.collectPhone = leadInfo.collectPhone;
    await chatbot.save()

    return { message: "Successfully updated Lead informations" };
}


async function updateKnowledgebase(chatbotId, params) {
    const ownerId = headers().get('userId');
    if (!chatbotId || chatbotId == 'undefined') throw 'Please provide a valid bot id'
    const chatbot = await Chatbot.findOne({ owner: ownerId, _id: chatbotId }).select("+knowledgebase ")
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

    params.contents.forEach(content => {
        const existingContent = chatbot.knowledgebase.contents.find(c => c.content === content.content);
        if (!existingContent) {
            chatbot.knowledgebase.contents.push(content);
        }
    });

    await chatbot.save();
    await trainChatbotQueue.add("trainChatbot", { chatbotId: chatbot._id })
    return { message: "successfully updated chatbot knowledgebase" };
}

async function getChatbotInterface(chatbotId) {
    if (!chatbotId || chatbotId == 'undefined') throw 'Please provide a valid bot id'
    const chatbot = await Chatbot.findById(chatbotId).select("+chatBotCustomizeData visibility status").lean()
    if (!chatbot || chatbot.visibility == "PRIVATE") throw "chatbot not found"
    if (chatbot.status != KnowledgebaseStatus.READY) throw "chatbot not ready"
    console.log("chatbot style", chatbot.chatBotCustomizeData)
    return { ...chatbot.chatBotCustomizeData }
}
