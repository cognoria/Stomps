import { db } from "../db";
import { getContext } from "../../AI/context";
import { getChatCompletion } from "../../AI/openai";
import { KnowledgebaseStatus } from "../../enums";
import { headers } from "next/headers";

const Chatbot = db.Chatbot;
const Chat = db.Chat;

export const chatRepo = {
    createSession,
    getChatsPerDay,
    getChatResponse,
    getChatsPerCountry
}

async function createSession(chatbotId, params){
    //create chat session, return sessionId

}

//get Session messages
//get All sessions (for analytics page)
//

async function getChatResponse(messages, chatbotId) {
    const chatbot = await Chatbot.findById(chatbotId)
        .select("+chatBotCustomizeData pIndex status visibility owner")
        .lean();

    if (!chatbot) throw 'chatbot not found';
    if (chatbot.status != KnowledgebaseStatus.READY) throw 'chatbot not ready yet'

    const owner = headers().get('userId');
    if (chatbot.visibility != "PUBLIC" && chatbot.owner != owner) throw 'chatbot is private'

    const lastMessage = messages[messages.length - 1]

    // Get the context from the last message
    const context = await getContext(lastMessage.content, chatbot.pIndex, '')
    const prompt = [
        {
            role: `system`,
            content: `${chatbot.chatBotCustomizeData.prompt}
            START CONTEXT BLOCK
            ${context}
            END OF CONTEXT BLOCK
            `
        }
    ]

    const message = [...prompt, ...messages.filter((msg) => msg.role === 'user')]
    return await getChatCompletion(message, chatbot.chatBotCustomizeData.model)
}

async function getChatsPerDay(chatbotId) {
    const chatsPerDay = await Chat.aggregate([
        {
            $match: { chatbot: mongoose.Types.ObjectId(chatbotId) }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);
    return chatsPerDay.map(item => ({ date: item._id, count: item.count }));
}

async function getChatsPerCountry(chatbotId) {
    const chatsPerCountry = await Chat.aggregate([
        {
            $match: { chatbot: mongoose.Types.ObjectId(chatbotId) }
        },
        {
            $group: {
                _id: "$userData.country",
                count: { $sum: 1 }
            }
        }
    ]);
    return chatsPerCountry.map(item => ({ country: item._id, count: item.count }));
}
