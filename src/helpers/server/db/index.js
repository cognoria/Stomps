import mongoose from 'mongoose';
import userModel from './userModel';
import tokenModel from './tokenModel';
import logModel from './logModel';
import emailModel from './emailModel';
import chatbotModel from './chatbotModel';

const dbUrl ='mongodb+srv://stomps0:Stomps0Password@stomps0.wwwzweb.mongodb.net/app'
mongoose.connect(dbUrl);

export const db = {
    Log: logModel(),
    User: userModel(),
    Token: tokenModel(),
    Email:  emailModel(),
    Chatbot: chatbotModel(),
};
