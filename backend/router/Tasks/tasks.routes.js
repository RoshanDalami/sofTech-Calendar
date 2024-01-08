const {
  createTask,
  updateTask,
  deleteTask,
  getAllTask,
  getTaskById,
  addTodo,
  updateStatus,
  deleteTodo,
  getTodos,
  getAllCompletedTask,
  getTaskByUserId,
  getAllInCompletedTask,
  setCompleted,
  getTodosWithUser,

} = require("./tasks.controller");
const express = require("express");

const TaskRouter = express.Router();

TaskRouter.post("/createTask", createTask);
TaskRouter.post("/updateTask", updateTask);
TaskRouter.delete("/deleteTask", deleteTask);
TaskRouter.get("/getAllTasks", getAllTask);
TaskRouter.get("/getAllCompletedTasks", getAllCompletedTask);
TaskRouter.get("/getAllInCompletedTasks", getAllInCompletedTask);
TaskRouter.get("/getTaskById/:id", getTaskById);
TaskRouter.post("/addTodo/:id", addTodo);
TaskRouter.put("/updateStatus/:id", updateStatus);
TaskRouter.delete("/deleteTodo/:id", deleteTodo);
TaskRouter.get("/getAllTodos", getTodos);
TaskRouter.get("/getTaskByUser/:id", getTaskByUserId);
TaskRouter.put("/setTaskCompleted/:id", setCompleted);
TaskRouter.get("/getTodosByUser/:name",getTodosWithUser)


module.exports = TaskRouter;
