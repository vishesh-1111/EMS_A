const express = require('express');
const app = express();
const http = require('http');
require('dotenv').config();

const {Server} = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
    connectionStateRecovery : {},
     cors: {
       origin: process.env.LOCAL_ORIGIN||process.env.VERCEL_ORIGIN,
       methods: ['GET', 'POST'],
       credentials: true,
     },
   });

 
   module.exports={
    io,server,app
   }