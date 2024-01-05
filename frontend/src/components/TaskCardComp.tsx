import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon
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

}: {
  taskTitle: string;
  taskDescription: string;
  _id: string;
  taskId:string;

}) {
  const [isEditMode,setIsEditMode] = useState(false);
  const deleteTask = async(_id:string)=>{
    const response = await axios.delete(`${url.deleteTask}?id=${_id}`)
    if(response.status === 200){
      toast.success('Task deleted successfully')
    }
  }
  const getEditItem = async(_id:string)=>{
    console.log(_id,'id')

  }
  return (
    <>
    
    { isEditMode && <Model>
      <div className="relative rounded-md bg-white p-3">
            <XCircleIcon
              className="absolute right-5 h-10 w-10 cursor-pointer text-black"
              onClick={() => {
                setIsEditMode(false);
              }}
            />
      <TaskEditForm taskTitle={taskTitle} taskDescription={taskDescription} _id={_id} setIsModelOpen={setIsEditMode}  taskId={taskId}/>
      </div>
    </Model>}
    <div className=" w-80 md:w-96  rounded-md border dark:bg-white dark:hover:shadow-lg dark:hover:shadow-gray-200   border-black/50 px-3 py-4 transition duration-300 hover:-translate-y-3 hover:shadow-lg relative">
      <div className=" flex  items-center pb-4 justify-between  ">

      <h1 className="my-2 border-b  text-xl  font-bold ">{taskTitle}</h1>
      <div className="flex items-cetner  gap-3">
        <div className="bg-blue-600 px-2 rounded-md py-1 " >

        <PencilSquareIcon className="h-6 w-6 text-white font-bold cursor-pointer" onClick={()=>setIsEditMode(true)}  />
        </div>
        <div className="bg-red-600 px-2 rounded-md py-1 " >

        <TrashIcon className="h-6 w-6 text-white font-bold cursor-pointer" onClick={()=>deleteTask(_id)} />
        </div>
      </div>
      </div>
      
      
      <p className=" border-b py-5 h-24 overflow-y-auto   ">
        <span className="text-md font-bold">Description {""} :</span>
        <span className="text-md capitalize"> {taskDescription}</span>
      </p>
      <Link to={`/tasks/${_id}`} className="">
        <div className="bg-indigo-600 hover:bg-indigo-700 rounded-md flex items-center mt-6 ">
          <p className="flex items-center py-3 justify-center font-bold text-xl text-white w-full hover:scale-125 transition duration-200   ">
            Manage Task
            <ArrowSmallRightIcon className="h-6 w-6  mx-3" />
          </p>
        </div>
      </Link>
    </div>
    </>
  );
}
