
const baseurl = "http://localhost:8000/api"


 export const url = {
    getAllEvents :`${baseurl}/events/getAllEvents`,
    postEvent : `${baseurl}/events/createEvent`,
    deleteEvent:`${baseurl}/events/deleteEvent`,
}