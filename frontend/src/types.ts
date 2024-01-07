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
};

export type TaskType = {
  [x: string]: string;
  taskTitle: string;
  taskDescription: string;
  _id: string;
  taskId: string;
  isCompleted : boolean  ;
  todos:[
    {   id:String,
        todoTitle:String,
        columnId:String ,
        assignedTo:String
    }
  ]
};

export type Todos = {
  _id: string;
  count: number;
};
