const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const cors = require('cors');
const dburl='mongodb://127.0.0.1:27017/db7';
const userrouter = require('./routes/user');
const adminrouter = require('./routes/admin');
const { eventRouter } = require('./routes/event');
const BookingsRouter = require('./routes/bookings')
const { isUser, isAdmin } = require('./middlewares/authentication');
const {connectDB} = require('./mongodb/connection');
const PORT = 5000;

connectDB(dburl);
app.use(bodyParser.json()); 
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, // Allow cookies to be sent and received
  
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'OPTIONS'],
  
}));

app.use('/',isUser);
app.use('/',isAdmin);

app.use('/user',userrouter);
app.use('/admin', adminrouter);
app.use('/events',eventRouter);
app.use('/bookings',BookingsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
