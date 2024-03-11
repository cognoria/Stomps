import { decrypt } from "../../cryptography";
import { db } from "../db";

const Global = db.Global;

export const global = {
    getJwtSecret,
    getServiceKey,
    getEmbedModel,
}

async function getServiceKey(provider) {
    // there'd be only one Global document
    const globalSettings = await Global.findOne();

    if (!globalSettings) {
        throw 'Global settings not found.';
    }

    // Find the OpenAI service entry
    const service = globalSettings.services.find(service => service.name === provider);

    if (!service) {
        throw service + ' service details not found.';
    }

    // Assuming you want to decrypt the apiKey here
    const decryptedApiKey = decrypt(service.apiKey);

    return decryptedApiKey;
}

async function getJwtSecret() {
    // there'd be only one Global document
    const globalSettings = await Global.findOne();

    if (!globalSettings) {
        throw 'Global settings not found.';
    }

    // Find the OpenAI service entry
    const service = globalSettings.jwt_secret;

    if (!jwt_secret) {
        throw 'Global jwt not set yet.';
    }

    // Assuming you want to decrypt the apiKey here
    const decryptedApiKey = decrypt(service.apiKey);

    return decryptedApiKey;
}

async function getEmbedModel() {

    // there'd be only one Global document
    const globalSettings = await Global.findOne();

    if (!globalSettings) {
        throw 'Global settings not found.';
    }

    // Find the OpenAI service entry
    const service = globalSettings.embedModel;

    if (!service) {
        throw 'embed model not set yet.';
    }

    return service;
}