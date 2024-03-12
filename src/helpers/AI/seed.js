import { getEmbeddings } from "./embeddings";
import {
  Document,
  MarkdownTextSplitter,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import md5 from "md5";
import { getPineconeClient } from "./pinecone";
import { truncateStringByBytes } from "../truncateString";
import { chunkedUpsert } from "./chunkedUpsert";
import { db } from "../server/db";
import { AppServiceProviders, KnowledgebaseStatus } from "../enums";
import PQueue from "p-queue"
import { globalRepo } from "../server/repos/global-repo";
const Chatbot = db.Chatbot;


async function seed(chatbotId) {
  try {
    console.log("Seeding ", chatbotId)
    const apiKey = await globalRepo.getServiceKey(AppServiceProviders.PINECONE)
    const pinecone = await getPineconeClient(apiKey);

    const chatbot = await Chatbot.findByIdAndUpdate(chatbotId, { status: KnowledgebaseStatus.GENERATING_EMBEDDINGS }).select("+crawlData");

    //TODO: make these dynamic either store in Global or inside each chatbot make editable
    let splittingMethod = "markdown";
    let chunkSize = 2048;
    let chunkOverlap = 20;

    const indexName = chatbot.pIndex;
    const pages = chatbot.crawlData.pagesContent;

    // Choose the appropriate document splitter based on the splitting method
    const splitter =
      splittingMethod === "recursive"
        ? new RecursiveCharacterTextSplitter({ chunkSize, chunkOverlap })
        : new MarkdownTextSplitter({ chunkSize, chunkOverlap });

    // Prepare documents by splitting the pages
    const documents = await Promise.all(
      pages.map((page) => prepareDocument(page, splitter))
    );

    const index = pinecone && pinecone.Index(indexName);


    // Get the vector embeddings for the documents
    console.log("Generating embeddings for: " + chatbotId)
    const queue = new PQueue({ concurrency: 1 });
    const vectors = await Promise.all(
      documents.flat().map(doc => queue.add(() => embedDocument(doc)))
    );

    // Upsert vectors into the Pinecone index
    console.log("chunking and upserting")
    await chunkedUpsert(index, vectors, "", 10);

    return await Chatbot.findByIdAndUpdate(chatbotId, { status: KnowledgebaseStatus.READY });
  } catch (error) {
    console.error("Error seeding:", error);

    //update chatbot status;
    await Chatbot.findByIdAndUpdate(chatbotId, { status: KnowledgebaseStatus.EMBEDDING_ERROR })
    throw error;
  }
}

async function embedDocument(doc) {
  try {
    // Generate OpenAI embeddings for the document content
    const embedding = await getEmbeddings(doc.pageContent);

    // Create a hash of the document content
    const hash = md5(doc.pageContent);

    // Return the vector embedding object
    return {
      id: hash, // The ID of the vector is the hash of the document content
      values: embedding, // The vector values are the OpenAI embeddings
      metadata: {
        // The metadata includes details about the document
        chunk: doc.pageContent, // The chunk of text that the vector represents
        text: doc.metadata.text, // The text of the document
        url: doc.metadata.url, // The URL where the document was found
        hash: doc.metadata.hash, // The hash of the document content
      },
    };
  } catch (error) {
    console.log("Error embedding document: ", error);
    throw error;
  }
}

async function prepareDocument(page, splitter) {
  // Get the content of the page
  const pageContent = page.content;

  // Split the documents using the provided splitter
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        url: page.url,
        // Truncate the text to a maximum byte length
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);

  // Map over the documents and add a hash to their metadata
  return docs.map((doc) => {
    return {
      pageContent: doc.pageContent,
      metadata: {
        ...doc.metadata,
        // Create a hash of the document content
        hash: md5(doc.pageContent),
      },
    };
  });
}

export default seed;