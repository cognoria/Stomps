import { db } from '../db';

const Leads = db.Lead
const Chatbot = db.Chatbot;

export const leadRepo = {
    saveLead,
    getLeads
}

/**
 * 
 * @param {String} chatbotId 
 * @param {Object} leadData {name?, email?, phone?}
 * @returns 
 */
async function saveLead(chatbotId, leadData) {
    const chatbot = await Chatbot.findById(chatbotId).lean();
    if (!chatbot) throw 'Chatbot with id "' + id + '"  not found';

    try {
        return await Leads.create({ chatbot: chatbot._id, ...leadData })
    } catch (e) {
        throw e;
    }
}

async function getLeads(chatbotId) {
    const chatbot = await Chatbot.findById(chatbotId).lean();
    if (!chatbot) throw 'Chatbot with id "' + id + '"  not found';

    return await Leads.find({ chatbot: chatbot._id }).sort({ timestamp: -1 });
}