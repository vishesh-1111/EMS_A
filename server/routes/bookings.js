const {Router}  = require('express');
const BookingsRouter = Router();
const {booking} = require('../models/booking');
const mongoose = require('mongoose');
const { user } = require('../models/user');
const { admin } = require('../models/admin');

BookingsRouter
.get('/',async(req,res)=>{
  if(!req.user)return res.status(401).json({message : 'user 404'});
  try {
     console.log('called');
    const userid = `${req.user._id}`
    const userBookings = await booking.find({userid:userid});
    console.log(userBookings);
    
  

    //console.log(userBookings);
    // if (userBookings.length === 0) {
    //   return res.status(404).json({ message: 'No bookings found' });
    // }
    
    //console.log(userBookings);
    
    return res.status(201).json(userBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    
    return res.status(500).json({ message: 'Server error' });
  }
});



module.exports = BookingsRouter

