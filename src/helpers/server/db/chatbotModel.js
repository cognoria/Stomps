import mongoose from 'mongoose';
import { KnowledgebaseStatus } from '../../enums';

const Schema = mongoose.Schema;

const knowledgebase = new Schema({
    websiteUrl: { type: String },
    urls: [{ type: String }],
    include: [{ type: String }],
    exclude: [{ type: String }],
    filePaths: [{ type: String }]
}, { _id: false })

const pageSchema = new mongoose.Schema({
    url: String,
    content: String,
}, { _id: false });

const crawlData = new Schema({
    pagesContents: [pageSchema],
    crawledUrls: [{ type: String }],
    queue: [{ type: String }],
}, { _id: false })

const questionExample = new Schema({
    question: { type: String, required: true },
    label: { type: String, required: true }
}, { _id: false });

const chatBotCustomizeData = new Schema({
    backgroundColor: { type: String, required: true },
    borderRadius: { type: String, required: true },
    description: { type: String, required: true },
    fontColor: { type: String, required: true },
    heading: { type: String, required: true },
    prompt: { type: String },
    defaultAnswer: { type: String },
    placement: { type: String, enum: ['left', 'right'], required: true },
    showReadMore: { type: Boolean, required: true },
    showAsPopup: { type: Boolean, required: true },
    popupDelay: { type: Number, required: true },
    offlineMessage: { type: Boolean, required: true },
    adminEmail: { type: String, required: true },
    collectEmail: { type: Boolean, required: true },
    collectEmailText: { type: String, required: true },
    welcomeMessage: { type: String },
    customCSS: { type: String, required: true },
    questionExamples: [questionExample],
    welcomeMessages: [{ type: String }],
    launcherIcon: { type: String, required: true }, // Assuming 'launcherIcon' type is a string. Adjust accordingly if it's an object or another type.
    chatInputPlaceholderText: { type: String, required: true },
    assistantTabHeader: { type: String, required: true },
    offlineMsgTabHeader: { type: String, required: true },
    readMoreText: { type: String, required: true },
    offlineMsgHeading: { type: String, required: true },
    offlineMsgDescription: { type: String, required: true },
    nameFieldLabel: { type: String, required: true },
    nameFieldPlaceholder: { type: String, required: true },
    emailFieldLabel: { type: String, required: true },
    emailFieldPlaceholder: { type: String, required: true },
    msgFieldLabel: { type: String, required: true },
    msgFieldPlaceholder: { type: String, required: true },
    requiredFieldMsg: { type: String, required: true },
    invalidEmailMsg: { type: String, required: true },
    formSubmitBtnLabel: { type: String, required: true },
    formSubmitBtnSubmittingText: { type: String, required: true },
    formSubmitSuccessMsg: { type: String, required: true },
    formSubmitErrorMsg: { type: String, required: true },
    formSendAgainBtnLabel: { type: String, required: true },
    formTryAgainBtnLabel: { type: String, required: true },
    model: { type: String, required: true, enum: ['gpt-4', 'gpt-4-turbo-preview', 'gpt-3.5-turbo'], default: 'gpt-3.5-turbo' }
}, { _id: false });

export default function chatbotModel() {
    const schema = new Schema({
        name: { type: String, required: true, unique: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        pIndex: { type: String, required: true },
        status: { type: String, enum: Object.values(KnowledgebaseStatus), default: KnowledgebaseStatus.CREATED },
        visibility: { type: String, enum: ['PRIVATE', 'PUBLIC'], default: 'PRIVATE' },
        knowledgebase: knowledgebase,
        crawlData: crawlData,
        chatBotCustomizeData: chatBotCustomizeData
    }, {timestamps: true});

    return mongoose.models.Chatbot || mongoose.model('Chatbot', schema);
}


