const {Router}  = require('express');
const UserRouter = Router();
const {user} = require('../models/user');
const { createHmac} = require('node:crypto');
var jwt = require('jsonwebtoken');
const cookie = require('cookie');


UserRouter
.get('/temp',async(req,res)=>{
  
    if(!req.user)return res.status(401).json(
      {
        "message" : "User not logged in",
      }
    );
    console.log(req.user)
   return res.status(200).json(req.user);
})

.get('/',async(req,res)=>{
  console.log('fetching....');
  if(!req.admin){
    return res.status(403).json({
      message : "Forbidden Route"
    })
  }
  const users =await user.find({});
  return res.json(users);
})

.post('/login',async(req,res)=>{
  const {email , password} = req.body;
  console.log('body',req.body);
  console.log(email,password);
  const User = await user.findOne(
    {
      email : email,
    } 
  )
  if(!User){
    return res.status(404).json({
      success: false,
      message: "User not found!",
    });
    
  }
  const salt = User.salt;
  const name = User.name;
  const hash = createHmac('sha256', salt)
  .update(password)
  .digest('hex');
  if(hash===User.hash){
    const payload = User.toObject();
    var token = jwt.sign(payload,'secret'); 
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
        payload,
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
    console.log('loging out..');
    req.logOut((err)=>{

    });
    res.cookie('token','',{
      maxAge:1,
      httpOnly : false,
      sameSite : 'none',
      secure : 'true',
    });
    res.status(200).send();
  })
  
  .post('/signup',async(req,res)=>{
     const {name,email,password}=req.body; 
     try {
      const newUser = await user.create({ name, email, password });
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
  module.exports = UserRouter
