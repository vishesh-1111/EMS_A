const mongoose = require('mongoose');
require('dotenv').config()



async function connectDB(url){
    await mongoose.connect(url)
    .catch((err)=>console.log(err))
    .then((res)=>  console.log('Database Connected.'))
 
}



 



module.exports ={
    connectDB ,
}