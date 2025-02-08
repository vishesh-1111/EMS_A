const mongoose =require('mongoose');
const { array, string } = require('zod');




const eventSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    category : {
        type : String,
        required : true
    },
   
    location : {
        type : String,
        required : true
    },
    tags : {
        type :Array,
        default :['sports','fun']
    },
    description : {
        type : String,
        required : true
    },

    date : {
        type : String,
        default :Date.now().toString() 
    },
   
    reserved : {
        type :Number,
        required : false,
        default : 0,
    },

    bookedBy : {
        type :mongoose.Types.ObjectId,
        required : false,
        default : null,
    }, 
    image : {
        type : mongoose.Schema.Types.Mixed,
        required : true,
        default : {},
    },

    isDeleted : {
        type :Boolean,
        required : false,
        default : false,
    }

    
});

const event=mongoose.model('event',eventSchema);

module.exports=event;


