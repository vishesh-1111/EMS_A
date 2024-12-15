const mongoose = require('mongoose');
const { admin } =require("../models/admin");

require('dotenv').config();
const MONGOURL = process.env.MONGOURL;
console.log(MONGOURL);
async function createAdmin() {
    try{
        await mongoose.connect(MONGOURL);
        await admin.create({
            name : 'admin1',
            email : 'admin1@gmail.com',
            salt :'123',
            hash : '082a09241cc331c1b999d19980ce6066744db96ad8758b2e45b17ad54309123b',
            password : '123',
        });
        console.log('created successfully');
    }
    catch(err){
        console.log(err);
    }
};

createAdmin();