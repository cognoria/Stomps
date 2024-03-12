
import { globalRepo } from "../server";
import { AppServiceProviders } from "../enums";
import OpenAI from 'openai'

let openai;

export const getOpenaiClient = async (apikey) => {
    if (!openai) openai = new OpenAI({ apiKey: apikey })
    return openai
}

export async function getEmbeddings(input) {
    try {
        const apiKey = await globalRepo.getServiceKey(AppServiceProviders.OPENAI)
        const embedModel = await globalRepo.getEmbedModel();
        const openai = getOpenaiClient(apiKey)

        const embedding = await openai.embeddings.create({
            model: embedModel,
            input: input.replace(/\n/g, ' '),
            encoding_format: "float",
        });

        console.log(embedding);

        return embedding.data[0].embedding;
    } catch (e) {
        console.log("Error calling OpenAI embedding API: ", e);
        throw new Error(`Error embedding: ${e}`);
    }
}