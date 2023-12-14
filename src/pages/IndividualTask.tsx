import { useTask } from "../Context";
import { PlusIcon } from "@heroicons/react/24/outline";
import { nanoid } from "nanoid";
import Model from "../components/Model";

import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

import KanbanBoard from "../components/KanbanBoard";

export interface TodoType {
  id: string;
  title: string;
  assignedTo: string;
  createdAt: string;
}

export default function IndividualTask() {
  const { taskList } = useTask();
  const { taskID } = useParams();
  const newTaskList = taskList.filter((task) => task.id === taskID);

  const singleTask = { ...newTaskList[0] };
  const [todos, setTodos] = useState<TodoType[]>([
    {
      title: "Drag and Drop",
      id: nanoid(),
      assignedTo: "Roshan Dalami",
      createdAt: new Date().toDateString(),
    },
  ]);



  const [formData, setFormData] = useState<TodoType>({
    title: "",
    id: nanoid(),
    assignedTo: "",
    createdAt: new Date().toDateString(),
  });
  const [isModelOpen, setIsModelOpen] = useState(false);
  const addTodo = (_item: TodoType, e: FormEvent) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        title: formData.title,
        id: formData.id,
        assignedTo: formData.assignedTo,
        createdAt: formData.createdAt,
      },
    ]);
    setIsModelOpen(false)

    setFormData({
      title: "",
      id: "",
      assignedTo: "",
      createdAt: new Date().toDateString(),
    });
  };
  
  return (
    <>
      {isModelOpen && (
        <Model>
          <div className="rounded-md bg-white p-5 relative ">
            <div className="bg-black/10 absolute right-5 rounded-full p-2 hover:bg-black/20 transition duration-300 ">
              <XMarkIcon
                className="h-7 w-7 cursor-pointer "
                onClick={() => setIsModelOpen(false)}
              />
            </div>
            <form
              action=""
              className="flex flex-col gap-2 mt-5"
              onSubmit={(e) => {
                addTodo(formData, e);
              }}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Task Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                  className="border-2 border-slate-200 px-4 py-2 rounded-md "
                  placeholder="Eg: Event Management"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Created At</label>
                <input
                  type="text"
                  name="title"
                  value={formData.createdAt}
                  className="border-2 border-slate-200 px-4 py-2 rounded-md "
                  required
                />
              </div>
              {/* <div className="flex flex-col gap-2">
                <label htmlFor="title">Assigned To</label>
                <input
                  type="text"
                  name="title"
                  value={formData.assingedTo}
                  onChange={(e) => {
                    setFormData({ ...formData, assingedTo: e.target.value });
                  }}
                  className="border-2 border-slate-200 px-4 py-2 rounded-md "
                  placeholder="Eg: roshan dalami"
                  required
                />
              </div> */}
              {/* <div className="flex flex-col gap-2">
                <label htmlFor="title">Description</label>
                <input
                  type="text"
                  name="title"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                  }}
                  className="border-2 border-slate-200 px-4 py-2 rounded-md "
                  placeholder="Eg: Should be ended at 3:00 PM"
                  required
                />
              </div> */}
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md py-2 mt-3"
              >
                Add Task
              </button>
            </form>
          </div>
        </Model>
      )}

      <div>
        <p className="text-2xl font-bold text-white px-4 py-3">

      {singleTask.title}
        </p>
      </div>

      <KanbanBoard/>

      
    </>
  );
}
