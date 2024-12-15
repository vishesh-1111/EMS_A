const bodyParser = require('body-parser');
const  {server,io,app} = require('./socketio')
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const cors = require('cors');
const dburl=process.env.MONGOURL;
console.log(dburl);
console.log(process.env.NODE_ENV);
const userrouter = require('./routes/user');
const adminrouter = require('./routes/admin');
const { eventRouter } = require('./routes/event');
const  Reservationrouter  = require('./routes/reservation');
const BookingsRouter = require('./routes/bookings');
const { PaymentRouter } = require('./routes/payment');
const { isUser, isAdmin } = require('./middlewares/authentication');
const {connectDB} = require('./mongodb/connection');
const port = process.env.PORT || 5000;

connectDB(dburl);
app.use(bodyParser.json()); 
app.use(cors({
  origin: "*",
  
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST','DELETE','PUT','OPTIONS'],
  credentials: true,  // Important to allow cookies/auth tokens
  
}));


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

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
