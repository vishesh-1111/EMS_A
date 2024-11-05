const mongoose =require('mongoose');
const { createHmac,randomBytes } = require('node:crypto');


const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    role: {
        type: String,
        default: 'user' 
    },
    salt : {
        type : String,
        required : false,
    },
    
    hash : {
        type : String,
        required : false,
    },
    
     
})

UserSchema.pre('save',function(next){
   const pwd = this.password;
   const salt = randomBytes(16).toString('hex');

   const hash = createHmac('sha256', salt)
               .update(pwd)
               .digest('hex');

    this.salt= salt;
    this.hash= hash;    
    this.password = undefined;
    next();
})
const User=mongoose.model('user',UserSchema);


module.exports={
    User,
}