
import { OpenAIApi, Configuration } from "openai-edge";
import { globalRepo } from "../server/repos/global-repo";
import { AppServiceProviders } from "../enums";


let openAi = null;

export const getOpenaiClient = async (apikey) => {
    if (!openAi) {
        openAi =  new OpenAIApi( new Configuration({
            //TODO: get key from user profile
            apiKey: apikey
        }))
    }
    return openAi
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