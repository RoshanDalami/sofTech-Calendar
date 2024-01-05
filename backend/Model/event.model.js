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
   return await Events.deleteOne({eventId:eventId})
}

module.exports = {
  getAllEvents,
  createEvents,
  deleteEvent
};
