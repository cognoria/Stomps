import { db } from "../db";
import { getContext } from "../../AI/context";
import { getChatCompletion } from "../../AI/openai";
import { KnowledgebaseStatus } from "../../enums";
import { headers, cookies } from "next/headers";
import mongoose from "mongoose";

const Chatbot = db.Chatbot;
const Chats = db.Chat;
const Leads = db.Lead;

export const chatRepo = {
    saveLead,
    getChatsPerDay,
    getChatbotLeads,
    getChatbotChats,
    getChatResponse,
    widgetChatResponse,
    getChatsPerCountry,
}
//ipinfo.io/197.210.85.228?token=b86003eb422d82
// async function widgetChatResponse(chatbotId, params) {
//     const sessionId = cookies().get(`chat-session-${chatbotId}`)?.value;

//     let userChatSession = await Chats.findById(sessionId)

//     if (!sessionId || !userChatSession) {
//         if (!chatbotId || chatbotId === 'undefined') throw "chatbotId is requeired to create a session"
//         // if (!params.userData) throw "user data is required to create a session"
//         const userIp = headers().get('X-Forwarded-For')
//         const IPINFO_TOKEN = process.env.IPINFO_TOKEN;

//         if(IPINFO_TOKEN){
//             const res = fetch(`https://ipinfo.io/${userIp}?token=${IPINFO_TOKEN}`)
//             console.log({newUserData})
//             if(res.Ok){
//                 const data = await res.json();
//                 userChatSession = await Chats.create({ chatbot: chatbotId, userData: { ...data } })
//             } else {
//                 userChatSession = await Chats.create({ chatbot: chatbotId, userData: { ip: userIp } })
//             }
//         } else {
//             userChatSession = await Chats.create({ chatbot: chatbotId, userData: { ip: userIp } })
//         }
//         //user data should include IP, user device
//         // userChatSession = await Chats.create({ chatbot: chatbotId, userData: { ...params.userData } })
//         cookies().set(`chat-session-${chatbotId}`, userChatSession.id)
//     }

//     //create chat session, return sessionId
//     const chatbot = await Chatbot.findById(userChatSession.chatbot)
//         .select("+chatBotCustomizeData pIndex status visibility owner")
//         .lean();;

//     if (!chatbot) throw `Chatbot not found`;
//     if (chatbot.status != KnowledgebaseStatus.READY) throw 'chatbot not ready yet'

//     if (chatbot.visibility != "PUBLIC") throw 'chatbot is private'

//     const lastMessage = params.messages[params.messages.length - 1];
//     userChatSession.messages.push(lastMessage)

//     // Get the context from the last message
//     const context = await getContext(lastMessage.content, chatbot.pIndex, chatbot.owner, '')
//     const prompt = [
//         {
//             role: `system`,
//             content: `${chatbot.chatBotCustomizeData.prompt}
//             As an assistant, your responses will be based only on the given data.
//             Your answer must be short and concise.
//             Your answers must be in markdown.
//             START CONTEXT BLOCK
//             ${context}
//             END OF CONTEXT BLOCK
//             Remember to not provide any additional information or answer from outside the given data. 
//             If you can't answer from the given data reply with predefined message \"${chatbot.chatBotCustomizeData.defaultAnswer}\"
//             `
//         }
//     ]

//     const message = [...prompt, ...params.messages.filter((msg) => msg.role === 'user')]
//     const response = await getChatCompletion(message, chatbot.chatBotCustomizeData.model, chatbot.owner)

//     userChatSession.messages.push(response)
//     await userChatSession.save()

//     return response
// }
async function widgetChatResponse(chatbotId, params) {
    let userChatSession = await getChatSession(chatbotId, params);
    const chatbot = await getChatbot(userChatSession.chatbot);
    checkChatbotStatus(chatbot);

    const lastMessage = params.messages[params.messages.length - 1];
    userChatSession.messages.push(lastMessage);

    const context = await getContext(lastMessage.content, chatbot.pIndex, chatbot.owner, '');
    const prompt = generatePrompt(chatbot.chatBotCustomizeData.prompt, context, chatbot.chatBotCustomizeData.defaultAnswer);
    const message = [...prompt, ...params.messages.filter((msg) => msg.role === 'user')];
    const response = await getChatCompletion(message, chatbot.chatBotCustomizeData.model, chatbot.owner);
    userChatSession.messages.push(response);
    await userChatSession.save();
    return response;
}


async function saveLead(chatbotId, params) {
    //perform save lead action
    if (!chatbotId || chatbotId === 'undefined') throw 'invalid chatbot Id';
    const chatbot = await Chatbot.findById(id).lean();

    if (!chatbot) throw `Chatbot with id "${id}" not found`;
    await Leads.create({ chatbot: chatbotId, Name: params.name, Email: params.email, Phone: params.phone })

    return { message: "your response has been stored. we'd reach out to you" }
}

async function getChatResponse(messages, chatbotId) {
    const chatbot = await getChatbot(chatbotId);
    const owner = headers().get('userId');

    checkChatbotStatus(chatbot, owner);
    const lastMessage = messages[messages.length - 1]

    // Get the context from the last message
    const context = await getContext(lastMessage.content, chatbot.pIndex, chatbot.owner, '')
    const prompt = generatePrompt(chatbot.chatBotCustomizeData.prompt, context, chatbot.chatBotCustomizeData.defaultAnswer);

    const message = [...prompt, ...messages.filter((msg) => msg.role === 'user')]
    return await getChatCompletion(message, chatbot.chatBotCustomizeData.model, chatbot.owner)
}

async function getChatsPerDay(chatbotId) {
    const chatsPerDay = await Chats.aggregate([
        {
            $match: { chatbot: new mongoose.Types.ObjectId(chatbotId) }
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


async function getChatbotLeads(chatbotId) {
    return await Leads.find({ chatbot: chatbotId }).lean()
}


async function getChatbotChats(chatbotId) {
    return await Chats.find({ chatbot: chatbotId }).lean()
}

async function getChatsPerCountry(chatbotId) {
    const chatsPerCountry = await Chats.aggregate([
        {
            $match: { chatbot: new mongoose.Types.ObjectId(chatbotId) }
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

async function getChatSession(chatbotId, params) {
    const sessionId = cookies().get(`chat-session-${chatbotId}`)?.value;
    let userChatSession = await Chats.findById(sessionId);
    if (!sessionId || !userChatSession) {
        userChatSession = await createChatSession(chatbotId, params);
    }
    return userChatSession;
}

async function createChatSession(chatbotId, params) {
    if (!chatbotId || chatbotId === 'undefined') throw "chatbotId is required to create a session";
    const userIp = headers().get('X-Forwarded-For');
    const IPINFO_TOKEN = process.env.IPINFO_TOKEN;
    let userData;
    if (IPINFO_TOKEN) {
        const res = await fetch(`https://ipinfo.io/${userIp}?token=${IPINFO_TOKEN}`);
        if (res.ok) {
            const data = await res.json();
            console.log("user session data: ", data)
            userData = { ...data };
        } else {
            userData = { ip: userIp };
        }
    } else {
        userData = { ip: userIp };
    }
    const userChatSession = await Chats.create({ chatbot: chatbotId, userData });
    cookies().set(`chat-session-${chatbotId}`, userChatSession.id);
    return userChatSession;
}

async function getChatbot(chatbotId) {
    const chatbot = await Chatbot.findById(chatbotId)
        .select("+chatBotCustomizeData pIndex status visibility owner");
    if (!chatbot) throw `Chatbot not found`;
    return chatbot;
}

function checkChatbotStatus(chatbot, owner) {
    if (chatbot.status !== KnowledgebaseStatus.READY) throw 'chatbot not ready yet';

    if (chatbot.visibility !== "PUBLIC") {
        if (chatbot.owner.toString() === owner.toString()) {
            // Owner can access the chatbot even if it's not public
            return;
        } else {
            throw 'chatbot is private';
        }
    }
}

function generatePrompt(prompt, context, defaultAnswer) {
    return [
        {
            role: `system`,
            content: `${prompt} 
            As an assistant, your responses will be based only on the given data.
            START CONTEXT BLOCK 
            ${context}
            END OF CONTEXT BLOCK
            Remember to not provide any additional information or answer from outside the given data. 
            If you can't answer from the given data reply with predefined message "${defaultAnswer}"
            Your answer should be short and concise.
            Your answers should be in markdown when neccesary.
            `
        }
    ];
}

