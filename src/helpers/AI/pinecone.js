import { Pinecone } from "@pinecone-database/pinecone";
import { globalRepo } from "../server/repos/global-repo";
import { AppServiceProviders } from "../enums";

// let pinecone = null;

export const getPineconeClient = async (apikey) => {
    // if (!pinecone) pinecone = new Pinecone({ apiKey: apikey });
    return new Pinecone({ apiKey: apikey })
}

// The function `getMatchesFromEmbeddings` is used to retrieve matches for the given embeddings
export async function getMatchesFromEmbeddings(embeddings, topK, pinconeIndex, namespace) {
    // Obtain a client for Pinecone 
    // ///TODO: pass apikey
    const apiKey = await globalRepo.getServiceKey(AppServiceProviders.PINECONE)
    const pinecone = await getPineconeClient(apiKey);

    // Retrieve the list of indexes
    const {indexes} = await pinecone.listIndexes()
    // console.log(indexes)
    // Check if the desired index is present, else throw an error
    const indexFound = indexes.some(index => index.name === pinconeIndex);
    if (!indexFound) {
        throw `Pinecone Index not found`
    }

    // Get the Pinecone index
    const index = pinecone.Index(pinconeIndex);

    // Define the query request
    const queryRequest = {
        vector: embeddings,
        topK,
        includeMetadata: true,
    }

    try {
        // Query the index with the defined request
        const queryResult = await index.query({ ...queryRequest })
        return queryResult.matches || []
    } catch (e) {
        // Log the error and throw it
        console.log("Error querying embeddings: ", e)
        throw (new Error(`Error querying embeddings: ${e}`,))
    }
}

export async function createPinconeIndex(name, type = 'starter', owner) {
    try {
        // ///TODO: pass apikey
        const apiKey = await globalRepo.getServiceKey(AppServiceProviders.PINECONE, owner)
        const pinecone = await getPineconeClient(apiKey);

        let index;

        switch (type.toLowerCase()) {
            case 'serverless':
                return index = await pinecone.createIndex({
                    name,
                    dimension: 1536,
                    metric: 'cosine',
                    spec: {
                        serverless: {
                            cloud: 'aws',
                            region: 'us-west-2'
                        }
                    }
                });

            case 'pod':
                return index = await pinecone.createIndex({
                    name,
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

            case 'starter':
                return index = await pinecone.createIndex({
                    name,
                    dimension: 1536,
                    metric: 'cosine',
                    spec: {
                        pod: {
                            environment: 'gcp-starter',
                            podType: 'p1.x1',
                            pods: 1
                        }
                    }
                });

            default:
                return index = await pinecone.createIndex({
                    name,
                    dimension: 1536,
                    metric: 'cosine',
                    spec: {
                        pod: {
                            environment: 'gcp-starter',
                            podType: 'p1.x1',
                            pods: 1
                        }
                    }
                });
        }
        // return index;
    } catch (e) {
        console.log("Error creating pinecone index: ", e)
        if (e.message.includes("FORBIDDEN")) {
            throw "Cannot Create a Pinecone Index. limit reached.";
        } else {
            throw "An unexpected error occurred while creating a pinecone index. Please try again later.";
        }
    }
}

export async function deletePinconeIndex(index) {
    const apiKey = await globalRepo.getServiceKey(AppServiceProviders.PINECONE)
    const pinecone = await getPineconeClient(apiKey);
    return await pinecone.deleteIndex(index)
}
