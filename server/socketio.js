const express = require('express');
const app = express();
const http = require('http');
require('dotenv').config();

const {Server} = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
    connectionStateRecovery : {},
     cors: {
       origin: process.env.VERCEL_ORIGIN||process.env.LOCAL_ORIGIN,
       methods: ['GET', 'POST'],
       credentials: true,
     },
   });
      
   
   
   
   io.on('connection', (socket) => {
    console.log('A user connected',socket.id);
    
    socket.on('reservationmade',()=>{
      console.log('client calling for making reservation');
  
        io.emit('reservationmade',()=>{
         console.log('Admin received the status');
        });
    })
  
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

module.exports={
 io,server,app
}
   