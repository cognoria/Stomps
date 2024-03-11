import { schedule } from 'node-cron';
import { chatbots } from './helpers/server/repos/index.js';

// Cron job that runs every minute
const job = schedule('*/1 * * * *', async () => {
    try {
        const bots = await chatbots.getAllNewBot()
        console.log(bots)
    } catch (error) {
        console.error('Error running cron job:', error);
    }
});

export default job;
