const express = require('express');
const app = express();
const http = require('http');


const {Server} = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
    connectionStateRecovery : {},
     cors: {
       origin: 'http://localhost:3000', 
       methods: ['GET', 'POST'],
       credentials: true,
     },
   });



   module.exports={
    io,server,app
   }