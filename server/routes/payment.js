const express = require('express');
const PaymentRouter = express.Router();
const {payment} = require('../models/payment');
const {booking} = require('../models/booking');

PaymentRouter
.get('/',(req,res)=>{
    console.log('hi');
})
.post('/', async (req, res) => {
    if (!req.user) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }

    const { event, cost, cardNumber, expirationDate, vipTickets, standardTickets } = req.body;
    const userid = req.user._id;
    const eventid = event._id;

    const newPayment = new payment({
        userid,
        eventid,
        cost,
        cardNumber,
        expirationDate: new Date(expirationDate)
    });

    await newPayment.save();

    const existingBooking = await booking.findOne({ userid, eventid });

    if (existingBooking) {
        console.log('yay');
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

    return res.status(200).json({
        message: "Payment successful",
        success: true,
        token: 'abcd' 
    });
});

module.exports = {
   PaymentRouter, 
}