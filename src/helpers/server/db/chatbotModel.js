import mongoose from 'mongoose';
import { KnowledgebaseStatus, chatBotCustomizeDataDefault } from '../../enums';

const Schema = mongoose.Schema;

const knowledgebase = new Schema({
    website: { type: String },
    urls: [{ type: String }],
    include: [{ type: String }],
    exclude: [{ type: String }],
    contents: [{type: String}]
}, { _id: false })

const pageSchema = new mongoose.Schema({
    url: String,
    content: String,
}, { _id: false });

const crawlData = new Schema({
    pagesContent: [pageSchema],
    crawledUrls: [{ type: String }],
    queue: [{ type: String }],
}, { _id: false })

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
    prompt: { type: String, default: "You are a very enthusiastic chatbot who loves to help people! Your name is {{chatbotName}} and you are designed to respond only based on the given context, outputted in Markdown format." },
    defaultAnswer: { type: String, default: "I don't know how to answer that" },
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
    chatInputPlaceholderText: { type: String, required: true, default: 'Type your message' },
    assistantTabHeader: { type: String, required: true, default: 'AI assistant' },
    offlineMsgTabHeader: { type: String, required: true, default: 'Offline message' },
    readMoreText: { type: String, required: true, default: 'Read more:' },
    offlineMsgHeading: { type: String, required: true, default: "Offline message" },
    offlineMsgDescription: { type: String, required: true, default: "Please fill out the form below and we will get back to you as soon as possible." },
    nameFieldLabel: { type: String, required: true, default: "Name" },
    nameFieldPlaceholder: { type: String, required: true, default: "Enter your name" },
    emailFieldLabel: { type: String, required: true, default: "Email" },
    emailFieldPlaceholder: { type: String, required: true, default: "Enter your email" },
    msgFieldLabel: { type: String, required: true, default: "Message" },
    msgFieldPlaceholder: { type: String, required: true, default: "Enter your message" },
    requiredFieldMsg: { type: String, required: true, default: "This field is required" },
    invalidEmailMsg: { type: String, required: true, default: "Please enter a valid email" },
    formSubmitBtnLabel: { type: String, required: true, default: "Submit" },
    formSubmitBtnSubmittingText: { type: String, required: true, default: "Submitting..." },
    formSubmitSuccessMsg: { type: String, required: true, default: "Your message sent successfully!" },
    formSubmitErrorMsg: { type: String, required: true, default: "Oops! Something went wrong" },
    formSendAgainBtnLabel: { type: String, required: true, default: "Send again" },
    formTryAgainBtnLabel: { type: String, required: true, default: "Try again" },
    model: { type: String, required: true, enum: ['gpt-4', 'gpt-4-turbo-preview', 'gpt-3.5-turbo'], default: 'gpt-3.5-turbo' }
}, { _id: false });

export default function chatbotModel() {
    const schema = new Schema({
        knowledgebase: knowledgebase,
        pIndex: { type: String, required: true },
        name: { type: String, required: true, unique: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        visibility: { type: String, enum: ['PRIVATE', 'PUBLIC'], default: 'PRIVATE' },
        status: { type: String, enum: Object.values(KnowledgebaseStatus), default: KnowledgebaseStatus.CREATED },
        crawlData: { type: crawlData, default: () => ({ pagesContent: [], crawledUrls: [], queue: [] }), select: false },
        chatBotCustomizeData: { type: chatBotCustomizeData, default: () => ({ ...chatBotCustomizeDataDefault }), select: false }
    }, { timestamps: true });

    return mongoose.models.Chatbot || mongoose.model('Chatbot', schema);
}
