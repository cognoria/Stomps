import { db } from "../db";
import { getContext } from "../../AI/context";
import { getChatCompletion } from "../../AI/openai";
import { KnowledgebaseStatus } from "../../enums";
import { headers } from "next/headers";

const Chatbot = db.Chatbot;

export const chatRepo = {
    getChatResponse
}

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
