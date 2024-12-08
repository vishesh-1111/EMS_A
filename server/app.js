const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const cors = require('cors');
const http = require('http');
const dburl='mongodb://127.0.0.1:27017/db7';
const userrouter = require('./routes/user');
const adminrouter = require('./routes/admin');
const { eventRouter } = require('./routes/event');
const  Reservationrouter  = require('./routes/reservation');

const BookingsRouter = require('./routes/bookings');
const { PaymentRouter } = require('./routes/payment');
const { isUser, isAdmin } = require('./middlewares/authentication');
const {connectDB} = require('./mongodb/connection');
const {Server} = require('socket.io');
const PORT = 5000;
const server = http.createServer(app);

connectDB(dburl);
app.use(bodyParser.json()); 
app.use(cors({
  origin: "http://localhost:3000",
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST','DELETE','PUT','OPTIONS'],
  credentials: true,  // Important to allow cookies/auth tokens
  
}));
const io = new Server(server, {
 //connectionStateRecovery : {},
  cors: {
    origin: 'http://localhost:3000', // Allow WebSocket connections from your Next.js app
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('A user connected',socket.id);
  
  socket.on('clientcall',(reservation,callback)=>{
    console.log('client calling for making reservation');
    callback({
      status : "ok"
    });
      io.emit('admincall',reservation,()=>{
       console.log('Admin received the status');
      });
  })

  socket.on('reservationUpdated',(reservation)=>{
    console.log('client calling for update',reservation);
 
      io.emit('reservationUpdated',reservation,()=>{
       console.log('Admin received the update');
      });
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


app.use('/',isUser);
app.use('/',isAdmin);
app.use('/user',userrouter);
app.use('/admin', adminrouter);
app.use('/events',eventRouter);
app.use('/bookings',BookingsRouter);
app.use('/payment',PaymentRouter);
app.use('/reservations',Reservationrouter);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
