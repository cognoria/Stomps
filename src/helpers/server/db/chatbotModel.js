import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default function chatbotModel() {
    const schema = new Schema({
        botId: { type: String, unique: true, required: true },
        pIndex: { type: String, required: true },
        model: { type: String, required: true}
    }, { timestamps: true});

    return mongoose.models.Chatbot || mongoose.model('Chatbot', schema);
}