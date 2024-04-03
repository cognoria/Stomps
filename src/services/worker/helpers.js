const { UserModel, GlobalModel } = require("./models.js");

const Users = UserModel;
const Global = GlobalModel;
const SECRET_KEY = process.env.SECERET_KEY;

const truncateStringByBytes = (str, bytes) => {
    const enc = new TextEncoder();
    return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

const sliceIntoChunks = (arr, chunkSize) => {
    return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, i) =>
        arr.slice(i * chunkSize, (i + 1) * chunkSize)
    );
};

async function getService(provider, owner) {
    if (process.env.ALLOW_INDIVIDUAL_KEYS && owner) {
        const userId =owner;
        const user = await Users.findById(userId).select("+services").lean();
        return user.services.find(service => service.name === provider);
    } else {
        const globalSettings = await Global.findOne().lean();
        if (!globalSettings) {
            throw 'Global variables not set yet';
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

function decrypt(text) {
    if (!SECRET_KEY) throw "SECRET_KEY must be set.";

    if (Buffer.from(SECRET_KEY, 'hex').length !== 32) {
        throw "SECRET_KEY must be 32 bytes long.";
    }
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SECRET_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = {
    getEmbedModel,
    getServiceKey,
    sliceIntoChunks,
    truncateStringByBytes
}