import Queue from 'bull'
// import { trainChatbot } from '../repositories/chatbotRepo';
import { chatbotRepo } from '../helpers/server';


const redisConfig = {
    //this is not ideal will remove after the test
    password: 'zPmqHYy6ZcAt3hxrelukWCzPAcZQzLnZ',
    host: 'redis-10543.c328.europe-west3-1.gce.cloud.redislabs.com',
    port: 10543
};


const trainChatbotQueue = new Queue('trainChatbot', {
  redis: { ...redisConfig },
});

// Process the trainChatbot job
trainChatbotQueue.process(async (job) => {
  const { chatbotId } = job.data;
  try {
    await chatbotRepo.trainChatbot(chatbotId);
    job.moveToCompleted('done', true);
  } catch (error) {
    console.error('Error training chatbot:', error);
    job.moveToFailed({ message: error.message }, true);
  }
});

export default trainChatbotQueue;