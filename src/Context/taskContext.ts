import React from "react";


export interface TodoTaskType {
  title:string
  id:string
  assignedTo: string
}
export interface TaskType {
  title: string;
  id: string;
  createdAt: string;
  assignedTo: string;
  description: string;
  todo:TodoTaskType[];
  inprogress: TodoTaskType [
  ];
  complete: TodoTaskType[
  ];
}


export interface TaskContextProps {
  taskList: TaskType[];
  addTask: (event: TaskType) => void;
  
}



export const TaskContext = React.createContext<TaskContextProps>({
  taskList: [],
  addTask: (_item: TaskType) => {},
});

export const useTask = () => {
  return React.useContext(TaskContext);
};

export const TaskProvider = TaskContext.Provider;
