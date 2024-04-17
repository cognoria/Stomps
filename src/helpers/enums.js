// import { AwsRegions, GcpRegions } from "@pinecone-database/pinecone"
import { AwsRegions, GcpRegions } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch"

export { AwsRegions, GcpRegions }

export const KnowledgebaseStatus = {
    CREATED: 'CREATED',
    CRAWLING: 'CRAWLING',
    CRAWLED: 'CRAWLED',
    CRAWL_ERROR: 'CRAWL_ERROR',
    GENERATING_EMBEDDINGS: 'GENERATING_EMBEDDINGS',
    EMBEDDING_ERROR: 'EMBEDDING_ERROR',
    READY: 'READY',
}

export const ChatAnswerFeedback = {
    BAD: 'BAD',
    GOOD: 'GOOD',
    NONE: 'NONE'
}

export const EmbeddingModels = {
    TEXT_ADA: "text-embedding-ada-002",
    TEXT_3_SMALL: "text-embedding-3-small",
    TEXT_3_LARGE: "text-embedding-3-large"
}

export const chatModelEnum = {
    GPT_4: 'gpt-4',
    GPT_4_turbo: 'gpt-4-turbo-preview',
    GPT_3_5: 'gpt-3.5-turbo'
}

export const AppServiceProviders = {
    OPENAI: "OPENAI",
    PINECONE: "PINECONE",
}

export const DataStoreType = {
    WEBPAGE: 'WEBPAGE',
    CUSTOM: 'CUSTOM',
    DOCUMENT: 'DOCUMENT',
    TEXT: 'TEXT'
}

export const DataStoreStatus = {
    CREATED: 'CREATED',
    CHUNKED: 'CHUNKED',
    TRAINED: 'TRAINED',
}

export const position = {
    LEFT: "LEFT",
    RIGHT: "RIGHT"
}

export const widgetThemes = {
    LIGHT: "LIGHT",
    DARK: "DARK",
    SYSTEM: "SYSTEM",
}
export const chatBotCustomizeDataDefault = {
    backgroundColor: "#000",
    borderRadius: "12px",
    description: "Ask me anything. I'll try to answer based on the data from this website.",
    fontColor: "#FFF",
    heading: "I am your AI assistant",
    prompt: "You are a very enthusiastic chatbot who loves to help people! Your name is Stomps and you are designed to respond only based on the given context, outputted in Markdown format.",
    defaultAnswer: "I don't know how to answer that",
    placement: position.RIGHT,
    showReadMore: true,
    showAsPopup: false,
    popupDelay: 3000,
    offlineMessage: false,
    adminEmail: '',
    collectEmail: false,
    collectEmailText: 'What is your email address?',
    welcomeMessage: 'Hello! How can I assist you today?',
    customCSS: '',
    questionExamples: [{ question: 'How can I contact you?' }],
    welcomeMessages: ['Hello! How can I assist you today?'],
    launcherIcon: '#1261AC',
    profileImage: '#1261AC',
    chatInputPlaceholderText: 'Type your message',
    assistantTabHeader: 'AI assistant',
    readMoreText: 'Read more:',
    leadMsgDescription: "Let us know how to contact you.",
    model: chatModelEnum.GPT_3_5,
    temparature: 0.7,
    widgetTheme: widgetThemes.LIGHT,
    collectName: false,
    collectEmail: false,
    collectPhone: false,
    allowPublicDomains: false
};
