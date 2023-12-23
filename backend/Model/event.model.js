const Events = require("./events.mongo");

async function saveEvents(event) {
  await Events.findOneAndUpdate({ eventId: event.eventId }, event, {
    upsert: true,
  });
}

async function createEvents(event) {
  const newEvent = Object.assign(event);
  try {
    await saveEvents(newEvent);
    console.log(newEvent, "from model");
  } catch (error) {
    console.log(error);
  }
}

async function getAllEvents() {
  try {
    return await Events.find({}, { __v: 0,_id:0 });
  } catch (error) {
    console.log(error);
  }
}

async function deleteEvent(eventId){
    console.log(eventId,"from model")
   return await Events.deleteOne({eventId:eventId})
}

module.exports = {
  getAllEvents,
  createEvents,
  deleteEvent
};
