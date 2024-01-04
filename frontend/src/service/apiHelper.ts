
const baseurl = "http://localhost:8000/api"


 export const url = {
    getAllEvents :`${baseurl}/events/getAllEvents`,
    postEvent : `${baseurl}/events/createEvent`,
    deleteEvent:`${baseurl}/events/deleteEvent`,
    getAllTasks:`${baseurl}/tasks/getAllTasks`,
    createTask:`${baseurl}/tasks/createTask`,
    updateTask:`${baseurl}/tasks/updateTask`,
    deleteTask:`${baseurl}/tasks/deleteTask`,
    getTaskById:`${baseurl}/tasks/getTaskById`,
    createTodo:`${baseurl}/tasks/addTodo`,
    updateStatus:`${baseurl}/tasks/updateStatus`


}