// const Bull = require('bull');
const { Queue, Worker } = require('bullmq')
const redis = require('redis');
const seed = require('./seed.js')
const mongoose = require('mongoose')
const { Crawler } = require("./crawler.js")
const { ChatbotModel } = require('./models.js');
require('dotenv').config()

//process.env.MONGODB_URI
const dbUrl = "mongodb+srv://stomps0:Stomps0Password@stomps0.wwwzweb.mongodb.net/stomp_app";
// process.env.REDIS_URL
const redisUrl = 'redis://default:EXTgKRgXN5RQrUBvvgprlqFfck8bqRSq@redis-11900.c135.eu-central-1-1.ec2.cloud.redislabs.com:11900';
const Chatbot = ChatbotModel;

mongoose.connect(dbUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1)
  });

const redisClient = redis.createClient({ url: redisUrl })

redisClient.on('error', (err) => {
  console.error('Redis Connection Error:', err);
  process.exit(1)
});

// Process the trainChatbot job
async function trainBot(job) {
  const { chatbotId } = job.data;
  console.log("training chatbot with Id: " + chatbotId)
  try {

    await trainChatbot(chatbotId);
    job.moveToCompleted('done', true);
  } catch (error) {
    console.error('Error training chatbot:', error);
    job.moveToFailed({ message: error.message }, true);
  }
};

async function trainChatbot(chatbotId) {
  if (!chatbotId || chatbotId == 'undefined') throw new Error('Invalid chatbot id')

  const chatbot = await Chatbot.findById(chatbotId); // Fetch chatbot data
  if (!chatbot) {
    throw new Error('Chatbot not found');
  }
  const crawler = new Crawler(chatbotId)

  const crawlPages = new Promise(async (resolve, reject) => {
    try {
      await crawler.crawl();
      resolve('Crawl completed successfully');
    } catch (error) {
      await Chatbot.findByIdAndUpdate(chatbotId, { status: KnowledgebaseStatus.CRAWL_ERROR });
      console.log(error)
      reject(`Crawl failed: ${error.message}`);
    }
  });
  //crawl the webpages
  await crawlPages;

  //seed websontents into pinecone vector db
  return await seed(chatbotId)
}

//define worker service
const trainChatbotWorker = new Worker('trainChatbot', trainBot, { connection: redisClient });


// Handle worker events
trainChatbotWorker.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed with result: ${result}`);
});

trainChatbotWorker.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed with error: ${err.message}`);
});

// Start the worker
(async () => {
  if (!trainChatbotWorker.isRunning()) {
    await trainChatbotWorker.run();
  }
  console.log('Worker started');
})();
