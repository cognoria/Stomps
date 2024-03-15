import { decrypt, encrypt } from "../../cryptography";
import { AppServiceProviders } from "../../enums";
import { db } from "../db";

const Global = db.Global;

export const globalRepo = {
    getJwtSecret,
    getServiceKey,
    getEmbedModel,
}

async function getServiceKey(provider) {
    // there'd be only one Global document
    let globalSettings = await Global.findOne();

    if (!globalSettings) {
        await seedGlobalKeys();
        globalSettings = await Global.findOne();
    }

    // Find the OpenAI service entry
    const service = globalSettings.services.find(service => service.name === provider);

    if (!service) {
        throw `You have not added ${provider} keys yet`;
    }

    // Assuming you want to decrypt the apiKey here
    const decryptedApiKey = decrypt(service.apiKey);

    return decryptedApiKey;
}

async function getJwtSecret() {
    // there'd be only one Global document
    let globalSettings = await Global.findOne();

    if (!globalSettings) {
        await seedGlobalKeys();
        globalSettings = await Global.findOne();
    }

    // Find the OpenAI service entry
    const service = globalSettings.jwt_secret;

    if (!service) {
        throw 'Global jwt not set yet.';
    }

    // Assuming you want to decrypt the apiKey here
    const decryptedApiKey = decrypt(service);

    return decryptedApiKey;
}

async function getEmbedModel() {

    // there'd be only one Global document
    let globalSettings = await Global.findOne();

    if (!globalSettings) {
        await seedGlobalKeys();
        globalSettings = await Global.findOne();
    }

    // Find the OpenAI service entry
    const service = globalSettings.embedModel;

    if (!service) {
        throw 'embed model not set yet.';
    }

    return service;
}

/**
 * This is just for demo use.
 * we would define a way to do this in prod
 */
async function seedGlobalKeys(){
    const global = await Global.create({})

    const jwtHash =await  encrypt(process.env.JWT_SECRET)
    global.jwt_secret = jwtHash;

    const openaiKeyHash =await encrypt(process.env.OPENAI_KEY)
    const pineconeKeyHash =await encrypt(process.env.PINECONE_KEY)

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
    // console.log("seeding done")
    return await global.save()
}