const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    eventId:{
        type:String,
        required:[true,'Event id is required']
    },
    eventTitle:{
        type:String,
        required:[true,'Event title is required']
    },
    eventDescription:{
        type:String,
        required:[true,'Event description is required']
    },
    eventStartTime:{
        type:String,
        required:[true,'Event start time is required']
    },
    eventEndTime:{
        type:String,
        required:[true,'Event end time is required']
    },
    eventDateNepali:{
        type:String,
        required:[true,'Date is required']
    },
    eventDateEnglish:{
        type:String,
        required:[true,'Date is required']
    },
    userDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

},{timestamps:true})

  const Events = mongoose.model('Event',eventsSchema)

  module.exports = Events

