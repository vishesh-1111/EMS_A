const {Router}  = require('express');
const Reservationrouter = Router();
const {reservation} = require('../models/reservation');
const {booking}=require('../models/booking')
const seat = require('../models/seat');
const { io } = require('../socketio');

Reservationrouter
.get('/',async(req,res)=>{
 
   if(!req.cookies['token']||!req.cookies['token'].role==='admin'){
    return res.status(403).json({
      message : "Unauthorised"
    })
   }

  try {
    const AllReservations = await reservation.findOne({userid:req.user._id});
    

    return res.status(201).json(AllReservations);
  } catch (error) {
    console.error('Error fetching ActiveREservations:', error);
    
    return res.status(500).json({ message: 'Server error' });
  }
})
.get('/active',async(req,res)=>{

   
  if(!req.user||!(req.user.role==='admin')){

    return res.status(403).json({
      message : "Unauthorised"
    })
   }
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

    const userReservation = new reservation({
      eventid : body.eventid,
      userid  : req.user._id,
      seats : body.seats,
      amount : body.amount,
      status : 'reserved',
    });
    await userReservation.save();
    userReservation.user=req.user;
    
    try{
      // console.log(req.user._id);
      console.log(body.seats);
      console.log(body.eventid);
      const filter = {
        seatno: { $in: body.seats },  
        eventId: body.eventid,        
      };
      const update = { 
        $set: { 
          status: "reserved", 
          bookedBy: req.user._id,
        } 
      };
      
      
      // Perform the update
      const result = await seat.updateMany(filter, update);
      console.log(`${result.modifiedCount} documents were updated.`);
      
    }catch(err){
      console.error("Error updating seats:", err);
    }
    
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
         const currentuserReservation = await reservation.findById(userReservation._id);
         console.log(currentuserReservation);
        if(currentuserReservation.status==='reserved'){
          currentuserReservation.status='available';
         await  currentuserReservation.save();
          const updateback = { 
            $set: { 
              status: "available", 
              bookedBy: null,
            } 
          };
          const filter = {
            seatno: { $in: body.seats },  
            eventId: body.eventid,        
          };
   const result2 = await seat.updateMany(filter,updateback);
   console.log(`${result2.modifiedCount} documents were updated.`);
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

.get('/cancel-reservation',async(req,res)=>{
  const eventid = req.params.id;
  const session = req.cookies[`${eventid}`];
  if(session){
    return res.status(200).json(JSON.parse(session));
  }
  else return res.status(404).json({
    message : "reservation session not found"
  });
})


.post('/update-reservation', async (req, res) => {
   console.log(req.user);
  if (!req.user) {
    return res.status(404).json({ error: 'User Session Expired' });
  }
  try {
    const {paymentStatus,amount} = req.body;
    
    const userReservation = await reservation.findOne({
      userid:req.user._id,
      status:'reserved',
      
    });
    if(!userReservation){
      return res.status(200).json({ error: 'Reservation Session Booked ' });
    }

    const oldstatus = userReservation.status;

    if (oldstatus=='available'||!userReservation) {
      return res.status(400).json({ error: 'Reservation Session Expired or Not found' });
    }
     
    const filter = {
      seatno: { $in: userReservation.seats },  
      eventId: userReservation.eventid,        
    };
    const success_update = { 
      $set: { 
        status: "booked", 
        bookedBy: req.user._id,
      } 
    }; 

    const failure_update = { 
      $set: { 
        status: "available", 
        bookedBy: null,
      } 
    }; 
    
    userReservation.status = (paymentStatus==='succeeded'?'booked':'available');
    await userReservation.save();
    console.log(userReservation);
    console.log(paymentStatus);
  if(paymentStatus==='succeeded'){
    try{

      const res  = await seat.updateMany(filter,success_update);
      const userbooking = await booking.create({
        userid:req.user._id,
        eventid:userReservation.eventid,
        amount,
      })
      console.log(userbooking);
    }catch(e){

      console.log(e);
    }
    console.log('usereservation',userReservation);
    res.status(200).json({ message: 'Reservation updated successfully', userReservation });
  }
  else{
    const seatresult  = await seat.updateMany(filter,failure_update);
    res.status(200).json({ message: 'Reservation not updated', userReservation });
  }



  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = Reservationrouter

