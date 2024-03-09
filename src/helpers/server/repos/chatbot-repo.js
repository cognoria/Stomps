import { db } from "../db";
import { Pinecone } from '@pinecone-database/pinecone'

const User = db.User;
const Chatbot =db.Chatbot;

export const chatbotRepo = {
    createChatbot
}

async function createChatbot(params){
    const ownerId = headers().get('userId');

    // validate
    if (await Chatbot.findOne({ name: params.name })) {
        throw 'Chatbot with name "' + params.name + '"  already exist';
    }

    // const chatbot = new Chatbot({})
}