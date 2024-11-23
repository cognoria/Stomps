import mongoose from 'mongoose';
import userModel from './userModel';
import tokenModel from './tokenModel';
import logModel from './logModel';
import emailModel from './emailModel';
import chatbotModel from './chatbotModel';
import globalModel from './globalSettingModel';
import chatModel from './chatModel';
import leadModel from './leadModel';

const connectDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/stomps_app';

    // Add retry logic
    const connectWithRetry = async () => {
        try {
            await mongoose.connect(MONGODB_URI, {
                serverSelectionTimeoutMS: 5000,
                retryWrites: true,
            });
            console.log('MongoDB connected successfully');
        } catch (err) {
            console.error('MongoDB connection error:', err);
            console.log('Retrying in 5 seconds...');
            await new Promise(resolve => setTimeout(resolve, 5000));
            return connectWithRetry();
        }
    };

    await connectWithRetry();
};

connectDB();

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