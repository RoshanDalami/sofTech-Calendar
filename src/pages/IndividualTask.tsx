import { useTask } from "../Context";
import { PlusIcon } from "@heroicons/react/24/outline";
import { nanoid } from "nanoid";
import Model from "../components/Model";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { XMarkIcon } from '@heroicons/react/24/outline'

export interface TodoType {
  id: string;
  title: string;
  assignedTo: string;
  createdAt:string
}

export default function IndividualTask() {
  const { taskList } = useTask();
  const { taskID } = useParams();

  const newTaskList = taskList.filter((task) => task.id === taskID);
  console.log(newTaskList, "new task");

  const singleTask = { ...newTaskList[0] };
  console.log(singleTask, "object from array");

  const [formData, setFormData] = useState<TodoType>({
    title: "",
    id: nanoid(),
    assignedTo: "",
    createdAt: new Date().toDateString()
  });
  const [isModelOpen,setIsModelOpen] = useState(false)
  const addTodo = (item: TodoType,e:FormEvent) => {
    e.preventDefault()
    console.log('todo')
    singleTask.todo.push(item);
    console.log(singleTask.todo)
    setFormData({
      title:'',
      id:'',
      assignedTo:'',
      createdAt:''

    })
  };

  return (
    <>
    {
      isModelOpen && 
      <Model>
        <div className="rounded-md bg-white p-5 relative">
            <div className="bg-black/10 absolute right-5 rounded-full p-2 hover:bg-black/20 transition duration-300 ">

            <XMarkIcon className="h-7 w-7 cursor-pointer " onClick={()=>setIsModelOpen(false)} />
            </div>
            <form action="" className="flex flex-col gap-2 mt-5" onSubmit={(e)=>{addTodo(formData,e)}} >
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
                <input type="text" name="title" value={formData.createdAt} className="border-2 border-slate-200 px-4 py-2 rounded-md "
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
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md py-2 mt-3" > 
                  Add Task
              </button>
            </form>
          </div>
      </Model>
    }
    <div className="flex min-h-screen flex-col border bg-slate-100  px-10 ">
      <section className="pb-2 pt-4 text-3xl">
        <p className="text-3xl font-bold" key={singleTask.id}>
          {singleTask.title}
        </p>
      </section>

      <DragDropContext
        onDragEnd={(result) => {
          console.log(result);
        }}
      >
        <section className="flex w-[100%]  items-center justify-between  gap-3 overflow-auto">
          {/* todo  */}
          <Droppable droppableId={nanoid()}>
            {(provided) => (
              <section
                className=" relative h-[70vh] w-1/4 overflow-hidden rounded-md border border-black/60 "
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h1 className="z-10 bg-slate-200 px-1 py-3 text-xl  ">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full border-2 border-green-600 "></div>
                    {"Todo"}
                  </div>

                  <p className="px-1 text-sm">
                    {"This task hasn't been started "}
                  </p>
                </h1>
                <div className="h-[57vh] overflow-auto  ">
                  {newTaskList.length > 0
                    ? singleTask.todo.map((todo: any, index) => {
                        return (
                          <Draggable draggableId={todo.id} index={index}>
                            {(provided) => (
                              <section
                                className="mx-3 my-4 h-24 cursor-pointer rounded-md border border-black/50 bg-slate-300/30 "
                                key={todo.id}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                              >
                                <p className="mx-3 my-5 text-2xl ">
                                  {todo.title}
                                </p>
                              </section>
                            )}
                          </Draggable>
                        );
                      })
                    : ""}
                </div>
                <div className=" absolute bottom-0 flex w-full items-center justify-center bg-indigo-600 py-2 text-center text-xl  text-white cursor-pointer " onClick={()=>setIsModelOpen(true)} >
                  {"Add Item"}
                  <PlusIcon className="h-6 w-10 cursor-pointer " />
                </div>
              </section>
            )}
          </Droppable>

          {/* in progress  */}
          <section className=" relative h-[70vh] w-1/4 overflow-hidden rounded-md border border-black/60 ">
            <h1 className="bg-slate-200 px-1 py-3 text-xl  ">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border-2 border-orange-600 "></div>
                {"In Progress"}
              </div>
              <p className="px-1 text-sm">
                {"This is actively being worked on"}
              </p>
            </h1>
            <div className="h-[57vh] overflow-auto">
              {newTaskList.length > 0
                ? singleTask.inprogress.map((todo: any) => {
                    return (
                      <section
                        className="mx-3 my-4 h-24 rounded-md border border-black/50 bg-slate-300/30"
                        key={todo.id}
                      >
                        <p className="mx-3 my-5 text-2xl">{todo.title}</p>
                      </section>
                    );
                  })
                : ""}
            </div>
            <div className=" absolute bottom-0 flex w-full items-center  border-t border-t-black">
              <input
                type="text"
                className="w-full px-4 py-2 placeholder:text-lg focus:outline-none "
                placeholder="Add Item"
              />

              <PlusIcon className="h-6 w-10 cursor-pointer " />
            </div>
          </section>
          {/* completed  */}
          <section className=" relative h-[70vh] w-1/4 overflow-hidden rounded-md border border-black/60 ">
            <h1 className="bg-slate-200 px-1 py-3 text-xl ">
              <div className="flex items-center gap-2 ">
                <div className="h-5 w-5 rounded-full border-2 border-indigo-600 "></div>
                {"Complete"}
              </div>
              <p className="px-1 text-sm">This has been completed</p>
            </h1>
            <div className="h-[57vh] overflow-auto">
              {newTaskList.length > 0
                ? singleTask.complete.map((todo: any) => {
                    return (
                      <section
                        className="mx-3 my-4 h-24 rounded-md border border-black/50 bg-slate-300/30"
                        draggable="true"
                        key={todo.id}
                      >
                        <p className="mx-3 my-5 text-2xl">{todo.title}</p>
                      </section>
                    );
                  })
                : ""}
            </div>
            <div className=" absolute bottom-0 flex w-full items-center  border-t border-t-black">
              <input
                type="text"
                className="w-full px-4 py-2 placeholder:text-lg focus:outline-none "
                placeholder="Add Item"
              />

              <PlusIcon className="h-6 w-10 cursor-pointer " />
            </div>
          </section>
          {/* backlog  */}
          <section className=" h-[70vh] w-1/4 overflow-hidden rounded-md border border-black/60 ">
            <h1 className="flex items-center gap-2 bg-slate-200 px-1 py-3 text-xl ">
              <div className="h-5 w-5 rounded-full border-2 border-blue-600 "></div>

              {"Backlogs"}
            </h1>
            <section></section>
          </section>
        </section>
      </DragDropContext>
    </div>
    </>
  );
}

// gpt
