const {Router}  = require('express');
const Reservationrouter = Router();
const {reservation} = require('../models/reservation');
const { io } = require('../socketio');

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
.get('/event/:id',async(req,res)=>{
  const eventid = req.params.id;
  const session = req.cookies[`${eventid}`];
  if(session){
    return res.status(200).json(JSON.parse(session));
  }
  else return res.status(404).json({
    message : "reservation session not found"
  });
})
.post('/',async(req,res)=>{
    console.log('reservation post request received');
    const body = req.body;
    console.log(body);
    const userReservation = new reservation({
      eventid : body.eventid,
      userid  : req.user._id,
      vipTickets : body.vipTickets,
      standardTickets : body.standardTickets,
      cost : body.cost
    });
    await userReservation.save();
    userReservation.user=req.user;
    
    res.cookie(`${body.eventid}`,JSON.stringify(userReservation),{
      sameSite : 'none',
      expires : userReservation.expiresAt,
      secure : true,
      httpOnly : true,
    });

    io.emit('reservationmade',userReservation,()=>{
      console.log('Admin ko pata chal gaya ki reservation create ho gya hai');
     });

    setTimeout(async() => {
 const UserReservation = await reservation.findById(userReservation._id);
 if(UserReservation.status==='pending'){
   userReservation.status='failed';
   userReservation.isActive= false;
   userReservation.save();
   io.emit('reservationexpired',userReservation,()=>{
     console.log('Admin ko pata chal gaya ki reservation expire ho gya hai');
    });
  }
    
  }, userReservation.expiresAt - Date.now());
  
     res.status(200).json({
        message: "Reservation made",
        success: true,
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
     return res.status(404).json({
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

