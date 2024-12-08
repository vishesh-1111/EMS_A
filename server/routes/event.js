const express = require('express');
const eventRouter = express.Router();
const {event} = require('../models/event');
const {isAdmin } = require('../middlewares/authentication');

eventRouter
.get('/',async(req,res)=>{
     const allevents = await event.find({});
     return res.status(200).json(allevents);
    })
    
    .get('/:id', async (req, res) => {
      try {
        console.log('hi');
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
  const newEventData = {
    ...req.body, 
    createdby: req.admin._id 
};

  const thisblog=  await blog.create(newEventData);

})

.delete('/:id', isAdmin, async (req, res) => {

  console.log('hiippp');
  try {
      const deletedEvent = await event.findById(req.params.id);
      if (!deletedEvent) {
          return res.status(404).json({ message: 'Event not found' });
      }
      deletedEvent.isDeleted = true;
      res.json({ message: 'Event deleted successfully' });
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
})

 .put('/:id', isAdmin, async (req, res) => {
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