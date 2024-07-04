import { headers } from "next/headers";
import { decrypt, encrypt } from "../../cryptography";
import { AppServiceProviders, EmbeddingModels } from "../../enums";
import { db } from "../db";

const Global = db.Global;
const Chatbots = db.Chatbot
const Users = db.User

export const globalRepo = {
    isKeys,
    getService,
    getJwtSecret,
    getServiceKey,
    getEmbedModel,
    setGlobalKeys,
}

async function getService(provider, owner) {
    if (process.env.ALLOW_INDIVIDUAL_KEYS) {
        const userId = owner ?? headers().get('userId');
        const user = await Users.findById(userId).select("+services").lean();
        return user.services.find(service => service.name === provider);
    } else {
        let globalSettings = await Global.findOne().lean();
        
        return globalSettings.services.find(service => service.name === provider);
    }
}

async function getServiceKey(provider, owner) {
    const service = await getService(provider, owner);
    if (!service) {
        throw `You have not added ${provider} keys yet`;
    }

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
    if (process.env.ALLOW_INDIVIDUAL_KEYS) {
        const userId = headers().get('userId');
        const user = await Users.findById(userId).select("+services").lean()
        if (!user) throw "User not found"
        if (user.services?.length < 1) return false;

        // Iterate through each provider
        for (const provider of Object.values(AppServiceProviders)) {
            // Find the provider service key
            const service = user.services?.find(service => service.name === provider);

            // If service key is not found, return false
            if (!service || !service.apiKey) {
                return false;
            }
        }

        return true
    }

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
    if (process.env.ALLOW_INDIVIDUAL_KEYS) {
        return EmbeddingModels.TEXT_ADA
    }

    // there'd be only one Global document
    let globalSettings = await Global.findOne().lean();

    if (!globalSettings) {
        return EmbeddingModels.TEXT_ADA
        // await seedGlobalKeys();
        // globalSettings = await Global.findOne().lean();
    }

    // Find the model
    const service = globalSettings.embedModel;

    if (!service) {
        return EmbeddingModels.TEXT_ADA
        // throw 'embed model not set yet.';
    }
    return service;
}

async function setGlobalKeys(params) {
    if (!params.openaiKey && !params.pineconeKey) throw 'Openai and Pinecone keys are required'

    const { openaiKey, pineconeKey } = params;
    const openaiKeyHash = openaiKey ? encrypt(openaiKey) : undefined;
    const pineconeKeyHash = pineconeKey ? encrypt(pineconeKey) : undefined;

    const updateService = async (entity, serviceName, apiKeyHash) => {
        const service = entity.services.find(service => service.name === serviceName);
        if (apiKeyHash) {
            if (service) {
                if (serviceName === AppServiceProviders.PINECONE) {
                    const chatbotsCount = await Chatbots.countDocuments({ pineconeKeyId: service._id });
                    if (chatbotsCount > 0) {
                        throw 'Cannot update or remove the Pinecone key as there are chatbots associated with it';
                    }
                }
                service.apiKey = apiKeyHash;
            } else {
                entity.services.push({
                    name: serviceName,
                    apiKey: apiKeyHash,
                    meta: { desc: `${serviceName.toLowerCase()} api key` }
                });
            }
        }
    };

    if (process.env.ALLOW_INDIVIDUAL_KEYS) {
        const userId = headers().get('userId');
        const user = await Users.findById(userId).select("+services");
        if (!user) throw "User not found";

        await updateService(user, AppServiceProviders.OPENAI, openaiKeyHash);
        await updateService(user, AppServiceProviders.PINECONE, pineconeKeyHash);

        await user.save();
    } else {
        let global = await Global.findOne();
        if (!global) {
            global = await Global.create({});
        }

        await updateService(global, AppServiceProviders.OPENAI, openaiKeyHash);
        await updateService(global, AppServiceProviders.PINECONE, pineconeKeyHash);

        await global.save();
    }

    return { message: "Api keys set successfully" };
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