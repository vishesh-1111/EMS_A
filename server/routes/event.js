const express = require('express');
const eventRouter = express.Router();
const event = require('../models/event');
 const {cloudinary}= require('../cloudinary')
eventRouter
.get('/',async(req,res)=>{
     const allevents = await event.find({});
     return res.status(200).json(allevents);
    })


    .get('/update/:id', async (req, res) => {
      
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }
   
      try {
        const eventUpdate = await event.findByIdAndUpdate(
          req.params.id,
          {
            $inc: { reserved: 1 }         
          },
          { new: true }
        );

        if (!eventUpdate) {
          return res.status(404).json({ message: 'Event not found' });
        }
    
        res.status(200).json({ message: 'Event booked successfully', event: eventUpdate });
      } catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    })

    .get('/:id', async (req, res) => {
      try {
        const ob = await event.findById(req.params.id);
        
        if (!ob) {
          return res.status(404).json({ message: 'Event not found' });
        }
    
        return res.json(ob);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
      }
    })
.post('/',async(req,res)=>{
  if(!req.admin){
    return res.status(404).json({ message: 'Auth Error Admin Not found' });
  }
  try{
  const randomimages = (await cloudinary.api.resources_by_asset_folder('EMS1')).resources
  const newEventData = {
    ...req.body, 
    createdby: req.user._id,
    image : randomimages[Math.floor(Math.random()*10)]
 };

     const resoncreate = await event.create(newEventData);
     return res.status(200).json({resoncreate});
   }
   catch(e){
    console.log(e);
    return res.status(500).json({ message: 'Server error' });
   }


})

.delete('/:id', async (req, res) => {

  console.log('hiippp');
  try {
      const deletedEvent = await event.findByIdAndDelete(req.params.id);
      if (!deletedEvent) {
          return res.status(404).json({ message: 'Event not found' });
      }
   
      console.log(deletedEvent);
      res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
})

 .put('/:id', async (req, res) => {
  console.log(req.body);
  try {
      const updatedEvent = await event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedEvent) {
          return res.status(404).json({ message: 'Event not found' });
      }
      res.json(updatedEvent);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});



module.exports={
   eventRouter, 
}