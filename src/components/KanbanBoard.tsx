import { useMemo, useState } from "react";
import { Column, Task, Id } from "../types";
import { nanoid } from "nanoid";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";

export default function KanbanBoard() {
  const [columns] = useState<Column[]>([
    {
        id:nanoid(),
        title:'Todo',
        color:'bg-red-600'
    },
    {
        id:nanoid(),
        title:'In Progress',
        color:'bg-green-600'
    },
    {
        id:nanoid(),
        title:'Completed',
        color:'bg-blue-600'
    },
    {
        id:nanoid(),
        title:'Backlogs',
        color:'bg-indigo-600'
    },
  ]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

//   function createNewColumn() {
//     const columnToAdd: Column = {
//       id: nanoid(),
//       title: `Column ${columns.length + 1}`,
//     };
//     setColumns([...columns, columnToAdd]);
//   }
  function onDragStartHandler(event: DragStartEvent) {
    console.log("Drag start", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }
  function onDragEndHandler(event: DragEndEvent) {
    setActiveColumn(null)
    setActiveTask(null)
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // setColumns((columns) => {
    //   const activeColumnIndex = columns.findIndex(
    //     (col) => col.id === activeId
    //   );
    //   const overColumnIndex = columns.findIndex(
    //     (col) => col.id === overId
    //   );
    //   return arrayMove(columns, activeColumnIndex, overColumnIndex);
    // });
  }
  function createTask(columnId: Id) {
    const newTask: Task = {
      id: nanoid(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  }
  function onDragOverHandler(event:DragOverEvent){
    // console.log(event)
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;


    // here we can have two senario 
    // one is we can drop task over another task  or we can drop task over column 

    // task over another task 
    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    if(!isActiveTask) return ;

    if(isActiveTask && isOverTask){
        setTasks(tasks => {
            const activeIndex = tasks.findIndex(t=>t.id === activeId)
            const overIndex = tasks.findIndex(t=>t.id === overId)

            tasks[activeIndex].columnId = tasks[overIndex].columnId

            return arrayMove(tasks,activeIndex,overIndex)
        })
    }

    //dropping a task over a column
    const isOverColumn = over.data.current?.type === "Column";
    if(isActiveTask && isOverColumn){
        setTasks(tasks => {
            const activeIndex = tasks.findIndex(t=>t.id === activeId)
            // const overIndex = tasks.findIndex(t=>t.id === overId)

            tasks[activeIndex].columnId = overId

            return arrayMove(tasks,activeIndex,activeIndex)
        })
    }

  }
  return (
    <div>
      <DndContext onDragStart={onDragStartHandler} onDragEnd={onDragEndHandler} onDragOver={onDragOverHandler} >
        <div className="flex  items-center gap-4 overflow-auto my-6 mx-4">
          <SortableContext items={columnsId}>
            {columns?.map((col,index) => {
              return (
                <ColumnContainer
                  key={col.id}
                  index={index}
                  bgColor={col.color}
                  column={col}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              );
            })}
          </SortableContext>
          {/* <button
            className="bg-indigo-600 py-2 px-4 rounded-md"
            onClick={createNewColumn}
          >
            Add Column
          </button> */}
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                index={0}
                bgColor=""
                createTask={createTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
