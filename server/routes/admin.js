const {Router}  = require('express');
const adminRouter = Router();
const {admin} = require('../models/admin');
const { createHmac} = require('node:crypto');
var jwt = require('jsonwebtoken');
const cookie = require('cookie');

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
      console.log(payload);
      res.setHeader(
        "set-cookie",
        cookie.serialize("token",token,{
          httpOnly : false,
          secure: true,
          maxAge : 60*60,
          sameSite : 'none',
          path :  "/",
        })
        ) 
        return res.status(200).json({
          success: true,
          message: "Login successful",
          token: token, // Include token in the response body if needed
        });

    
   })

   .get('/logout',(req,res)=>{
    res.cookie('token','',{maxAge:1});
})

module.exports = adminRouter

