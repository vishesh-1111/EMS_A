const mongoose =require('mongoose');

const eventSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    path : {
        type : String,
    },

    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    category : {
        type : String,
        required : true
    },
   
    location : {
        type : String,
        required : true
    },
    totalseats : {
      type : Number,
      required : true
    },
    reservedSeats: {
        type: Number,
        default: 0
    },
    description : {
        type : String,
        required : true
    },
    ticketprice : {
        vip : {
            type : Number,
            required : true
        },
        standard : {
            type : Number,
            required : true
        },
    },
    coverimageUri : {
        type : String,
        required : false
    },

    createdby : {
         type : mongoose.Schema.Types.ObjectId,
         ref : 'admin',
         required : true
    }   
    
});


eventSchema.pre('save', function(next) {
    const totalSeats = this.totalseats;
    const vipSeats = this.ticketprice.vip;
    const standardSeats = this.ticketprice.standard;

    if (vipSeats + standardSeats !== totalSeats) {
        return next(new Error('The sum of VIP and standard seats must be equal total seats.'));
    }
    next();
});

const event=mongoose.model('event',eventSchema);

module.exports={
    event,
}


