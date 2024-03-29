const OpenAI = require('openai');
const { getServiceKey, getEmbedModel } = require("./helpers.js")
const { AppServiceProviders } = require("./models.js");

let openai;

const getOpenaiClient = async (apikey) => {
    if (!openai) openai = new OpenAI({ apiKey: apikey })
    return openai
}

async function getEmbeddings(input) {
    try {
        const apiKey = await getServiceKey(AppServiceProviders.OPENAI)
        const embedModel = await getEmbedModel();

        const openai = await getOpenaiClient(apiKey)

        const embedding = await openai.embeddings.create({
            model: embedModel,
            input: input.replace(/\n/g, ' '),
            encoding_format: "float",
        });

        return embedding.data[0].embedding;
    } catch (e) {
        console.log("Error calling OpenAI embedding API: ", e);
        throw new Error(`Error embedding: ${e}`);
    }
}

module.exports = {
    getEmbeddings
}