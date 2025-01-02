const express = require('express');
const PaymentRouter = express.Router();
const {payment} = require('../models/payment');
const {booking} = require('../models/booking');
const { reservation } = require('../models/reservation');
const {user} = require('../models/user');
const { io } = require('../socketio');
const { ReturnDocument } = require('mongodb');

PaymentRouter
.get('/history',async(req,res)=>{
      
    try{
        const payments = await payment.find({
            userid : req.user._id,
        });
        
        return res.status(200).json(payments);
        
    }
    catch(err){
        console.log('Error fetching payment of given user',err);
    }


})
.post('/', async (req, res) => {
    const { event, cost, cardNumber, expirationDate,
         vipTickets, standardTickets } = req.body;
    if (!req.user) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }

    const eventid = event._id;

    const session = req.cookies[`${eventid}`];

    if(!session){
        return res.status(404).json({
            message: "Reservation Expired",
            success: false
        });
    }


    res.clearCookie(`${eventid}`, { path: '/' });
    const userid = req.user._id;
  try{

      const newPayment = new payment({
          userid,
          eventid,
          cost,
          cardNumber,
          expirationDate: new Date(expirationDate)
        });
        
        await newPayment.save();
        
    }
    catch(err){
       return res.status(401).json({
         message : err.message,
       })
    }
        const existingBooking = await booking.findOne({ userid, eventid });

    if (existingBooking) {
        existingBooking.vipTickets += vipTickets;
        existingBooking.standardTickets += standardTickets;

        await existingBooking.save();
    } else {
        
        const newBooking = new booking({
            eventid,
            userid,
            vipTickets,
            standardTickets,
        });
        await newBooking.save();
        console.log(newBooking);
    }
    
    const reservationid = (JSON.parse(session))._id;
    const userReservation = await reservation.findById(reservationid);
    userReservation.status= 'success';
    userReservation.isActive=false;
    userReservation.expiresAt=0;
    await userReservation.save();
    io.emit('reservationsuccess',userReservation,()=>{
        console.log('Admin ko pata chal gaya ki reservation successful ho gya hai');
       });

    return res.status(200).json({
        message: "Payment successful",
        success: true,
        token: 'abcd' 
    });
});

module.exports = {
   PaymentRouter, 
}