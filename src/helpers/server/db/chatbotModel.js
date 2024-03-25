import mongoose from 'mongoose';
import { KnowledgebaseStatus, chatBotCustomizeDataDefault, chatModelEnum } from '../../enums';

const Schema = mongoose.Schema;

const pageSchema = new mongoose.Schema({
    url: String,
    content: String,
}, { _id: false });

const knowledgebase = new Schema({
    website: { type: String },
    urls: [{ type: String }],
    include: [{ type: String }],
    exclude: [{ type: String }],
    contents: [pageSchema]
}, { _id: false })

const crawlData = new Schema({
    pagesContent: [pageSchema],
    crawledUrls: [{ type: String }],
    charCount: {type: String},
    queue: [{ type: String }],
}, { _id: false, timestamps: true })

const questionExample = new Schema({
    question: { type: String, required: true },
    label: { type: String, required: true }
}, { _id: false });

const chatBotCustomizeData = new Schema({
    backgroundColor: { type: String, required: true, default: "#000" },
    borderRadius: { type: String, required: true, default: "12px" },
    description: { type: String, required: true, default: "Ask me anything. I'll try to answer based on the data from this website." },
    fontColor: { type: String, required: true, default: "#FFF" },
    heading: { type: String, required: true, default: "I am your AI assistant" },
    prompt: { type: String, default: "You are a very enthusiastic chatbot who loves to help people! Your name is Stomp and you are designed to respond only based on the given context, outputted in Markdown format." },
    defaultAnswer: { type: String, default: "As Stomps ai i can only answer qustions related to stomps.io" },
    placement: { type: String, enum: ['left', 'right'], required: true, default: 'right' },
    showReadMore: { type: Boolean, required: true, default: true },
    showAsPopup: { type: Boolean, required: true, default: false },
    popupDelay: { type: Number, required: true, default: 3000 },
    offlineMessage: { type: Boolean, required: true, default: false },
    adminEmail: { type: String, default: '' },
    collectEmail: { type: Boolean, required: true, default: false },
    collectEmailText: { type: String, required: true, default: 'What is your email address?' },
    welcomeMessage: { type: String, default: 'Hello! How can I assist you today?' },
    customCSS: { type: String, default: '' },
    questionExamples: { type: [questionExample], default: () => ([{ question: 'How can I contact you?', label: 'Contact' }]) },
    welcomeMessages: [{ type: String, default: ['Hello! How can I assist you today?'] }],
    launcherIcon: { type: String, required: true, default: 'icon1' },
    profileImage: { type: String, required: true, default: 'icon1' },
    chatInputPlaceholderText: { type: String, required: true, default: 'Type your message' },
    assistantTabHeader: { type: String, required: true, default: 'AI assistant' },
    readMoreText: { type: String, required: true, default: 'Read more:' },
    leadMsgDescription: { type: String, required: true, default: "Let us know how to contact you." },
    temparature: {type: Number, default: 0.7, required: true},
    collectName: {type: Boolean, default: false, required: true},
    collectEmail: {type: Boolean, default: false, required: true},
    collectPhone: {type: Boolean, default: false, required: true},
    allowPublicDomains: {type: Boolean, default: false, required: true},
    widgetTheme: {type: String, default: "LIGHT", enum: ['LIGHT', 'DARK', 'SYSTEM']},
    model: { type: String, required: true, enum: Object.values(chatModelEnum), default: chatModelEnum.GPT_4_turbo }
}, { _id: false });

const rateLimiting = new Schema({
    limitMsg: { type: String, required: true, default: 'Too many messages in a row' },
    msg_count: { type: Number, required: true, default: 0 },
    timeframe: { type: Number, required: true, default: 0 },
}, { _id: false });

export default function chatbotModel() {
    const schema = new Schema({
        knowledgebase: {type: knowledgebase, select: false},
        pIndex: { type: String, required: true, immutable: true },
        name: { type: String, required: true, unique: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, immutable: true },
        visibility: { type: String, enum: ['PRIVATE', 'PUBLIC'], default: 'PRIVATE' },
        status: { type: String, enum: Object.values(KnowledgebaseStatus), default: KnowledgebaseStatus.CREATED },
        crawlData: { type: crawlData, default: () => ({ pagesContent: [], crawledUrls: [], queue: [] }), select: false },
        chatBotCustomizeData: { type: chatBotCustomizeData, default: () => ({ ...chatBotCustomizeDataDefault }), select: false },
        rateLimiting: { type: rateLimiting, default: () => ({limitMsg: 'Too many messages in a row', msg_count: 0, timeframe: 0 }), select: false }
    }, { timestamps: true });

    return mongoose.models.Chatbot || mongoose.model('Chatbot', schema);
}
