const mongoose = require('mongoose');

const KnowledgebaseStatus = {
    CREATED: 'CREATED',
    CRAWLING: 'CRAWLING',
    CRAWLED: 'CRAWLED',
    CRAWL_ERROR: 'CRAWL_ERROR',
    GENERATING_EMBEDDINGS: 'GENERATING_EMBEDDINGS',
    EMBEDDING_ERROR: 'EMBEDDING_ERROR',
    READY: 'READY',
}

const EmbeddingModels = {
    TEXT_ADA: "text-embedding-ada-002",
    TEXT_3_SMALL: "text-embedding-3-small",
    TEXT_3_LARGE: "text-embedding-3-large"
}

const AppServiceProviders = {
    OPENAI: "OPENAI",
    PINECONE: "PINECONE",
}

const chatModelEnum = {
    GPT_4: 'gpt-4',
    GPT_4_turbo: 'gpt-4-turbo-preview',
    GPT_3_5: 'gpt-3.5-turbo'
}

const chatBotCustomizeDataDefault = {
    backgroundColor: "#000",
    borderRadius: "12px",
    description: "Ask me anything. I'll try to answer based on the data from this website.",
    fontColor: "#FFF",
    heading: "I am your AI assistant",
    prompt: "You are a very enthusiastic chatbot who loves to help people! Your name is {{chatbotName}} and you are designed to respond only based on the given context, outputted in Markdown format.",
    defaultAnswer: "I don't know how to answer that",
    placement: 'right',
    showReadMore: true,
    showAsPopup: false,
    popupDelay: 3000,
    offlineMessage: false,
    adminEmail: '',
    collectEmail: false,
    collectEmailText: 'What is your email address?',
    welcomeMessage: 'Hello! How can I assist you today?',
    customCSS: '',
    questionExamples: [{ question: 'How can I contact you?', label: 'Contact' }],
    welcomeMessages: ['Hello! How can I assist you today?'],
    launcherIcon: 'icon1',
    profileImage: 'icon1',
    chatInputPlaceholderText: 'Type your message',
    assistantTabHeader: 'AI assistant',
    readMoreText: 'Read more:',
    leadMsgDescription: "Let us know how to contact you.",
    model: 'gpt-4-turbo-preview',
    temparature: 0.7,
    widgetTheme: 'LIGHT',
    collectName: false,
    collectEmail: false,
    collectPhone: false,
    allowPublicDomains: false
};

const Schema = mongoose.Schema;

const pageSchema = new mongoose.Schema({
    url: String,
    content: String,
}, { _id: false });

const hashed = new Schema({
    iv: { type: String, required: true },
    encryptedData: { type: String, required: true },
}, { _id: false });

//schema to store pinecone, openAi and other services details
const service = new Schema({
    name: { type: String, required: true, enum: AppServiceProviders },
    apiKey: hashed,
    meta: mongoose.Schema.Types.Mixed
})


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
    charCount: { type: String },
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
    temparature: { type: Number, default: 0.7, required: true },
    collectName: { type: Boolean, default: false, required: true },
    collectEmail: { type: Boolean, default: false, required: true },
    collectPhone: { type: Boolean, default: false, required: true },
    allowPublicDomains: { type: Boolean, default: false, required: true },
    widgetTheme: { type: String, default: "LIGHT", enum: ['LIGHT', 'DARK', 'SYSTEM'] },
    model: { type: String, required: true, enum: Object.values(chatModelEnum), default: chatModelEnum.GPT_4_turbo }
}, { _id: false });

const rateLimiting = new Schema({
    limitMsg: { type: String, required: true, default: 'Too many messages in a row' },
    msg_count: { type: Number, required: true, default: 0 },
    timeframe: { type: Number, required: true, default: 0 },
}, { _id: false });

const chatbotSchema = new Schema({
    knowledgebase: { type: knowledgebase },
    pIndex: { type: String, required: true, immutable: true },
    pineconeKeyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    name: { type: String, required: true, unique: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, immutable: true },
    visibility: { type: String, enum: ['PRIVATE', 'PUBLIC'], default: 'PRIVATE' },
    status: { type: String, enum: Object.values(KnowledgebaseStatus), default: KnowledgebaseStatus.CREATED },
    crawlData: { type: crawlData, default: () => ({ pagesContent: [], crawledUrls: [], queue: [] }) },
    chatBotCustomizeData: { type: chatBotCustomizeData, default: () => ({ ...chatBotCustomizeDataDefault }) },
    rateLimiting: { type: rateLimiting, default: () => ({ limitMsg: 'Too many messages in a row', msg_count: 0, timeframe: 0 }) }
}, { timestamps: true });

const ChatbotModel = mongoose.models.Chatbot || mongoose.model('Chatbot', chatbotSchema);


//user schema
const Userschema = new Schema({
    email: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    googleId: { type: String, },
    services: [{ type: service, select: false }],
}, {
    timestamps: true
});

Userschema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

Userschema.index({ googleId: 1 }, { unique: true, sparse: true })
const UserModel = mongoose.models.User || mongoose.model('User', Userschema);

//Global schema
const globalSchema = new Schema({
    jwt_secret: hashed,
    embedModel: {type: String, enum: Object.values(EmbeddingModels), default: EmbeddingModels.TEXT_3_SMALL},
    services: [service],
}, {
    timestamps: true
});

const GlobalModel = mongoose.models.Global || mongoose.model('Global', globalSchema);


module.exports = {
    UserModel,
    GlobalModel,
    ChatbotModel,
    KnowledgebaseStatus,
    AppServiceProviders,
    chatBotCustomizeDataDefault
}
