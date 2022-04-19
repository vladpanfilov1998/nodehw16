import cron from 'node-cron';

export const getNewUsers = async () => {
    cron.schedule('*/10 * * * * *', async () => {
    });
};