import mongoose from 'mongoose';
import userModel from './userModel';
import tokenModel from './tokenModel';
import logModel from './logModel';

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel(),
    Token: tokenModel(),
    Log: logModel()
};

// mongoose models with schema definitions

