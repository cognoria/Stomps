import { db } from "../db";
import { Pinecone } from '@pinecone-database/pinecone'

const User = db.User;
const Chatbot = db.Chatbot;

export const chatbots = {
    create,
    update,
    getById,
    getByName,
    getAllUserBot,
    delete: _delete,
}

async function create(params) {
    const ownerId = headers().get('userId');

    // validate
    if (await Chatbot.findOne({ name: params.name })) {
        throw 'Chatbot with name "' + params.name + '"  already exist';
    }

    // const chatbot = new Chatbot({})
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

async function _delete(id) {
    return await Chatbot.findByIdAndRemove(id);
}
