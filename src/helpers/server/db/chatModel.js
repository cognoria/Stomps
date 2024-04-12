import mongoose from 'mongoose';
import { ChatAnswerFeedback } from '../../enums';

const Schema = mongoose.Schema;

export default function chatModel() {
    const msg = new Schema({
        role: { type: String, required: true },
        content: { type: String, required: true },
        feedback: { type: String, enum: ChatAnswerFeedback }
    }, { _id: false, timestamps: true });

    const schema = new Schema({
        chatbot: { type: mongoose.Schema.Types.ObjectId, ref: 'Chatbot', required: true, },
        userData: { type: mongoose.Schema.Types.Mixed, required: true, },
        messages: [msg],
        isUnread: { type: Boolean, default: false }
    }, { timestamps: true });

    return mongoose.models.Chat || mongoose.model('Chat', schema);
}