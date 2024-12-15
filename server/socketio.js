const express = require('express');
const app = express();
const http = require('http');


const {Server} = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
    connectionStateRecovery : {},
     cors: {
       origin: 'https://my-first-react-cevx57bad-vishesh-1111s-projects.vercel.app',
       methods: ['GET', 'POST'],
       credentials: true,
     },
   });
   



   module.exports={
    io,server,app
   }