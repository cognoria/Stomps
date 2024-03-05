import mongoose from 'mongoose';
import userModel from './userModel';
import tokenModel from './tokenModel';
import logModel from './logModel';
import emailModel from './emailModel';

const dbUrl ='mongodb+srv://stomps0:Stomps0Password@stomps0.wwwzweb.mongodb.net/app'
mongoose.connect(dbUrl);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel(),
    Token: tokenModel(),
    Email:  emailModel(),
    Log: logModel(),
};

