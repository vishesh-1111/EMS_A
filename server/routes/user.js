const {Router}  = require('express');
const UserRouter = Router();
const {User} = require('../models/user');
const { createHmac} = require('node:crypto');
var jwt = require('jsonwebtoken');
const { error } = require('node:console');
UserRouter

.post('/signup',async(req,res)=>{
   const {name,email,password}=req.body; 
 const thisuser = await User.create({
    name : name,
    email : email,
    password :password,
  });
})
   .get('/login',(req,res)=>{
    return res.render('login');
})
   .post('/login',async(req,res)=>{
     const {email , password} = req.body;
     const user = await User.findOne(
      {
        email : email,
      } 
    )

    if(!user){
         throw new Error("User Not found!");
    }
    const salt = user.salt;
    const name = user.name;
    const hash = createHmac('sha256', salt)
    .update(password)
    .digest('hex');
    if(hash===user.hash){
  
      const payload = user.toObject();
      var token = jwt.sign(payload,'secret'); 
      return res.cookie('token',token).redirect('/');
    }

    else {
      throw new Error("Incorrect Email or Pasword" );
    }

   })
   .get('/logout',(req,res)=>{
    res.cookie('token','',{maxAge:1});
})

module.exports = UserRouter

