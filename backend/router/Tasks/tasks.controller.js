const Task = require("../../Model/task.mongo");
const sendEmail = require('../../utils/mailer')

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
    res.status(400).json({ message: "Bad Request" });
  }
}
async function getAllTask(req, res) {
  const tasks = await Task.find({}, { __v: 0 });
  res.status(200).json(tasks);
}
async function getTaskById(req, res) {
  try {
    const id = req.params.id;

    const taskById = await Task.findById({ _id: id }, { __v: 0 });
    res.status(200).json(taskById);
  } catch (error) {
    res.status(200).json(error);
  }
}
async function addTodo(req, res) {
  try {
    const id = req.params.id;

    const todo = req.body;
    

    const result = await Task.updateOne(
      { _id: id },
      { $push: { todos: todo } },
    );
    if(result){
      const emailObj = JSON.parse(todo.assignedTo);
      const email = emailObj.email;
      const username = emailObj.username;
      console.log(email)
      const title = todo.todoTitle
      await sendEmail(email,username,title)
    } 

    res.status(200).json({ message: "Todo created Successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Todo creation failed" });
  }
}
async function updateStatus(req, res) {
  const id = req.params.id;
  const data = req.body;
  const todoId = data.todoId;
  const columnId = data.columnId;
  try {
    const result = Task.findOne({ _id: id }).then((doc) => {
      item = doc.todos.id(todoId);
      item.columnId = columnId;
      doc.save();
    });
    // await updateTodoStatus(id, todoId, status);
    return res
      .status(200)
      .json({ message: "Todo status updated successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
}
async function deleteTodo(req, res) {
  const id = req.params.id;
  const { todoId } = req.body;
  try {
    await Task.findOne({ _id: id }).then((doc) => {
      doc.todos.pull({ _id: todoId });
      doc.save();
    });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getTodos(req, res) {
  const id = req.params.id;
  try {
    const result = await Task.aggregate([
      {
        $unwind: {
          path: "$todos",
        },
      },
      {
        $group: {
          _id: "$todos.columnId",
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getTaskByUserId(req, res) {
  const userId = req.params.id;
  try {
    const response = await Task.find({ userDetails: userId });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getAllCompletedTask(req, res) {
  try {
    const response = await Task.find({ isCompleted: true });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
async function getAllInCompletedTask(req, res) {
  try {
    const response = await Task.find({ isCompleted: false });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function setCompleted(req, res) {
  const id = req.params.id;
  try {
    const response = await Task.findOne({ _id: id }).then((doc) => {
      doc.isCompleted = true;
      doc.save();
    });

    res.status(200).json({ messages: "Task marked completed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// async function getTodosWithUser(req, res) {
//   const name = req.params.name;
//   try {
//     const response = await Task.find({
//       todos: {
//         $elemMatch: {
//           assignedTo: name,
//         },
//       },
//     });
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }
async function getTodosWithUser(req, res) {
  const name = req.params.name;
  
  try {
    const response = await Task.find({
      "todos.assignedTo": {
        $regex: new RegExp(name, 'i'), // Case-insensitive match
      },
    });
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}


module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTask,
  getTaskById,
  addTodo,
  updateStatus,
  deleteTodo,
  getTodos,
  getTaskByUserId,
  getAllCompletedTask,
  getAllInCompletedTask,
  setCompleted,
  getTodosWithUser,

};
