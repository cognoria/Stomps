import { Pinecone } from "@pinecone-database/pinecone";
import { globalRepo } from "../server/repos/global-repo";
import { AppServiceProviders } from "../enums";

let pinecone = null;

export const getPineconeClient = async (apikey) => {
    if (!pinecone) {
        pinecone = new Pinecone({
            apiKey: apikey,
        });
    }
    return pinecone
}

// The function `getMatchesFromEmbeddings` is used to retrieve matches for the given embeddings
export async function getMatchesFromEmbeddings(embeddings, topK, namespace, pinconeIndex) {
    // Obtain a client for Pinecone 
    // ///TODO: pass apikey
    const apiKey = await globalRepo.getServiceKey(AppServiceProviders.PINECONE)
    const pinecone = await getPineconeClient(apiKey);

    // Retrieve the list of indexes
    const indexes = await pinecone.listIndexes()

    // Check if the desired index is present, else throw an error
    if (!indexes.includes(pinconeIndex)) {
        throw (new Error(`Index index does not exist`))
    }

    // Get the Pinecone index
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

export async function createPinconeIndex(name, type= 'serverless') {

    //TODO: pass apikey
    const apiKey = await globalRepo.getServiceKey(AppServiceProviders.PINECONE)
    const pinecone = await getPineconeClient(apiKey);

    let index;

    switch (type.toLowerCase()) {
        case 'serverless':
            index = await pinecone.createIndex({
                name: 'severless-index',
                dimension: 1536,
                metric: 'cosine',
                spec: {
                    serverless: {
                        cloud: 'aws',
                        region: 'us-west-2'
                    }
                }
            });
            break;
        case 'pod':
            index = await pinecone.createIndex({
                name: 'pod-index',
                dimension: 1536,
                metric: 'cosine',
                spec: {
                    pod: {
                        environment: 'us-west-1-gcp',
                        podType: 'p1.x1',
                        pods: 1
                    }
                }
            });
            break

        default:
            index = await pinecone.createIndex({
                name: 'severless-index',
                dimension: 1536,
                metric: 'cosine',
                spec: {
                    serverless: {
                        cloud: 'aws',
                        region: 'us-west-2'
                    }
                }
            });
            break;
    }

    return index;
}
