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
    vipTickets: {
      type: Number,
      default: 0
    },
    standardTickets: {
      type: Number,
      default: 0
    },
    cost : {
      type : Number,
      required : true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    status: {
      type: String,
      default: 'pending'
    },
    reservationDate: {
      type: Date,
      default: Date.now
    },

    expiresAt: {
      type: Date,
      default: () => {
        return new Date(Date.now() + 2.0 * 60 * 1000); 
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