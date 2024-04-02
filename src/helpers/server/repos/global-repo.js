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
        if (!globalSettings) {
            await seedGlobalKeys();
            globalSettings = await Global.findOne().lean();
            // throw 'Global variables not set yet';
        }
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
    if (!params.openaiKey && !params.pineconeKey) throw 'Openai and Pinecone keys are required'

    const openaiKeyHash = encrypt(params.openaiKey)
    const pineconeKeyHash = encrypt(params.pineconeKey)

    if (process.env.ALLOW_INDIVIDUAL_KEYS) {
        const userId = headers().get('userId');
        const user = await Users.findById(userId).select("+services")

        // Check if the service already exists, and update it if it does
        if (!user) throw "User not found"

        const openaiService = user.services?.find(
            (service) => service.name === AppServiceProviders.OPENAI
        );
        if (openaiService) {
            openaiService.apiKey = openaiKeyHash;
        } else {
            user.services.push({
                name: AppServiceProviders.OPENAI,
                apiKey: openaiKeyHash,
                meta: { desc: 'open ai api key' },
            });
        }

        const pineconeService = user.services?.find(
            (service) => service.name === AppServiceProviders.PINECONE
        );
        if (pineconeService) {
            // Check if there are any chatbots associated with this Pinecone key
            const chatbotsCount = await Chatbots.countDocuments({
                pineconeKeyId: pineconeService._id,
            });

            if (chatbotsCount > 0) {
                throw new Error(
                    'Cannot update or remove the Pinecone key as there are chatbots associated with it'
                );
            }

            pineconeService.apiKey = pineconeKeyHash;
        } else {
            user.services.push({
                name: AppServiceProviders.PINECONE,
                apiKey: pineconeKeyHash,
                meta: { desc: 'pinecone api key' },
            });
        }

        await user.save();
        return { message: "Api keys set successfully" };
    }

    // there'd be only one Global document 
    // and it should and be initalized before now.
    let global = await Global.findOne()
    if (!global) {
        global = await Global.create({})
    }

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
    await global.save()
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