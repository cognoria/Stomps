import { PineconeClient } from "@pinecone-database/pinecone";

let pinecone = null;

export const getPineconeClient = async ({ env, apikey }) => {
    if (!pinecone) {
        pinecone = new PineconeClient();
        await pinecone.init({
            environment: env,
            apiKey: apikey,
        });
    }
    return pinecone
}

// The function `getMatchesFromEmbeddings` is used to retrieve matches for the given embeddings
const getMatchesFromEmbeddings = async (embeddings, topK, namespace, pinconeIndex) => {
    // Obtain a client for Pinecone 
    //TODO: pass env and apikey
    const pinecone = await getPineconeClient();

    // Retrieve the list of indexes
    const indexes = await pinecone.listIndexes()

    // Check if the desired index is present, else throw an error
    if (!indexes.includes(pinconeIndex)) {
        // if (!indexes.includes(process.env.PINECONE_INDEX!)) {
        throw (new Error(`Index index does not exist`))
    }

    // Get the Pinecone index
    //   const index = pinecone!.Index(process.env.PINECONE_INDEX!);
    const index = pinecone.Index(pinconeIndex);

    // Define the query request
    const queryRequest = {
        vector: embeddings,
        topK,
        includeMetadata: true,
        namespace
    }

    try {
        // Query the index with the defined request
        const queryResult = await index.query({ queryRequest })
        return queryResult.matches || []
    } catch (e) {
        // Log the error and throw it
        console.log("Error querying embeddings: ", e)
        throw (new Error(`Error querying embeddings: ${e}`,))
    }
}

export { getMatchesFromEmbeddings }