
import { globalRepo } from "../server";
import { AppServiceProviders } from "../enums";
import OpenAI from 'openai'

let openai;

export const getOpenaiClient = async (apikey) => {
    if (!openai) openai = new OpenAI({ apiKey: apikey })
    return openai
}

export async function getEmbeddings(input, owner) {
    try {
        const apiKey = await globalRepo.getServiceKey(AppServiceProviders.OPENAI, owner)
        const embedModel = await globalRepo.getEmbedModel();

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

export async function getChatCompletion(messages, model, owner, temperature) {
    try {
        const apiKey = await globalRepo.getServiceKey(AppServiceProviders.OPENAI, owner)
        const openai = await getOpenaiClient(apiKey)
        
        const completion = await openai.chat.completions.create({
            messages,
            model,
            max_tokens: 1024,
            temperature
        });
        return completion.choices[0].message;
    } catch (e) {
        console.log(e)
        throw new Error(e)
    }
}