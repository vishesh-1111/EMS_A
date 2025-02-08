const {Router}  = require('express');
const Reservationrouter = Router();
const {reservation} = require('../models/reservation');

Reservationrouter
.get('/status/:id',async(req,res)=>{
  console.log('status',req.user);
  
  if(!req.user){
    console.log('nooo server')
    return res.status(400).json({ message: 'Server error' });
  }
  
  // if(!req.user||!(req.user.role==='admin')){
    
  //   return res.status(403).json({
    //     message : "Unauthorised"
    //   })
    //  }
      // console.log('noo');
      const userid = req.user._id;
    try {
    const userreservation = await reservation.findOne({
      userid,
      eventid:req.params.id,
    });

    console.log(userreservation)
     
   if(!userreservation){
    return res.status(400).json({ message: 'Server error' });
   }

   return res.status(200).json({ message: 'Booked by user' });

  } catch (error) {
    console.error('Error fetching ActiveREservations:', error);
    
    return res.status(500).json({ message: 'Server error' });
  }
})

.post('/:id', async (req, res) => {
 
  if (!req.user) {
    return res.status(404).json({ message: 'User not found' });
  }
 
  const userid = req.user._id;
  console.log('postres',userid);
  try {
    const eventUpdate = await reservation.create(
      {
        userid,
        eventid:req.params.id,
      }
    );

    if (!eventUpdate) {
      return res.status(404).json({ message: 'Event not found' });
    }
   
    res.status(200).json({ message: 'Event booked successfully', event: eventUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})


module.exports = Reservationrouter

