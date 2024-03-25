import { getMatchesFromEmbeddings } from "./pinecone";
import { getEmbeddings } from './openai'

// The function `getContext` is used to retrieve the context of a given message
//TODO: maxToken, minscore, getTextOnly should be dynamic
export const getContext = async (message, pineconeIndex, namespace, maxTokens = 1000, minScore = 0.5, getOnlyText = true) => {

  // Get the embeddings of the input message
  const embedding = await getEmbeddings(message);

  // Retrieve the matches for the embeddings from the specified namespace
  const matches = await getMatchesFromEmbeddings(embedding, 10, pineconeIndex, namespace);

  // Filter out the matches that have a score lower than the minimum score
  const qualifyingDocs = matches.filter(m => m.score && m.score > minScore);
  console.log(qualifyingDocs)
  if (!getOnlyText) {
    // Use a map to deduplicate matches by URL
    return qualifyingDocs
  }

  // let docs = matches ? matches.map(match => (match.metadata).chunk) : [];
  let docs = matches ? qualifyingDocs.map(match => (match.metadata).chunk) : [];
  // Join all the chunks of text together, truncate to the maximum number of tokens, and return the result
  return docs.join("\n").substring(0, maxTokens)
}