const express = require('express');
const seatRouter = express.Router();
const seat = require('../models/seat');
const {isAdmin } = require('../middlewares/authentication');
const { user } = require('../models/user');

seatRouter
.get('/:eventid',async(req,res)=>{
    const allseats = await seat.find({eventId:req.params.eventid});
    var seatarr=[];
    // console.log('allseats',allseats)
    const userSeatNos = allseats
    .filter((userseat) =>{ 
      if(userseat.bookedBy!==null){

        // console.log(userseat);
        // console.log( userseat.bookedBy.toString(),req.user._id)  
        if(userseat.bookedBy.toString() === req.user._id){
          if(userseat.status==='booked'){
            seatarr.push(userseat.seatno);
          }
        }
      }
    
    }) 
    .map(seat => seat.seatno); 

    return res.status(200).json({
        allseats,
        seatarr,
    })
})
.post('/:eventid', async (req, res) => {
  
    try {
      const { selectedSeats} = req.body;
      const eventid = req.params.eventid;
      const userid = req.user._id;
      if (!selectedSeats || !Array.isArray(selectedSeats)) {
        return res.status(400).json({ error: 'selectedSeats must be an array' });
      }
      if (!eventid || !userid) {
        return res.status(400).json({ error: 'Missing required fields: eventid, userid, or price' });
      }
    

      const result = await seat.updateMany(
        { seatno: { $in: selectedSeats } },
        { 
          $set: { 
            status: 'reserved', 
            eventid: eventid, 
            bookedBy: userid, 
          } 
        }
      );
  
      if (result.modifiedCount === 0) {
        console.log('nooo');
        return res.status(404).json({ message: 'No seats found to update' });
      }
  
      res.status(200).json({ 
        message: `${result.modifiedCount} seat(s) updated successfully`, 
        modifiedCount: result.modifiedCount 
      });
    } catch (error) {
      console.error('Error reserving seats:', error);
      res.status(500).json({ error: 'Internal server error(seat reservation)' });
    }
  });





module.exports={
   seatRouter, 
}