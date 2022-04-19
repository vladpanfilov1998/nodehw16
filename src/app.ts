import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import http from 'http';
import 'reflect-metadata';
import SocketIO from 'socket.io';
import {createConnection} from 'typeorm';
import mongoose from 'mongoose';

import {config} from './config';
import {socketController} from './controller';
import {apiRouter} from './router';

// import {cronRun} from './cron';

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIO(server, {cors: {ordered: '*'}});

io.on('connection', (socket: any) => {
    socket.on('message:send', async (data: any) => socketController.messageSend(socket, io, data));

    socket.on('join_room', async (data: any) => socketController.joinRoom(io, socket, data));
});

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect(config.MONGODB_URL);

app.use(apiRouter);

const {PORT} = config;

server.listen(PORT, async () => {
    console.log(`Server has started on port ${PORT}!`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('DB connected');
            // cronRun();
        }
    } catch (e: any) {
        console.log(e.message);
    }
});