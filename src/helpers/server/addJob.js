import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import { chatbotRepo } from './repos';

const REDIS_URI = process.env.REDIS_URI;

const connection = new Redis({
  url: REDIS_URI,
  maxRetriesPerRequest: null
});

console.log({REDIS_URI})

// Create a queue instance
const trainChatbotQueue = new Queue('trainChatbot', { connection });

// Create a worker instance
const worker = new Worker(
  'trainChatbot',
  async (job) => {
    console.log(`Processing job ${job.id}`);
    const { chatbotId } = job.data;
    console.log("training chatbot with Id: " + chatbotId)
    try {

      return await chatbotRepo.trainChatbot(chatbotId);
      // job.moveToCompleted('done', true);
    } catch (error) {
      console.error('Error training chatbot:', error);
      // job.moveToFailed({ message: error.message }, true);
      throw new Error(error)
    }
  },
  {
    concurrency: 1,
    connection
  },
);

// Handle worker events
worker.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed with result: ${result}`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed with error: ${err.message}`);
});

console.log("Worker Running: ", worker.isRunning())
export { trainChatbotQueue };