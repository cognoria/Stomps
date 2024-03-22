import { decrypt, encrypt } from "../../cryptography";
import { AppServiceProviders } from "../../enums";
import { db } from "../db";

const Global = db.Global;

export const globalRepo = {
    isKeys,
    getJwtSecret,
    getServiceKey,
    getEmbedModel,
    setGlobalKeys,
}

async function getServiceKey(provider) {
    // there'd be only one Global document
    let globalSettings = await Global.findOne().lean();

    if (!globalSettings) {
        await seedGlobalKeys();
        globalSettings = await Global.findOne().lean();
    }

    // Find the provider service key
    const service = globalSettings.services.find(service => service.name === provider);

    if (!service) {
        throw `You have not added ${provider} keys yet`;
    }

    // decrypt the apiKey here
    const decryptedApiKey = decrypt(service.apiKey);

    return decryptedApiKey;
}

async function getJwtSecret() {
    // there'd be only one Global document
    let globalSettings = await Global.findOne().lean();

    if (!globalSettings) {
        await seedGlobalKeys();
        globalSettings = await Global.findOne().lean();
    }

    // Find the jwt key
    const service = globalSettings.jwt_secret;

    if (!service) {
        throw 'Global jwt not set yet.';
    }

    // decrypt the apiKey here
    const decryptedApiKey = decrypt(service);

    return decryptedApiKey;
}


//this function will check if user has added all providers keys
async function isKeys() {
    // Retrieve the global settings
    const globalSettings = await Global.findOne().lean();

    // If global settings not found, return false
    if (!globalSettings) return false;

    // Iterate through each provider
    for (const provider of Object.values(AppServiceProviders)) {
        // Find the provider service key
        const service = globalSettings.services.find(service => service.name === provider);

        // If service key is not found, return false
        if (!service || !service.apiKey) {
            return false;
        }
    }

    // All keys are present for all providers, return true
    return true;
}

async function getEmbedModel() {

    // there'd be only one Global document
    let globalSettings = await Global.findOne().lean();

    if (!globalSettings) {
        await seedGlobalKeys();
        globalSettings = await Global.findOne().lean();
    }

    // Find the model
    const service = globalSettings.embedModel;

    if (!service) {
        throw 'embed model not set yet.';
    }

    return service;
}

async function setGlobalKeys(params) {
    if (!params.openai_key && !params.pinecone_key) throw 'Openai and Pinecone keys are required'

    // there'd be only one Global document 
    // and it should and be initalized before now.
    const global = await Global.findOne()

    const openaiKeyHash = encrypt(params.openai_key)
    const pineconeKeyHash = encrypt(params.pinecone_key)

    global.services.push({
        name: AppServiceProviders.OPENAI,
        apiKey: openaiKeyHash,
        meta: {
            desc: "open ai api key"
        }
    })

    global.services.push({
        name: AppServiceProviders.PINECONE,
        apiKey: pineconeKeyHash,
        meta: {
            desc: "pinecone api key"
        }
    })

    return await global.save()
}

/**
 * This is just for demo use.
 * we would define a way to do this in prod
 */
async function seedGlobalKeys() {
    const global = await Global.create({})
    if (!process.env.JWT_SECRET || !process.env.OPENAI_KEY || process.env.PINECONE_KEY) throw 'set JWT_SECRET, OPENAI_KEY & PINECONE_KEY in .env to seed'

    const jwtHash = encrypt(process.env.JWT_SECRET)
    global.jwt_secret = jwtHash;

    const openaiKeyHash = encrypt(process.env.OPENAI_KEY)
    const pineconeKeyHash = encrypt(process.env.PINECONE_KEY)

    global.services.push({
        name: AppServiceProviders.OPENAI,
        apiKey: openaiKeyHash,
        meta: {
            desc: "open ai demo api key"
        }
    })

    global.services.push({
        name: AppServiceProviders.PINECONE,
        apiKey: pineconeKeyHash,
        meta: {
            desc: "pinecone demo api key"
        }
    })

    console.log("seeding done")
    return await global.save()
}