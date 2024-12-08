const {Router}  = require('express');
const adminRouter = Router();
const {admin} = require('../models/admin');
const { createHmac} = require('node:crypto');
var jwt = require('jsonwebtoken');

adminRouter

   .post('/login',async(req,res)=>{
     const {email , password} = req.body;
     const myadmin = await admin.findOne(
       {
         email : email,
        } 
      )
      
      if(!myadmin){
        throw new Error("myadmin Not found!");
      }
      const payload = myadmin.toObject();
      var token = jwt.sign(payload,'secret'); 
      return res.cookie('token',token).redirect('/');
    

    
   })
   .get('/logout',(req,res)=>{
    res.cookie('token','',{maxAge:1});
})

module.exports = adminRouter

