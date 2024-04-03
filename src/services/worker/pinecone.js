const { Pinecone } = require("@pinecone-database/pinecone");
const { AppServiceProviders } = require("./models.js");
const { sliceIntoChunks } = require("./helpers.js");
const { getServiceKey } = require("./helpers.js")

let pinecone;

const getPineconeClient = async (apikey) => {
    if (!pinecone) pinecone = new Pinecone({ apiKey: apikey });
    return pinecone
}

const chunkedUpsert = async (index, vectors, chunkSize = 10) => {
    const apiKey = await getServiceKey(AppServiceProviders.PINECONE)
    const pinecone = await getPineconeClient(apiKey);

    if (!index) throw 'Cannot upsert without Index'

    const Index = pinecone.index(index);

    // Split the vectors into chunks
    const chunks = sliceIntoChunks(vectors, chunkSize);

    try {
        // Upsert each chunk of vectors into the index
        await Promise.allSettled(
            chunks.map(async (chunk) => {
                try {
                    await Index.upsert(chunk);
                } catch (e) {
                    console.log('Error upserting chunk', e);
                    throw e
                }
            })
        );

        return true;
    } catch (e) {
        throw new Error(`Error upserting vectors into index: ${e}`);
    }
};

module.exports = {
    chunkedUpsert
}