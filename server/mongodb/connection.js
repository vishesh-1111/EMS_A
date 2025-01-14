const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const dburl=(process.env.AIMONGOURL);
const dbName = "langchain_demo"
const collectionName = "EMS1.2"
const client = new MongoClient(dburl);

async function connectDB(url){
    await mongoose.connect(url)
    .catch((err)=>console.log(err))
    .then((res)=>  console.log('Database Connected.'))
 
}



 

const collection = client
  .db(dbName)
  .collection(collectionName);


module.exports ={
    connectDB ,
    collection,
}