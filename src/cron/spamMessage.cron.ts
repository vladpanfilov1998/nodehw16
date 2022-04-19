import cron from 'node-cron';
import {SentMessageInfo} from 'nodemailer';

import {emailService, userService} from '../services';
import {EmailActionEnum} from '../constants';
import {IUser} from '../entity';

export const spamMessage = async () => {
    cron.schedule('*/10 * * * * *', async () => {
        const users: IUser[] = await userService.getUsers();
        const promises: Promise<SentMessageInfo>[] = [];

        users.map(
            ({
                 email,
                 firstName,
             }: IUser) => promises.push(emailService.sendMail(
                email,
                EmailActionEnum.SPAM_MESSAGE,
                {userName: firstName},
            )),
        );

        const results = await Promise.allSettled(promises);
        console.log(results);
    });
};