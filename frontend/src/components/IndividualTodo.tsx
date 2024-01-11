// import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Task } from "../types";

interface Props {
  setComment: (boolean: boolean) => void;
  task: Task;
}

export default function IndividualTodo({ setComment, task }: Props) {
  const nameObj = JSON.parse(task.assignedTo);
  const firstNameLetter = nameObj?.firstname?.charAt(0).toUpperCase();
  const lastNameLetter = nameObj?.lastname?.charAt(0).toUpperCase();
  return (
    <div className="">
      <div
        className="min-h-screen bg-black/30 z-40 w-[100vw] absolute inset-0"
        onClick={() => setComment(false)}
      ></div>
      <div className="w-[50%] z-50 bg-slate-700 rounded-tl-lg rounded-bl-lg  absolute   right-0 top-0 bottom-0 h-[100vh] ">
        <div className="text-white text-xl font-bold mx-6 my-4 capitalize">
          
          {task.todoTitle}
          
        </div>
        <div className=" capitalize text-xl flex  items-center gap-6 text-white mx-6 my-4">
        <p className=" flex h-8 w-8  items-center justify-center rounded-full bg-gray-100">
          <p className="text-md font-bold text-black">
            {firstNameLetter}{lastNameLetter}
          </p>
        </p>
          {/* Assigned to {" "} */}
        {/* {JSON.parse(task.assignedTo)?.firstname + ' ' +  JSON.parse(task.assignedTo)?.lastname } */}
        {JSON.parse(task.assignedTo)?.username}

        </div>
        <div className="absolute rounded-md shadow-md top-3 right-10">
          <XMarkIcon
            className="h-10 w-10 text-white "
            onClick={() => setComment(false)}
          />
        </div>
        <div className="mx-10">
          <textarea
            className="rounded-md w-full focus:outline-none px-4 text-lg py-3"
            cols={100}
            placeholder="Comment about todo..."
          />
        </div>
        <div className="flex justify-end mr-10">
          <button className="bg-green-600 rounded-md shadow-md text-white font-bold text-md px-5 py-2 ">
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}
