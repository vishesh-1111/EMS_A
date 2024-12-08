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
    
    cost : {
        type : Number,
        required :true
    },
    cardNumber: {
        type : Number,
        required :true
    },
    expirationDate: {
        type : Date,
        required :true
    },
  },
  {
    timestamps: true
  }
);


const payment = mongoose.model('payment', BookingSchema);

module.exports={
  payment,
}