const { createEvents,getAllEvents,deleteEvent } = require('../../Model/event.model')


async function httpCreateEvent(req,res){
    const {eventId,eventTitle,eventDescription,eventStartTime,eventEndTime,eventDateNepali,eventDateEnglish,userDetails} = req.body;
    console.log(eventId,eventTitle,eventDescription,eventStartTime,eventEndTime,eventDateNepali,eventDateEnglish,userDetails,'event created')
    // const body =  req.body;
    try {
        const task = {eventId,eventTitle,eventDescription,eventStartTime,eventEndTime,eventDateNepali,eventDateEnglish,userDetails} 
        await createEvents(task)
        // console.log(task,'hellllllo')
        
        return res.status(200).json({message:'event creation success'})
    } catch (error) {
        console.log(error)
            return res.status(400).json({message:'Events creation failed'})
    }
}

async function httpGetAllEvents(req,res){
    return res.status(200).json(await getAllEvents() )
}

async function httpDeleteEvent(req,res){
    const {id} = req.body
    console.log(id,'controller')
    return res.status(200).json(await deleteEvent(id))
}

module.exports = {
    httpGetAllEvents,
    httpCreateEvent,
    httpDeleteEvent
}