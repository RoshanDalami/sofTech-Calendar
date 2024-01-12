export type Id = string | number;
export type Column = {
  id: Id;
  title: string;
  color: string;
};

export type Task = {
  [x: string]: Id;
  id: Id;
  columnId: Id;
  todoTitle: string;
  assignedTo: string;
  taskId: string;
  userDetails: string;
};

export type Event = {
  eventId: string;
  eventTitle: string;
  eventDescription: string;
  eventStartTime: string;
  eventEndTime: string;
  eventDateNepali: string;
  eventDateEnglish: string;
  userDetails: string;
};

export type User = {
  message: string;
  status: number;
  data: {
    _id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    // firstname:string;
    // lastname:string;
  };
  token: string;
};
export type UserNew = {
  message: string;
  status: number;
  data: {
    _id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    firstname:string;
    lastname:string;
  };
  token: string;
};
export type IUser = {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  firstname: string;
  lastname: string;
};
export type TodoType = {
  id: string;
  todoTitle: string;
  columnId: string;
  assignedTo: string;
};

export type TaskType = {
  userDetails: string;

  taskTitle: string;
  taskDescription: string;
  _id: string;
  taskId: string;
  isCompleted: boolean;
  todos: TodoType[];
};

export type Todos = {
  _id: string;
  count: number;
};

export type Comment = {
  userDetails:UserNew,
  content:string,
  todoId:string,
  createdAt:Date,
  updatedAt:Date,
  _id:string
}