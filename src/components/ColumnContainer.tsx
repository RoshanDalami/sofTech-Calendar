import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import { useMemo } from "react";
import Model from "./Model";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
interface Props {
  column: Column;
  createTask: (data: Task, columnId: Id) => void;
  tasks: Task[];
  index: number;
  bgColor: string;
  taskDeleteHandler: (id: Id) => void;
}

export default function ColumnContainer(props: Props) {
  const { column, createTask, taskDeleteHandler, tasks, index, bgColor } =
    props;
  console.log(tasks);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        flex
        h-[500px]
        max-h-[500px]
        w-[350px]
        flex-col
        rounded-md
        bg-gray-200/50
        "
      ></div>
    );
  }
  const { register, handleSubmit, reset } = useForm();

  return (
    <>
      {isModelOpen && (
        <Model>
          <div className="relative rounded-md bg-white p-5 ">
            <div className="absolute right-5 rounded-full bg-black/10 p-2 transition duration-300 hover:bg-black/20 ">
              <XMarkIcon
                className="h-7 w-7 cursor-pointer "
                onClick={() => setIsModelOpen(false)}
              />
            </div>
            <form
              action=""
              className="mt-5 flex flex-col gap-2"
              onSubmit={handleSubmit((data: any) => {
                createTask(data, column.id);
                reset();
                setIsModelOpen(false);
              })}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Task Title</label>
                <input
                  type="text"
                  {...register("content")}
                  className="rounded-md border-2 border-slate-200 px-4 py-2 "
                  placeholder="Eg: Event Management"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Created At</label>
                <input
                  type="text"
                  {...register("createdAt")}
                  value={new Date().toDateString()}
                  className="rounded-md border-2 border-slate-200 px-4 py-2 "
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Assigned To</label>
                <input
                  type="text"
                  {...register("assignedTo")}
                  className="rounded-md border-2 border-slate-200 px-4 py-2 "
                  placeholder="Eg: roshan dalami"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-3 rounded-md bg-indigo-600 py-2 font-bold text-white hover:bg-indigo-700"
              >
                Add Task
              </button>
            </form>
          </div>
        </Model>
      )}
      <div
        ref={setNodeRef}
        style={style}
        className="
    flex
    h-[90vh]
    w-[400px]
flex-col
    overflow-hidden
    rounded-md
    bg-gray-200/50
    "
      >
        {/* column title  */}
        <div
          {...attributes}
          {...listeners}
          className="flex items-center bg-slate-700 px-4 py-3"
        >
          <div
            className={`text-bold text-md ${bgColor} h-5 w-5 rounded-full  `}
          ></div>
          <div className="px-3 text-lg font-bold text-white">
            {column.title}
          </div>
        </div>

        {/* column task container  */}
        <div className="scrollbar-width-thincrollbar-thumb-black scrollbar-track-gray-100 flex flex-grow flex-col gap-2 overflow-y-auto py-3">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => {
              return (
                <TaskCard
                  task={task}
                  key={task.id}
                  taskDeleteHandler={taskDeleteHandler}
                />
              );
            })}
          </SortableContext>
        </div>

        {/* column footer  */}
        {index === 0 && (
          <button
            className="rounded-b-md bg-indigo-600 py-2 text-white"
            onClick={() => {
              // createTask(column.id)

              setIsModelOpen(true);
            }}
          >
            Add Task
          </button>
        )}
      </div>
    </>
  );
}
