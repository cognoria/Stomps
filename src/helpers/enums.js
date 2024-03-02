
export const KnowledgebaseStatus = {
    CREATED: 'CREATED',
    CRAWLING: 'CRAWLING',
    CRAWLED: 'CRAWLED',
    CRAWL_ERROR: 'CRAWL_ERROR',
    GENERATING_EMBEDDINGS: 'GENERATING_EMBEDDINGS',
    EMBEDDING_ERROR: 'EMBEDDING_ERROR',
    READY: 'READY',
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