const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dburl='mongodb://127.0.0.1:27017/db7';
const userrouter = require('./routes/user');
const adminrouter = require('./routes/admin');
const { eventRouter } = require('./routes/event');
const { isUser, isAdmin } = require('./middlewares/authentication');
const {connectDB} = require('./mongodb/connection');
const app = express();
const PORT = 5000;

connectDB(dburl);

app.use(cors()); 
app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000", // The URL of your Next.js app
  methods: "GET,POST",
  credentials: true, // Allow cookies to be sent and received
}));


app.use('/user',isUser,userrouter);
app.use('/admin',isAdmin, adminrouter);
app.use('/events',eventRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
