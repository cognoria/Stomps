// import { Index, PineconeRecord } from '@pinecone-database/pinecone';
import { globalRepo } from "../server/repos/global-repo";
import { getPineconeClient } from "./pinecone";
import { AppServiceProviders } from "../enums";

const sliceIntoChunks = (arr, chunkSize) => {
  return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, i) =>
    arr.slice(i * chunkSize, (i + 1) * chunkSize)
  );
};

export const chunkedUpsert = async (index, vectors, chunkSize = 10) => {
  const apiKey = await globalRepo.getServiceKey(AppServiceProviders.PINECONE)
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
          // throw e
        }
      })
    );

    return true;
  } catch (e) {
    throw new Error(`Error upserting vectors into index: ${e}`);
  }
};
