import { Task, Id } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { json } from "react-router-dom";
interface Props {
  task: Task;
  taskDeleteHandler: (id: Id) => void;
}

export default function TaskCard({ task, taskDeleteHandler }: Props) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });
  const [isMouseOver, setIsMouseOver] = useState(false);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="mx-4 flex h-[100px] min-h-[100px] cursor-grab items-center  rounded-md bg-gray-600/50 p-2.5 text-left"
      ></div>
    );
  }
  const nameObj = JSON.parse(task.assignedTo);
  const firstNameLetter = nameObj?.firstname?.charAt(0);
  const lastNameLetter = nameObj?.lastname?.charAt(0);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`mx-4 flex h-[100px] min-h-[100px] cursor-grab items-center  justify-between rounded-md bg-gray-600/50 p-2.5 px-4 text-left ${
        task?.columnId === "1"
          ? "bg-red-600/70"
          : task?.columnId === "2"
          ? "bg-green-600/70"
          : task?.columnId === "3"
          ? "bg-blue-600/70"
          : "bg-yellow-600/70"
      } `}
      onMouseEnter={() => {
        setIsMouseOver(true);
      }}
      onMouseLeave={() => {
        setIsMouseOver(false);
      }}
    >
      <div>
        <p className="text-lg font-bold text-white">{task?.todoTitle}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        {isMouseOver && (
          <button
            className="rounded-md bg-red-600 px-2 py-1 text-white"
            onClick={() => taskDeleteHandler(task._id)}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
        <p className=" flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
          <p className="text-md font-bold text-black">
            {firstNameLetter}{lastNameLetter}
          </p>
        </p>
      </div>
    </div>
  );
}
