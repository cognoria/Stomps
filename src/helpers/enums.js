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

export const EmbeddingModels = {
   TEXT_ADA: "text-embedding-ada-002", 
   TEXT_3_SMALL: "text-embedding-3-small", 
   TEXT_3_LARGE: "text-embedding-3-large"
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

export const chatBotCustomizeDataDefault = {
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
    chatInputPlaceholderText: 'Type your message',
    assistantTabHeader: 'AI assistant',
    offlineMsgTabHeader: 'Offline message',
    readMoreText: 'Read more:',
    offlineMsgHeading: "Offline message",
    offlineMsgDescription: "Please fill out the form below and we will get back to you as soon as possible.",
    nameFieldLabel: "Name",
    nameFieldPlaceholder: "Enter your name",
    emailFieldLabel: "Email",
    emailFieldPlaceholder: "Enter your email",
    msgFieldLabel: "Message",
    msgFieldPlaceholder: "Enter your message",
    requiredFieldMsg: "This field is required",
    invalidEmailMsg: "Please enter a valid email",
    formSubmitBtnLabel: "Submit",
    formSubmitBtnSubmittingText: "Submitting...",
    formSubmitSuccessMsg: "Your message sent successfully!",
    formSubmitErrorMsg: "Oops! Something went wrong",
    formSendAgainBtnLabel: "Send again",
    formTryAgainBtnLabel: "Try again",
    model: 'gpt-4-turbo-preview'
};

// /**
//  * Regions available with the AWS cloud provider
//  * 
//  */
// export const AwsRegions = {
//     East1: 'us-east-1',
//     West1: 'us-west-1',
//     West2: 'us-west-2'
// };

// /**
//  * Regions available with the GCP cloud provider
//  * 
//  */
// export const GcpRegions = {
//     UsWest1: 'us-west1',
//     UsWest2: 'us-west2',
//     EuWest4: 'eu-west4',
//     NorthamericaNortheast1: 'northamerica-northeast1',
//     AsiaNortheast1: 'asia-northeast1',
//     AsiaSoutheast1C: 'asia-southeast1C'
// };