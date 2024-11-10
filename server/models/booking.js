const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    eventid: {
      type: Schema.Types.ObjectId,
      ref: 'event',
      required: true
    },
    vipTickets: {
      type: Number,
      default: 0
    },
    standardTickets: {
      type: Number,
      default: 0
    },
    bookingDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const booking = mongoose.model('booking', BookingSchema);

module.exports={
  booking,
}