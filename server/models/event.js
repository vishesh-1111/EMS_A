const mongoose =require('mongoose');
const { array } = require('zod');




const eventSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    
    path : {
        type : String,
        required : true
    },
     
    duration : {
        type :String,
        required : true
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
    standardseats : {
      type : Number,
      required : true
    },
    vipseats : {
        type : Number,
        required : true
      },
    tags : {
        type :Array,
        required :true,
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

    isDeleted : {
        type : Boolean,
        required : true,
        default : false
    },
    
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

module.exports=event;


