const {Router}  = require('express');
const Reservationrouter = Router();
const {reservation} = require('../models/reservation');

Reservationrouter
.get('/',async(req,res)=>{
  try {
    const AllReservations = await reservation.find({});
    

    return res.status(201).json(AllReservations);
  } catch (error) {
    console.error('Error fetching ActiveREservations:', error);
    
    return res.status(500).json({ message: 'Server error' });
  }
})
.get('/active',async(req,res)=>{
  try {
    const ActiveReservations = await reservation.find({isActive:true});
    
    console.log(ActiveReservations);

    return res.status(201).json(ActiveReservations);
  } catch (error) {
    console.error('Error fetching ActiveREservations:', error);
    
    return res.status(500).json({ message: 'Server error' });
  }
})
.post('/',async(req,res)=>{
    console.log('reservation post request received');
    const body = req.body;
    const userReservation = new reservation({
      eventid : body.eventid,
      userid  : req.user._id,
      vipTickets : body.vipTickets,
      standardTickets : body.standardTickets,
    });
    await userReservation.save();
    userReservation.user=req.user;
    return res.status(200).json({
        message: "Reservation made",
        success: true,
        token: 'abcd',
        reservation: userReservation,
    });

})

.post('/update',async(req,res)=>{
  console.log('called');
  console.log('reservation update  request received');
  const status = req.body.status;
  const eventid =req.body.event._id;
  const userid = req.user._id;
 
  try{

    var userReservation = await reservation.findOne({
      userid : userid,
      eventid : eventid,
      isActive : true,
    })

    if(!userReservation){
      res.status(404).json({
        message : "Reservation not found",
      })
    }
    
  }
  catch(err){
    res.status(500).json({
      message : err,
    })
  }
    userReservation.isActive = false;
    userReservation.status = status;
    await userReservation.save();
    console.log(userReservation);
    console.log('updated successfully');
    res.status(200).json({
      message: "Reservation updated successfully",
      reservation: userReservation,
  });
});



module.exports = Reservationrouter

