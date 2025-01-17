const bodyParser = require('body-parser');
const  {server,io,app} = require('./socketio')
const {passport} = require('./authhelper/auth')
const session = require('express-session');
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const cors = require('cors');
const dburl=process.env.MONGOURL||process.env.LOCAL_MONGO_URL;
const userrouter = require('./routes/user');
const StreamRouter = require('./routes/openai');
const adminrouter = require('./routes/admin');
const { eventRouter } = require('./routes/event');
const authRouter =require('./routes/auth');
const  Reservationrouter  = require('./routes/reservation');
const BookingsRouter = require('./routes/bookings');
const { PaymentRouter } = require('./routes/payment');
const { isUser, isAdmin } = require('./middlewares/authentication');
const {connectDB} = require('./mongodb/connection');
connectDB(dburl);
const port = process.env.PORT || 5000;
app.use(bodyParser.json()); 
app.use(require('express').json());
app.use(cors({
  origin: process.env.VERCEL_ORIGIN||process.env.LOCAL_ORIGIN,
  
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST','DELETE','PUT','OPTIONS'],
  credentials: true,  
}));

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());



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
 
app.get('/',(req,res)=>{
  res.send("Hi from server");
})
 
app.use('/',isUser);
app.use('/',isAdmin);
app.use('/user',userrouter);
app.use('/admin', adminrouter);
app.use('/events',eventRouter);
app.use('/bookings',BookingsRouter);
app.use('/payment',PaymentRouter);
app.use('/reservations',Reservationrouter);
app.use('/ai',StreamRouter);
app.use('/auth',authRouter);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
