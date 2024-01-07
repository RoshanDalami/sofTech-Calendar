import { ArrowSmallRightIcon  } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";
import { url } from "../service/apiHelper";
import Model from "./Model";
import TaskEditForm from "./TaskEditForm";
import toast from "react-hot-toast";

export default function TaskCard({
  taskTitle,
  taskDescription,
  _id,
  taskId,
  isCompleted
}: {
  taskTitle: string;
  taskDescription: string;
  _id: string;
  taskId: string;
  isCompleted:boolean;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const deleteTask = async (_id: string) => {
    const response = await axios.delete(`${url.deleteTask}?id=${_id}`);
    if (response.status === 200) {
      toast.success("Task deleted successfully");
    }
  };
  const setCompleted = async (_id: string) => {
      try {
        await axios.put(`${url.setCompletedTask}/${_id}`)
      } catch (error) {
        
      }
  };
  return (
    <>
      {isEditMode && (
        <Model>
          <div className="relative rounded-md bg-white p-3">
            <XCircleIcon
              className="absolute right-5 h-10 w-10 cursor-pointer text-black"
              onClick={() => {
                setIsEditMode(false);
              }}
            />
            <TaskEditForm
              taskTitle={taskTitle}
              taskDescription={taskDescription}
              _id={_id}
              setIsModelOpen={setIsEditMode}
              taskId={taskId}
            />
          </div>
        </Model>
      )}
      <div className=" relative w-80  rounded-md border border-black/50 px-3 py-4   transition duration-300 hover:-translate-y-3 hover:shadow-lg dark:bg-white dark:hover:shadow-lg dark:hover:shadow-gray-200 md:w-96">
        <div className=" flex  items-center justify-between pb-4  ">
          <h1 className="my-2 border-b  text-xl  font-bold ">
            {taskTitle.length <= 15 ? (
              taskTitle
            ) : (
              <p>
                {taskTitle.slice(0, 15)}
                {"..."}
              </p>
            )}
          </h1>
          <div className="items-cetner flex  gap-3">
            {
              isCompleted === false ? 
            <div className="rounded-md bg-blue-600 px-2 py-1 ">
              <CheckCircleIcon
                className="h-6 w-6 cursor-pointer font-bold text-white"
                onClick={() => setCompleted(_id)}
              />
            </div> :<></>
            }
            <div className="rounded-md bg-blue-600 px-2 py-1 ">
              <PencilSquareIcon
                className="h-6 w-6 cursor-pointer font-bold text-white"
                onClick={() => setIsEditMode(true)}
              />
            </div>
            <div className="rounded-md bg-red-600 px-2 py-1 ">
              <TrashIcon
                className="h-6 w-6 cursor-pointer font-bold text-white"
                onClick={() => deleteTask(_id)}
              />
            </div>
          </div>
        </div>

        <p className=" h-24 overflow-y-auto border-b py-5   ">
          <span className="text-md font-bold">Description {""} :</span>
          <span className="text-md capitalize"> {taskDescription}</span>
        </p>
        <Link to={`/tasks/${_id}`} className="">
          <div className="mt-6 flex items-center rounded-md bg-indigo-600 hover:bg-indigo-700 ">
            <p className="flex w-full items-center justify-center py-3 text-xl font-bold text-white transition duration-200 hover:scale-125   ">
              Manage Task
              <ArrowSmallRightIcon className="mx-3 h-6  w-6" />
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
