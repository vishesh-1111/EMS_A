const {Router}  = require('express');
const adminRouter = Router();
const {admin} = require('../models/admin');
const { createHmac} = require('node:crypto');
var jwt = require('jsonwebtoken');

adminRouter

   .post('/login',async(req,res)=>{
     const {email , password} = req.body;
     const admin = await admin.findOne(
      {
        email : email,
      } 
    )

    if(!admin){
         throw new Error("admin Not found!");
    }
    const salt = admin.salt;
    const name = admin.name;
    const hash = createHmac('sha256', salt)
    .update(password)
    .digest('hex');
    if(hash===admin.hash){
  
      const payload = admin.toObject();
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

module.exports = adminRouter

