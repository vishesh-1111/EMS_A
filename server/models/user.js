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
/////////////////////////
    googleId : {
        type : String,
        required : false,
    },
    accessToken : {
        type : String,
        required : false,
    },

    refreshToken : {
        type : String,
        required : false,
    },

////////////////////////

    password : {
        type : String,
        required : false,
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

UserSchema.pre('save', function (next) {
    if (this.password) {  // Check if password exists
      const pwd = this.password;
      const salt = randomBytes(16).toString('hex');
      const hash = createHmac('sha256', salt)
        .update(pwd)
        .digest('hex');
  
      this.salt = salt;
      this.hash = hash;
      this.password = undefined;  // Make sure not to save the plaintext password
    }
    next();
  });
const user=mongoose.model('user',UserSchema);


module.exports={
    user,
}