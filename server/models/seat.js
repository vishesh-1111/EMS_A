const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId,
      ref: 'event',
      required: true 
  },
  price: { type: Number,
    required: true
}, 
  seatno: { type: Number,
         required: true
  }, 
  type: {
    type: String,
    required: true
},
  status: { 
    type: String, 
    enum: ['available', 'booked', 'reserved'], 
    default: 'available' 
  },

  bookedBy: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'user', 
     default : null
     }, 
});

const seat = mongoose.model('seat', SeatSchema);
module.exports = seat;
