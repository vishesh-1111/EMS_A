const express = require('express');
const eventRouter = express.Router();
const {event} = require('../models/event');
const path = require('path');
const {isAdmin } = require('../middlewares/authentication');

eventRouter
.get('/',async(req,res)=>{
     const allevents = await event.find({});
    
     return allevents;
  })

 .get('/:id',async(req,res)=>{
   const event =await event.findById(req.params.id);
   return event;
})
  
.post('/',async(req,res)=>{
  const newEventData = {
    ...req.body, 
    createdby: req.admin._id 
};

  const thisblog=  await blog.create(newEventData);
  console.log(newEventData);
})

.delete('/:id', isAdmin, async (req, res) => {
  try {
      const deletedEvent = await event.findByIdAndDelete(req.params.id);
      if (!deletedEvent) {
          return res.status(404).json({ message: 'Event not found' });
      }
      res.json({ message: 'Event deleted successfully' });
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
})

 .put('/:id', isAdmin, async (req, res) => {
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