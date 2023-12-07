
import React from "react";
//example task
// {
//   title: 'Drag and Drop Feature',
// id: nanoid(),
// createdAt: new Date().toDateString(),
// assignedTo: 'Roshan Dalami',
// description: 'Enhance task management panel',
// todo:[
// {
// title:'Card Bg green',
// id:nanoid(),
// assignedTo:'Roshan Dalami'
// },
// {
// title:'Increase Panel height',
// id:nanoid(),
// assignedTo:'Roshan Dalami'
// },
// {
// title:'Make Scrollable',
// id:nanoid(),
// assignedTo:'Roshan Dalami',
// },
// ],
// inprogress:[
// {
//   title:'Card Bg green',
//   id:nanoid(),
//   assignedTo:'Roshan Dalami'
// },
//   {
//   title:'Increase Panel height',
//   id:nanoid(),
//   assignedTo:'Roshan Dalami'
// },
//   {
//   title:'Make Scrollable',
//   id:nanoid(),
//   assignedTo:'Roshan Dalami',
// },

// ],
// complete: [
// {
//   title:'Card Bg green',
//   id:nanoid(),
//   assignedTo:'Roshan Dalami'
// },
//   {
//   title:'Increase Panel height',
//   id:nanoid(),
//   assignedTo:'Roshan Dalami'
// },
//   {
//   title:'Make Scrollable',
//   id:nanoid(),
//   assignedTo:'Roshan Dalami',
// },
// ],
// backlogs:[{
// title:'Card Bg green',
// id:nanoid(),
// assignedTo:'Roshan Dalami'
// },
// {
// title:'Increase Panel height',
// id:nanoid(),
// assignedTo:'Roshan Dalami'
// },
// {
// title:'Make Scrollable',
// id:nanoid(),
// assignedTo:'Roshan Dalami',
// },]
// }

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
  backlogs:TodoTaskType[]
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
