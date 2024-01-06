const { createEvents,getAllEvents,deleteEvent } = require('../../Model/event.model')
const Events = require('../../Model/events.mongo')

async function httpCreateEvent(req,res){
    const {eventId,eventTitle,eventDescription,eventStartTime,eventEndTime,eventDateNepali,eventDateEnglish,userDetails} = req.body;

    // const body =  req.body;
    try {
        const task = {eventId,eventTitle,eventDescription,eventStartTime,eventEndTime,eventDateNepali,eventDateEnglish,userDetails} 
        await createEvents(task)

        
        return res.status(200).json({message:'event creation success'})
    } catch (error) {
            return res.status(400).json({message:'Events creation failed'})
    }
}

async function httpGetAllEvents(req,res){
    return res.status(200).json(await getAllEvents() )
}

async function httpDeleteEvent(req,res){
    const {id} = req.body
    return res.status(200).json(await deleteEvent(id))
}

async function getEventByUserId(req,res){
    const id = req.params.id;

    try {
        const response = await Events.find({userDetails:id});
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message:'No match found'})
    }
}

async function getEventsByTitle(req,res){
    const title = req.params.title

    try {
        const response = await Events.find({eventTitle: {$regex:new RegExp(title, 'i') }})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
}

async function getEventsByYear(req,res){
    const year = req.params.year
    try {
        const response = await Events.find({
            $expr: {
              $eq: [
                { $toInt: { $arrayElemAt: [{ $split: ["$eventDateNepali", "-"] }, 0] } },
                { $toInt: year }
              ]
            }
          });
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Internal server error'})
    }
}
module.exports = {
    httpGetAllEvents,
    httpCreateEvent,
    httpDeleteEvent,
    getEventByUserId,
    getEventsByTitle,
    getEventsByYear
}