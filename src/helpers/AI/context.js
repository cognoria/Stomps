import { getMatchesFromEmbeddings } from "./pinecone";
import { getEmbeddings } from './openai'

// The function `getContext` is used to retrieve the context of a given message
//TODO: maxToken, minscore, getTextOnly should be dynamic
export const getContext = async (message, pineconeIndex, owner, namespace, maxTokens = 3000, minScore = 0.5, getOnlyText = true) => {

  // Get the embeddings of the input message
  const embedding = await getEmbeddings(message, owner);

  // Retrieve the matches for the embeddings from the specified namespace
  const matches = await getMatchesFromEmbeddings(embedding, 10, pineconeIndex, owner, namespace);

  // Sort the matches by score in descending order
  const sortedMatches = matches.sort((a, b) => b.score - a.score);

  // Filter out the matches that have a score lower than the minimum score
  const qualifyingDocs = sortedMatches.filter(m => m.score && m.score > minScore);

  if (!getOnlyText) {
    // Use a map to deduplicate matches by URL
    return qualifyingDocs
  }
  //TODO: log context
  let docs = matches ? sortedMatches.map(match => (match.metadata).chunk) : [];
  // let docs = matches ? qualifyingDocs.map(match => (match.metadata).chunk) : [];

  // Join all the chunks of text together, truncate to the maximum number of tokens, and return the result
  return docs.join("\n").substring(0, maxTokens)
}