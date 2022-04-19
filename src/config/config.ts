import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5500,

    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME,

    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 'qaz',
    SECRET_REFRESH_KEY: process.env.SECRET_REFRESH_KEY || 'wsx',
    SECRET_ACTION_KEY: process.env.SECRET_ACTION_KEY || 'edc',

    EXPIRES_IN_ACCESS: process.env.EXPIRES_IN_ACCESS,
    EXPIRES_IN_REFRESH: process.env.EXPIRES_IN_REFRESH,
    EXPIRES_IN_ACTION: process.env.EXPIRES_IN_ACTION,

    USER_SALT_ROUNDS: process.env.USER_SALT_ROUNDS,

    TYPE_ACCESS: process.env.TYPE_ACCESS,
    TYPE_REFRESH: process.env.TYPE_REFRESH,
    TYPE_ACTION: process.env.TYPE_ACTION,

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

    S3_NAME: process.env.S3_NAME,
    S3_REGION: process.env.S3_REGION,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,

    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/node',

};