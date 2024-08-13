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
    GPT_4o: 'gpt-4o',
    GPT_40_mini: 'gpt-4o-mini',
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

export const rateLimits = {
    limitMsg: 'Too many messages in a row',
    msg_count: 0,
    timeframe: 0
}

export const securityQuestions = [
    {
        "question": "What was the name of your first pet?"
    },
    {
        "question": "What is the name of the street you grew up on?"
    },
    {
        "question": "What was the make and model of your first car?"
    },
    {
        "question": "What was the name of your first school?"
    },
    {
        "question": "What is your mother’s maiden name?"
    },
    {
        "question": "What is your favorite book?"
    },
    {
        "question": "What is the name of your favorite childhood friend?"
    },
    {
        "question": "What city were you born in?"
    },
    {
        "question": "What was the name of your first employer?"
    },
    {
        "question": "What is your father’s middle name?"
    },
    {
        "question": "What was the name of your first grade teacher?"
    },
    {
        "question": "What is your favorite movie?"
    },
    {
        "question": "What is the name of your favorite restaurant?"
    },
    {
        "question": "What is your favorite food?"
    },
    {
        "question": "What was the name of the hospital where you were born?"
    },
    {
        "question": "What was your childhood nickname?"
    },
    {
        "question": "What was the name of your first crush?"
    },
    {
        "question": "What was the name of your first company you worked for?"
    },
    {
        "question": "What is your favorite sports team?"
    },
    {
        "question": "What is your favorite color?"
    },
    {
        "question": "What is the middle name of your oldest sibling?"
    },
    {
        "question": "What is your favorite vacation spot?"
    },
    {
        "question": "What is the name of your first child?"
    },
    {
        "question": "What was the first concert you attended?"
    }
]

export const chatBotCustomizeDataDefault = {
    backgroundColor: "#000",
    borderRadius: "12px",
    description: "Ask me anything. I'll try to answer based on the data from this website.",
    fontColor: "#FFF",
    userChatColor: "#1261AC",
    heading: "I am your AI assistant",
    prompt: "You are a professional and friendly chatbot. Use clear and concise language to provide supportive responses, ensuring every interaction is courteous and enhances user satisfaction.",
    defaultAnswer: "I am sorry, I don't have the information you're looking for right now. Please feel free to contact our support team if you need immediate assistance, or let me know if there's anything else you'd like to explore!",
    placement: position.RIGHT,
    showReadMore: true,
    showAsPopup: false,
    popupDelay: 3000,
    offlineMessage: false,
    adminEmail: '',
    collectEmail: false,
    collectEmailText: 'What is your email address?',//
    welcomeMessage: 'Hello! How can I assist you today?',
    customCSS: '',//
    questionExamples: [{ question: 'How can I contact you?' }],
    welcomeMessages: ['Hello! How can I assist you today?'],
    launcherIcon: '#1261AC',
    profileImage: '#1261AC',
    chatInputPlaceholderText: 'Type your message',
    assistantTabHeader: 'AI assistant',
    readMoreText: 'Read more:',//
    leadMsgDescription: "Let us know how to contact you.",
    model: chatModelEnum.GPT_4o,
    temparature: 0.7,
    widgetTheme: widgetThemes.LIGHT,
    collectName: false,
    collectEmail: false,
    collectPhone: false,
    allowPublicDomains: false
};
