const Task = require("../../Model/task.mongo");

async function saveTask(task) {
  await Task.findOneAndUpdate({ _id: task._id }, task, { upsert: true });
}

async function createTask(req, res) {
  const task = req.body;

  if (!task) res.status(400).json({ message: "Bad Request" });
  try {
    await Task.create(task);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
}
async function updateTask(req, res) {
  const task = req.body;
  if (!task) res.status(400).json({ message: "Bad Request" });
  try {
    await saveTask(task);
    res.status(200).json({ message: "task updated", task: task });
  } catch (error) {
    res.status(400).json({ message: "Bad Request" });
  }
}
async function deleteTask(req, res) {
  const id = req.query.id;

  try {
    await Task.findByIdAndDelete({ _id: id });
    return res.status(200).json({ message: "task deleted successfully" });
  } catch (error) {
    res.status(400).json({message:"Bad Request"})
  }
}
async function getAllTask(req,res){
  const tasks = await Task.find({},{__v:0})
  res.status(200).json(tasks)
}
async function getTaskById(req,res){
  try {
    const id = req.params.id;

    const taskById = await Task.findById({_id:id},{__v:0})
    res.status(200).json(taskById)
  } catch (error) {
    res.status(200).json(error)
  }
}

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTask,
  getTaskById
};
