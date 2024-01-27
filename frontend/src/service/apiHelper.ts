export const baseurl = "https://calender-managemnet.onrender.com/api";

export const url = {
  getAllEvents: `${baseurl}/events/getAllEvents`,
  postEvent: `${baseurl}/events/createEvent`,
  deleteEvent: `${baseurl}/events/deleteEvent`,
  getAllTasks: `${baseurl}/tasks/getAllTasks`,
  createTask: `${baseurl}/tasks/createTask`,
  updateTask: `${baseurl}/tasks/updateTask`,
  deleteTask: `${baseurl}/tasks/deleteTask`,
  getTaskById: `${baseurl}/tasks/getTaskById`,
  createTodo: `${baseurl}/tasks/addTodo`,
  updateStatus: `${baseurl}/tasks/updateStatus`,
  deleteTodo: `${baseurl}/tasks/deleteTodo`,
  getAllTodos: `${baseurl}/tasks/getAllTodos`,
  getAllEventsByUser: `${baseurl}/events/getEventById`,
  getAllTaskByUser: `${baseurl}/tasks/getTaskByUser`,
  getAllUser: `${baseurl}/user/getAllUser`,
  getAllInCompletedTask: `${baseurl}/tasks/getAllInCompletedTasks`,
  getAllCompletedTask: `${baseurl}/tasks/getAllCompletedTasks`,
  setCompletedTask: `${baseurl}/tasks/setTaskCompleted`,
  getTaskByAssignee: `${baseurl}/tasks/getTodosByUser`,
  getTodoCountAssignee:`${baseurl}/tasks/getTodoCountForAssignee`,
  deleteUser:`${baseurl}/user/deleteUser`,
  createComment:`${baseurl}/comments/createComment`,
  getCommentByTodoId:`${baseurl}/comments/getCommentByTodoId`
};
