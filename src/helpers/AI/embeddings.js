
import { globalRepo } from "../server";
import { AppServiceProviders } from "../enums";
import OpenAI from 'openai'

let openai = null;

export const getOpenaiClient = async (apikey) => {
    if (!openai) {
        openai =  new OpenAI({
            apiKey: apikey
        })
    }
    return openai
}


export async function getEmbeddings(input) {
    
    const apiKey = await globalRepo.getServiceKey(AppServiceProviders.OPENAI)
    const embedModel = await globalRepo.getEmbedModel();
    try {
        const openai = getOpenaiClient(apiKey)
        const response = await openai.createEmbedding({
            // ///TODO: get model from bot's model
            model: embedModel, //"text-embedding-ada-002",
            input: input.replace(/\n/g, ' ')
        })

        const result = await response.json();
        return result.data[0].embedding

    } catch (e) {
        console.log("Error calling OpenAI embedding API: ", e);
        throw new Error(`Error calling OpenAI embedding API: ${e}`);
    }
}