const express = require('express');
const PaymentRouter = express.Router();
const {payment} = require('../models/payment');
const {booking} = require('../models/booking');
const { reservation } = require('../models/reservation');
const {user} = require('../models/user');
const { io } = require('../socketio');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});


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
    const {userReservation,cardNumber,expirationDate,} = req.body;
    if (!req.user) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }

    const eventid = userReservation.eventid;

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
          cost:userReservation.amount,
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
      //  const existingBooking = await booking.findOne({ userid, eventid });


        const newBooking = new booking({
            eventid,
            userid,
            cost:userReservation.amount,
        });
        await newBooking.save();
        console.log(newBooking);
    
    
    userReservation.status= 'success';
    userReservation.isActive=false;
    userReservation.expiresAt=0;
    await reservation.updateOne(
        { _id: userReservation._id }, 
        { $set: { ...userReservation} } 
      );
    io.emit('reservationsuccess',userReservation,()=>{
        console.log('Admin ko pata chal gaya ki reservation successful ho gya hai');
       });

    return res.status(200).json({
        message: "Payment successful",
        success: true,
        token: 'abcd' 
    });
})
.post('/create-payment-intent', async (req, res) => {
  try {
    console.log('body',req.body);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    // console.log(paymentIntent);
    console.log("Payment Intent Status:", paymentIntent.status);
    

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return res.status(500).json(
      { error: `Internal Server Error: ${error}` },
    );
  }
  });




module.exports = {
   PaymentRouter, 
}