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
  PointerSensor,
useSensor,
  useSensors
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";


export default function KanbanBoard() {
  const [columns] = useState<Column[]>([
    {
      id: nanoid(),
      title: "Todo",
      color: "bg-red-600",
    },
    {
      id: nanoid(),
      title: "In Progress",
      color: "bg-green-600",
    },
    {
      id: nanoid(),
      title: "Completed",
      color: "bg-blue-600",
    },
    {
      id: nanoid(),
      title: "Backlogs",
      color: "bg-indigo-600",
    },
  ]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const sensor = useSensors(
    useSensor(PointerSensor,{
      activationConstraint:{
        distance:3
      }
    })
  )

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
    setActiveColumn(null);
    setActiveTask(null);
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

  function createTask(data: Task, columnId: Id) {
    const newTask: Task = {
      id: nanoid(),
      columnId,
      content: data.content,
      assignedTo: data.assignedTo,
      createdAt: new Date().toDateString(),
    };

    setTasks([...tasks, newTask]);
console.log(newTask.columnId)
  }
  console.log(tasks);
  function onDragOverHandler(event: DragOverEvent) {
    // console.log(event)
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // here we can have two senario
    // one is we can drop task over another task  or we can drop task over column

    // task over another task
    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    if (!isActiveTask) return;

    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    //dropping a task over a column
    const isOverColumn = over.data.current?.type === "Column";
    if (isActiveTask && isOverColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        // const overIndex = tasks.findIndex(t=>t.id === overId)

        tasks[activeIndex].columnId = overId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  function taskDeleteHandler(id:Id){
    const newTasks = tasks.filter((task)=>task.id !== id)
    setTasks(newTasks)
  }



  return (
    <>
     
      <div>
        <DndContext
        sensors={sensor}
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
          onDragOver={onDragOverHandler}
        >
          <div className="mx-4  my-6 flex items-center gap-4 overflow-auto">
            <SortableContext items={columnsId}>
              {columns?.map((col, index) => {
                return (
                  <ColumnContainer
                    key={col.id}
                    index={index}
                    bgColor={col.color}
                    column={col}
                    taskDeleteHandler={taskDeleteHandler}
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
                  taskDeleteHandler={taskDeleteHandler}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}

                />
              )}
              {activeTask && <TaskCard task={activeTask} taskDeleteHandler={taskDeleteHandler} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </>
  );
}
