import { Task ,Id} from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TrashIcon } from '@heroicons/react/24/outline'
import { useState } from "react";
interface Props {
  task: Task;
  taskDeleteHandler:(id:Id)=>void;
}

export default function TaskCard({ task,taskDeleteHandler }: Props) {
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
  const [isMouseOver,setIsMouseOver] = useState(false);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-600/50 p-2.5 h-[100px] min-h-[100px] items-center flex  text-left rounded-md mx-4 cursor-grab"
      >
        
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-600/50 p-2.5 h-[100px] min-h-[100px] items-center flex  text-left rounded-md mx-4 cursor-grab justify-between px-4 "
      onMouseEnter={()=>{
        setIsMouseOver(true)
      }}
      onMouseLeave={()=>{
        setIsMouseOver(false)
      }}
    >
      <div>

      <p className="text-white text-lg font-bold">

      {task?.todoTitle}
      </p>
      <p className=" bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center">
        <p className="text-black text-md font-bold">

        {task.assignedTo.split('')[0].toUpperCase()}
        </p>
      </p>
      </div>
     { isMouseOver && <button className="bg-red-600 rounded-md text-white px-2 py-1" onClick={()=>taskDeleteHandler(task._id)}  >
        <TrashIcon className="h-5 w-5" />
      </button>}

    </div>
  );
}
