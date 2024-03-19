import { db } from "../db";
import { getContext } from "../../AI/context";
import { getChatCompletion } from "../../AI/embeddings";
import { KnowledgebaseStatus } from "../../enums";

const Chatbot = db.Chatbot;

export const chatRepo = {
    getChatResponse
}

async function getChatResponse(chatbotId, messages) {
    const chatbot = Chatbot.findById(chatbotId).select("+chatBotCustomizeData");
    if (!chatbot) throw 'chatbot not found';
    if(chatbot.status != KnowledgebaseStatus.READY) throw 'chatbot not ready yet'

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