// import { AwsRegions, GcpRegions } from "@pinecone-database/pinecone"
import { AwsRegions, GcpRegions } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch"

export { AwsRegions, GcpRegions }

export const KnowledgebaseStatus = {
    CREATED: 'CREATED',
    CRAWLING: 'CRAWLING',
    CRAWLED: 'CRAWLED',
    CRAWL_ERROR: 'CRAWL_ERROR',
    GENERATING_EMBEDDINGS: 'GENERATING_EMBEDDINGS',
    EMBEDDING_ERROR: 'EMBEDDING_ERROR',
    READY: 'READY',
}

export const EmbeddingModels = {
   TEXT_ADA: "text-embedding-ada-002", 
   TEXT_3_SMALL: "text-embedding-3-small", 
   TEXT_3_LARGE: "text-embedding-3-large"
}

export const AppServiceProviders = {
    OPENAI: "OPENAI",
    PINECONE: "PINECONE",
}

export const DataStoreType = {
    WEBPAGE: 'WEBPAGE',
    CUSTOM: 'CUSTOM',
    DOCUMENT: 'DOCUMENT',
    TEXT: 'TEXT'
}

export const DataStoreStatus = {
    CREATED: 'CREATED',
    CHUNKED: 'CHUNKED',
    TRAINED: 'TRAINED',
}

// /**
//  * Regions available with the AWS cloud provider
//  * @export
//  */
// export const AwsRegions = {
//     East1: 'us-east-1',
//     West1: 'us-west-1',
//     West2: 'us-west-2'
// };

// /**
//  * Regions available with the GCP cloud provider
//  * @export
//  */
// export const GcpRegions = {
//     UsWest1: 'us-west1',
//     UsWest2: 'us-west2',
//     EuWest4: 'eu-west4',
//     NorthamericaNortheast1: 'northamerica-northeast1',
//     AsiaNortheast1: 'asia-northeast1',
//     AsiaSoutheast1C: 'asia-southeast1C'
// };