
import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export function getOpenAiConfig(apiKey) {
    return new Configuration({
        apiKey: apiKey
    })
}

export async function getEmbeddings(input) {
    try {
        const response = await openai.createEmbedding({
            //TODO: get model from bot's model
            model: "text-embedding-ada-002",
            input: input.replace(/\n/g, ' ')
        })

        const result = await response.json();
        return result.data[0].embedding

    } catch (e) {
        console.log("Error calling OpenAI embedding API: ", e);
        throw new Error(`Error calling OpenAI embedding API: ${e}`);
    }
}