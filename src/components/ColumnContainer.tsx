import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column,Id , Task  } from "../types";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import { useMemo } from "react";


interface Props {
  column: Column;
  createTask : (columnId:Id) =>void;
  tasks: Task[],
  index: number,
  bgColor:string
}

export default function ColumnContainer(props: Props) {
  const { column , createTask , tasks , index ,bgColor} = props;

  const tasksIds = useMemo(()=>{ return tasks.map(task=>task.id) },[tasks])
  const { setNodeRef, attributes, listeners , transform, transition, isDragging } =
    useSortable({
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
  if(isDragging){
    return (
        <div ref={setNodeRef}
        style={style}  className="
        bg-gray-200/50
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
        " ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
    bg-gray-200/50
    w-[400px]
    h-[90vh]
overflow-hidden
    rounded-md
    flex
    flex-col
    "
    >
      {/* column title  */}
      <div {...attributes} {...listeners} className="bg-slate-700 py-3 flex items-center px-4"  >
        <div className={`text-bold text-md ${bgColor} w-5 h-5 rounded-full  `} >

        </div>
        <div className="text-white font-bold text-lg px-3">

        {column.title}
        </div>
      </div>

      {/* column task container  */}
      <div className="flex flex-grow flex-col gap-2 overflow-y-auto py-3 scrollbar-width-thincrollbar-thumb-black scrollbar-track-gray-100">
        <SortableContext items={tasksIds} >

        {
            tasks.map((task)=>{
                return(
                   
                    <TaskCard task={task} key={task.id} />
                )
            })
        }
        </SortableContext>
      </div>

      {/* column footer  */}
      {
        index === 0 && 
      <button className="bg-indigo-600 text-white rounded-b-md py-2" onClick={()=>createTask(column.id)} >
        Add Task
      </button>
      }
    </div>
  );
}
