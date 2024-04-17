// import { Index, PineconeRecord } from '@pinecone-database/pinecone';
import { globalRepo } from "../server/repos/global-repo";
import { getPineconeClient } from "./pinecone";
import { AppServiceProviders } from "../enums";
import PQueue from "p-queue"

const sliceIntoChunks = (arr, chunkSize) => {
  return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, i) =>
    arr.slice(i * chunkSize, (i + 1) * chunkSize)
  );
};

export const chunkedUpsert = async (index, vectors, chunkSize = 10, owner) => {
  const apiKey = await globalRepo.getServiceKey(AppServiceProviders.PINECONE, owner)
  const pinecone = await getPineconeClient(apiKey);

  if (!index) throw 'Cannot upsert without Index'

  while (!(await checkIndexReady(pinecone, index))) {
    console.log(`Index '${index}' not ready. Retrying in 15 seconds...`);
    await new Promise(resolve => setTimeout(resolve, 15000));
  }

  console.log(`Index '${index}' is ready. Upserting...`);
  const Index = pinecone.index(index);

  // Split the vectors into chunks
  const chunks = sliceIntoChunks(vectors, chunkSize);
  const queue = new PQueue({ concurrency: 20 });
  try {
    // Upsert each chunk of vectors into the index
    await Promise.allSettled(
      chunks.map(async (chunk) => {
        try {
          queue.add(await Index.upsert(chunk))
        } catch (e) {
          console.log('Error upserting chunk', e);
          throw new Error(e.message)
        }
      })
    );

    return true;
  } catch (e) {
    throw new Error(`Error upserting vectors into index: ${e}`);
  }
};

const checkIndexReady = async (pinecone, indexName) => {
  const response = await pinecone.listIndexes();
  const indexExists = response.indexes.some(index => index.name === indexName && index.status.ready);
  return indexExists;
};