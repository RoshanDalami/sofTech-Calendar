const Task = require('../../Model/task.mongo');


async function saveTask(task){
    await Task.findOneAndUpdate({_id:task._id},task,{upsert:true})
}

async function createTask(req,res){
    const task = req.body;
    // await saveTask(task);
    await Task.create(task)

    res.status(200).json(task)
}
// async function updateTask(req,res){
//     const task =req.body;
//     await saveTask(task)
// }


module.exports = {
    createTask
}