const {Router}  = require('express');
const UserRouter = Router();
const {User} = require('../models/user');
const { createHmac} = require('node:crypto');
var jwt = require('jsonwebtoken');
const { error } = require('node:console');
UserRouter

.post('/signup',async(req,res)=>{
  console.log('hiipro');
   const {name,email,password}=req.body; 
   try {
    const newUser = await User.create({ name, email, password });
    res.status(201).json({ success: true, user: newUser });
} catch (error) {
    if (error.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Email already in use!",
        });
    }
}
  
})
   .post('/login',async(req,res)=>{
     const {email , password} = req.body;
     const user = await User.findOne(
      {
        email : email,
      } 
    )
     
    if(!user){
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
      
    }
    const salt = user.salt;
    const name = user.name;
    const hash = createHmac('sha256', salt)
    .update(password)
    .digest('hex');
    if(hash===user.hash){
      const payload = user.toObject();
      var token = jwt.sign(payload,'secret'); 
      res.cookie("token", token, {
        httpOnly: false,  // Prevents access to cookie via JavaScript
        secure: true,   // Set to `true` in production if using HTTPS
        sameSite: "None", // Required for cross-origin cookies
        maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
        path: "/", // The cookie will be sent to all routes
      });
       return res.status(200).json({
        success: true,
        message: "Login successful",
        token: token, // Include token in the response body if needed
      });
    }
    
    else {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password!",
    });
    }

   })
   .get('/logout',(req,res)=>{
    res.cookie('token','',{maxAge:1});
    res.status(204).send();
})

module.exports = UserRouter
