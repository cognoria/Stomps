import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export default function chatbotModel() {
    const knowledgebase = new Schema({
        websiteUrl: {type: String},
        urls: {type: [String],  },
        include: {type: [String],  },
        exclude: {type: [String],  },
    }, {_id: false})

    const schema = new Schema({
        name: { type: String, required: true},
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        pIndex: { type: String, required: true },
        model: { type: String, required: true},
        status: {type: String},
        visibility: {type: String},
        prompt: { type: String},
        knowledgebase: knowledgebase
    }, { timestamps: true});

    return mongoose.models.Chatbot || mongoose.model('Chatbot', schema);
}