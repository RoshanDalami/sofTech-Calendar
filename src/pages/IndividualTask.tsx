import { useTask } from "../Context";
import { PlusIcon } from "@heroicons/react/24/outline";
import { nanoid } from "nanoid";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { useParams } from "react-router-dom";

export default function IndividualTask() {
  const { taskList } = useTask();
  const { taskID } = useParams();

  const newTaskList = taskList.filter((task) => task.id === taskID);
  console.log(newTaskList, "new task");

  return (
    <div className="flex min-h-screen flex-col border bg-slate-100  px-10 ">
      <section className="pb-2 pt-4 text-3xl">
        {
          newTaskList.map((item)=>{
            return(

              <p className="text-3xl font-bold" key={item.id} >{item.title}</p>
            )
          })
        }
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
                    ? newTaskList.map((task) => {
                        return task.todo.map((todo, index) => {
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
                        });
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
                ? newTaskList.map((task) => {
                    return task.inprogress.map((todo) => {
                      return (
                        <section
                          className="mx-3 my-4 h-24 rounded-md border border-black/50 bg-slate-300/30"
                          key={todo.id}
                        >
                          <p className="mx-3 my-5 text-2xl">{todo.title}</p>
                        </section>
                      );
                    });
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
                ? newTaskList.map((task) => {
                    return task.complete.map((todo) => {
                      return (
                        <section
                          className="mx-3 my-4 h-24 rounded-md border border-black/50 bg-slate-300/30"
                          draggable="true"
                          key={todo.id}
                        >
                          <p className="mx-3 my-5 text-2xl">{todo.title}</p>
                        </section>
                      );
                    });
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
  );
}

// gpt
