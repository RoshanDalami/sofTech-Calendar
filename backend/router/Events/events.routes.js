const express = require('express');
const {httpGetAllEvents,httpCreateEvent,httpDeleteEvent,getEventByUserId,getEventsByTitle,getEventsByYear,getEventById} = require('./events.controller');

const EventRouter = express.Router();

EventRouter.get('/getAllEvents',httpGetAllEvents)
EventRouter.post('/createEvent',httpCreateEvent)
EventRouter.delete('/deleteEvent',httpDeleteEvent)
EventRouter.get('/getEventById/:id',getEventByUserId)
EventRouter.get('/getEventByTitle/:title',getEventsByTitle)
EventRouter.get('/getEventByYear/:year',getEventsByYear)
EventRouter.get('/getEventByEventId/:eventId',getEventById)


module.exports = EventRouter

