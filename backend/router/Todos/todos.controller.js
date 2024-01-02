const Todo = require('../../Model/todo.mongo');

async function saveTodo(todo) {
    await Todo.findOneAndUpdate({ _id: todo._id }, todo, { upsert: true });
  }
async function createTodo (req,res){
    const body = req.body;
    try {
        await Todo.create(body)
        res.status(200).json(body)
    } catch (error) {
        res.status(500).json({message:'Internal Server Error , Todo Creation Failed'})
    }
}
async function getTodos (req,res){
    const respones = await Todo.find({},{__v:0})
    res.status(200).json(respones)
}

async function updateStatus(req,res){
    const todo=req.body;
    try {
        await saveTodo(todo)
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
}

module.exports = {
    createTodo,
    getTodos,
    updateStatus
}