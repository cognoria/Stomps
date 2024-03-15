import mongoose from 'mongoose';
import userModel from './userModel';
import tokenModel from './tokenModel';
import logModel from './logModel';
import emailModel from './emailModel';
import chatbotModel from './chatbotModel';
import globalModel from './globalSettingModel';

const dbUrl = 'mongodb+srv://stomps0:Stomps0Password@stomps0.wwwzweb.mongodb.net/stomp_app'
mongoose.connect(dbUrl);

export const db = {
    Log: logModel(),
    User: userModel(),
    Email: emailModel(),
    Token: tokenModel(),
    Global: globalModel(),
    Chatbot: chatbotModel(),
};
