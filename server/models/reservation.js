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
    seats: {
      type: Array,
      default: [],
    },
    amount : {
      type : Number,
      required : true
    },
    status: {
      type: String,
      default: 'free'
    },
    reservationDate: {
      type: Date,
      default: Date.now
    },

    expiresAt: {
      type: Date,
      default: () => {
        return new Date(Date.now() +  60 * 1000); 
      }
    }
  },
  {
    timestamps: true
  }
);


const reservation = mongoose.model('reservation', ReservationSchema);

module.exports={
  reservation,
}