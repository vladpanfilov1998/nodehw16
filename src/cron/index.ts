import {getNewUsers} from './getNewUsers.cron';
import {spamMessage} from './spamMessage.cron';

export const cronRun = () => {
    getNewUsers();
    spamMessage();
};