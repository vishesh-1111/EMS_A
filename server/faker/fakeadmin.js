const mongoose = require('mongoose');
const { admin } =require("../models/admin");

require('dotenv').config();
const MONGOURL = process.env.MONGO_URL;
console.log(MONGOURL)
async function createAdmin() {
    try{
        await mongoose.connect(MONGOURL);
        await admin.create({
            name : 'admin2',
            email : 'admin2@gmail.com',
            password : '123',
        });
        console.log('created successfully');
    }
    catch(err){
        console.log(err);
    }
};

createAdmin();