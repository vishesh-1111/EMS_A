const bodyParser = require('body-parser');
const  {server,io,app} = require('./socketio')
const session = require('express-session');
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const cors = require('cors');
const origin =process.env.VERCEL_ORIGIN||process.env.LOCAL_ORIGIN
const dburl=process.env.MONGO_URL||process.env.LOCAL_MONGO_URL;
console.log(dburl);
const userrouter = require('./routes/user');

const adminrouter = require('./routes/admin');

const { eventRouter } = require('./routes/event');
const authRouter =require('./routes/auth');
const  Reservationrouter  = require('./routes/reservation');

const { isUser, isAdmin } = require('./middlewares/authentication');
const {connectDB} = require('./mongodb/connection');
connectDB(dburl);
console.log(origin);
const port = process.env.PORT || 5000;
app.use(bodyParser.json()); 
app.use(require('express').json());
app.use(session({secret:'cat',resave:true,saveUninitialized:true}));
app.use(cors({
  origin,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST','DELETE','PUT','OPTIONS'],
  credentials: true,  
}));





 
app.get('/',(req,res)=>{
  res.send("Hi from server");
})
 
app.use('/',isUser);
app.use('/',isAdmin);
app.use('/user',userrouter);
app.use('/admin', adminrouter);
app.use('/events',eventRouter);
app.use('/reservation',Reservationrouter);
app.use('/auth',authRouter);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});