import React from "react";
import { nanoid } from "nanoid";

export interface TaskType {
  title: string;
  id: string;
  createdAt: string;
  assignedTo: string;
  description: string;
  todo: [
    {
      title: string;
      id: string;
      assignedTo: string;
    }
  ];
  inprogress: [
    {
      title: string;
      id: string;
      assignedTo: string;
    }
  ];
  complete: [
    {
      title: string;
      id: string;
      assignedTo: string;
    }
  ];
}

export const TaskContext = React.createContext({
  taskList: [
    {
      title: "Task Management",
      id: nanoid(),
      createdAt: new Date().toDateString(),
      assignedTo: "roshan dalami",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis cupiditate ipsam provident hic necessitatibus qui. Labore odit, ut voluptate excepturi vero unde eius enim quas veritatis alias dolore iusto veniam!",
      todo: [
        {
          title: "todo task 1",
          id: nanoid(),
          assginedTo: "roshan dalami",
        },
        {
          title: "todo task 1",
          id: nanoid(),
          assginedTo: "roshan dalami",
        },
      ],
      inprogress: [
        {
          id: nanoid(),
          title: "inprogress task 1",
          assginedTo: "roshan dalami",
        },
        {
          id: nanoid(),
          title: "inprogress task 1",
          assginedTo: "roshan dalami",
        },
      ],
      complete: [
        {
          id: nanoid(),
          title: "Completed task 1",
          assginedTo: "roshan dalami",
        },
        {
          id: nanoid(),
          title: "Completed task 1",
          assginedTo: "roshan dalami",
        },
      ],
    },
    {
      title: "Event Management",
      id: nanoid(),
      createdAt: new Date().toDateString(),
      assignedTo: "roshan dalami",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis cupiditate ipsam provident hic necessitatibus qui. Labore odit, ut voluptate excepturi vero unde eius enim quas veritatis alias dolore iusto veniam!",
      todo: [
        {
          title: "todo task 2",
          id: nanoid(),
          assginedTo: "roshan dalami",
        },
      ],
      inprogress: [
        {
          id: nanoid(),
          title: "inprogress task 2",
          assginedTo: "roshan dalami",
        },
      ],
      complete: [
        {
          id: nanoid(),
          title: "Completed task 2",
          assginedTo: "roshan dalami",
        },
      ],
    },
  ],
  addTask: (item: TaskType) => {},
});

export const useTask = () => {
  return React.useContext(TaskContext);
};

export const TaskProvider = TaskContext.Provider;
