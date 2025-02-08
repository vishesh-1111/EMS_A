const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema(
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

    reservationDate: {
      type: Date,
      default: Date.now
    },

  },
  {
    timestamps: true
  }
);


const reservation = mongoose.model('reservation', ReservationSchema);

module.exports={
  reservation,
}