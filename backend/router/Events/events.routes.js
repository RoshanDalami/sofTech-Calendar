const express = require('express');
const {httpGetAllEvents,httpCreateEvent,httpDeleteEvent} = require('./events.controller');

const EventRouter = express.Router();

EventRouter.get('/getAllEvents',httpGetAllEvents)
EventRouter.post('/createEvent',httpCreateEvent)
EventRouter.delete('/deleteEvent',httpDeleteEvent)


module.exports = EventRouter

