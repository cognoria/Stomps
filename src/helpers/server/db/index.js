import mongoose from 'mongoose';
import userModel from './userModel';
import tokenModel from './tokenModel';
import logModel from './logModel';
import emailModel from './emailModel';
import chatbotModel from './chatbotModel';
import globalModel from './globalSettingModel';
import chatModel from './chatModel';
import leadModel from './leadModel';

const dbUrl = process.env.MONGODB_URI;
mongoose.connect(dbUrl);
console.log({dbUrl})

export const db = {
    Log: logModel(),
    User: userModel(),
    Chat: chatModel(),
    Lead: leadModel(),
    Token: tokenModel(),
    Email: emailModel(),
    Global: globalModel(),
    Chatbot: chatbotModel(),
};
