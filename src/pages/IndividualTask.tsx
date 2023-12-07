import { useTask } from "../Context";
import { PlusIcon } from "@heroicons/react/24/outline";
import { nanoid } from "nanoid";
import Model from "../components/Model";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

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
  console.log(newTaskList, "new task");

  const singleTask = { ...newTaskList[0] };
  const [todos, setTodos] = useState<TodoType[]>([
    {
      title: "Drag and Drop",
      id: nanoid(),
      assignedTo: "Roshan Dalami",
      createdAt: new Date().toDateString(),
    },
  ]);
  const [inProgress, _setInProgress] = useState<TodoType[]>([
    
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
    console.log("todo");
    setTodos([
      ...todos,
      {
        title: formData.title,
        id: formData.id,
        assignedTo: formData.assignedTo,
        createdAt: formData.createdAt,
      },
    ]);
    console.log(singleTask.todo);
    setFormData({
      title: "",
      id: "",
      assignedTo: "",
      createdAt: new Date().toDateString(),
    });
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
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

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex w-[100vw] relative   min-h-screen flex-col overflow-x-auto  bg-slate-100   md:px-10 ">
          <section className=" pb-2 pt-3  text-3xl">
            <p className="text-3xl font-bold fixed   " key={singleTask.id}>
              {singleTask.title}
            </p>
          </section>

          <div className="flex w-[1000px] md:w-full  overflow-x-scroll mx-5 mt-10   items-center md:justify-between  gap-3 ">
            {/* todo  */}

            <section className=" relative h-[90vh] w-72 md:w-1/4 overflow-hidden rounded-md border border-black/60 ">
              <h1 className="z-10 bg-slate-200 px-1 py-3 text-xl  ">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border-2 border-green-600 "></div>
                  {"Todo"}
                </div>

                <p className="px-1 text-sm">
                  {"This task hasn't been started "}
                </p>
              </h1>
              <Droppable droppableId={singleTask.id} >
                {(provided) => (
                  <div
                    className=" h-[90vh] overflow-auto  "
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {newTaskList.length > 0
                      ? todos.map((todo: any, index) => {
                          return (
                            <Draggable
                              draggableId={todo.title}
                              key={todo.id}
                              index={index}
                  
                            >
                              {(provided, snapshot) => (
                                <section
                                  className={clsx(
                                    "mx-3 my-4 h-24 cursor-pointer rounded-md border border-green-800 bg-green-900/30",
                                    { "bg-red-600/50": snapshot.isDragging }
                                  )}
                                  key={todo.id}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
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

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div
                className=" absolute bottom-0 flex w-full items-center justify-center bg-indigo-600 py-2 text-center text-xl  text-white cursor-pointer "
                onClick={() => setIsModelOpen(true)}
              >
                {"Add Item"}
                <PlusIcon className="h-6 w-10 cursor-pointer " />
              </div>
            </section>
            {/* in progress  */}
            <section className=" relative h-[90vh] w-72 md:w-1/4 overflow-hidden rounded-md border border-black/60 ">
              <h1 className="bg-slate-200 px-1 py-3 text-xl  ">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border-2 border-orange-600 "></div>
                  {"In Progress"}
                </div>
                <p className="px-1 text-sm">
                  {"This is actively being worked on"}
                </p>
              </h1>
              <Droppable droppableId={singleTask.id} >
                {(provided) => (
                  <div className="h-[90vh] overflow-auto" 
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  >
                    {newTaskList.length > 0
                      ? inProgress.map((todo: any,index:number) => {
                          return (
                            <Draggable key={singleTask.id} draggableId={todo.id} index={index} >
                              {
                                (provided,snapshot)=>(

                            <section
                            className={clsx(
                              "mx-3 my-4 h-24 cursor-pointer rounded-md border border-green-800 bg-green-900/30",
                              { "bg-red-600/50": snapshot.isDragging }
                            )}
                            key={todo.id}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            >
                              <p className="mx-3 my-5 text-2xl">{todo.title}</p>
                            </section>
                                )
                              }
                            </Draggable>
                          );
                        })
                      : ""}
                      {provided.placeholder}
                  </div>
                  
                )}
              </Droppable>
              {/* <div className=" absolute bottom-0 flex w-full items-center  border-t border-t-black">
              <input
                type="text"
                className="w-full px-4 py-2 placeholder:text-lg focus:outline-none "
                placeholder="Add Item"
              />

              <PlusIcon className="h-6 w-10 cursor-pointer " />
            </div> */}
            </section>
            {/* completed  */}
            <section className=" relative h-[90vh] w-72 md:w-1/4 overflow-hidden rounded-md border border-black/60 ">
              <h1 className="bg-slate-200 px-1 py-3 text-xl ">
                <div className="flex items-center gap-2 ">
                  <div className="h-5 w-5 rounded-full border-2 border-indigo-600 "></div>
                  {"Complete"}
                </div>
                <p className="px-1 text-sm">This has been completed</p>
              </h1>
              <div className="h-[90vh] overflow-auto">
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
              {/* <div className=" absolute bottom-0 flex w-full items-center  border-t border-t-black">
              <input
                type="text"
                className="w-full px-4 py-2 placeholder:text-lg focus:outline-none "
                placeholder="Add Item"
              />

              <PlusIcon className="h-6 w-10 cursor-pointer " />
            </div> */}
            </section>
            {/* backlog  */}
            <section className=" h-[90vh] md:w-1/4 w-72 overflow-hidden rounded-md border border-black/60 ">
              <h1 className="flex items-center gap-2 bg-slate-200 px-1 py-3 text-xl ">
                <div className="h-5 w-5 rounded-full border-2 border-blue-600 "></div>

                {"Backlogs"}
              </h1>
              <section></section>
            </section>
          </div>
        </div>
      </DragDropContext>
    </>
  );
}
