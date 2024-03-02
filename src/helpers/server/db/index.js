import mongoose from 'mongoose';
import userModel from './userModel';
import tokenModel from './tokenModel';
import logModel from './logModel';

const dbUrl ='mongodb+srv://stomps0:Stomps0Password@stomps0.wwwzweb.mongodb.net/Stomp_App'
mongoose.connect(dbUrl);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel(),
    Token: tokenModel(),
    Log: logModel()
};

// mongoose models with schema definitions

