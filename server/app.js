const express = require('express');
const bodyParser = require('body-parser');
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



app.use('/user',isUser,userrouter);
app.use('/admin',isAdmin, adminrouter);
app.use('/events',eventRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
