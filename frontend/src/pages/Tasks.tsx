import {
  PlusCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import TaskCard from "../components/TaskCardComp";
import { useCallback, useEffect, useState } from "react";
import Model from "../components/Model";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { url } from "../service/apiHelper";
import { TaskType } from "../types";
import { nanoid } from "nanoid";
import { userAtom } from "../recoil/userAtom";
import { useRecoilValue } from "recoil";
import Link from 'react-router-dom'
// import {Task} from '../types'
import toast from "react-hot-toast";
const schema = z.object({
  taskTitle: z.string().min(1, { message: "Taskname is required" }),
  taskDescription: z
    .string()
    .min(1, { message: "Task description is required" }),
});

export default function Tasks() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isSearching,setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const userDetails = useRecoilValue(userAtom);
  const [searchTerm , setSearchTerm] = useState('')

  const getAllTask = useCallback(async () => {
    try {
      const response = await axios.get(url.getAllTasks);
      setTaskList(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getAllTask();
  }, [taskList]);

  const { register, handleSubmit, resetField } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmitHandler = async (data: FieldValues) => {
    data = {
      ...data,
      taskId: nanoid(),
      userDetails: userDetails?.data?._id,
    };
    try {
      setIsLoading(true);
      const response = await axios.post(url.createTask, data);
      if (response.status === 200) {
        toast.success("Task fetched successfully");
        setIsLoading(false);
        resetField("taskTitle");
        resetField("taskDescription");
        setIsModelOpen(false);
      }
    } catch (error) {
      toast.error("Task fetching failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Transition
        show={isModelOpen}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="fixed inset-0 z-40 min-h-screen w-full  "
      >
        <Model>
          <div className="relative rounded-md bg-white p-5">
            <div className="absolute right-5 rounded-full bg-black/10 p-2 transition duration-300 hover:bg-black/20 ">
              <XMarkIcon
                className="h-7 w-7 cursor-pointer "
                onClick={() => setIsModelOpen(false)}
              />
            </div>
            <form
              action=""
              className="mt-5 flex flex-col gap-2"
              onSubmit={handleSubmit((data) => onSubmitHandler(data))}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Task Title</label>
                <input
                  type="text"
                  {...register("taskTitle")}
                  className="rounded-md border-2 border-slate-200 px-4 py-2 "
                  placeholder="Eg: Event Management"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="title">Description</label>
                <input
                  type="text"
                  {...register("taskDescription")}
                  className="rounded-md border-2 border-slate-200 px-4 py-2 "
                  placeholder="Eg: Should be ended at 3:00 PM"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-3 rounded-md bg-indigo-600 py-2 font-bold text-white hover:bg-indigo-700"
              >
                {isLoading ? "submitting..." : "Add Task"}
              </button>
            </form>
          </div>
        </Model>
      </Transition>
      {/* serach  */}
      <Transition
        show={isSearching}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="fixed inset-0 z-40 min-h-screen w-full  "
      >
        <Model>
          <div className="relative rounded-md bg-white p-5">
            <div className="absolute right-5 rounded-full bg-black/10 p-2 transition duration-300 hover:bg-black/20 ">
              <XMarkIcon
                className="h-7 w-7 cursor-pointer "
                onClick={() => setIsSearching(false)}
              />
            </div>
            <div className="flex items-center border rounded-md border-gray-300 w-[90%]">
              <input type="search" className=" rounded-md focus:outline-none w-full py-2 px-4" placeholder="Search Task by Title  " onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm}  />
              <MagnifyingGlassIcon className="h-6 w-6 mr-6" />
            </div>
          <div className=" max-h-52 overflow-auto my-3">
            {
             taskList.filter((item)=>{
              if(searchTerm.toLowerCase() !== '')  {
                return item.taskTitle.toLowerCase().includes(searchTerm.toLowerCase())
              } 
             } ).map((item)=>{
              return(
                  <a href={`/tasks/${item._id}`} >
                <div key={item._id} className="bg-gray-400/20 h-10  rounded-md flex items-center my-2 " >

                  <p className="text-lg font-bold mx-2">{item.taskTitle}</p>
                </div>
                  </a>
                  
              )
             })
            }
          </div>
          </div>
        </Model>
      </Transition>

      <div>
        {taskList.length > 0 ? (
          <div className="mx-1 mt-10 overflow-hidden  ">
            <section className="mx-4 flex  h-full items-center justify-between rounded-md border-b bg-slate-100  px-2 py-2 text-4xl md:mx-0 md:px-10">
              Tasks
              <div>
                <button
                  className="my-5 flex items-center gap-3 rounded-md bg-indigo-600 px-1 py-1 text-sm text-white hover:bg-indigo-700 md:gap-5 md:px-10 md:py-2 md:text-lg "
                  onClick={() => setIsModelOpen(true)}
                >
                  Create Task
                  <PlusCircleIcon className="h-8 w-7" />
                </button>
                <button className="my-5 flex items-center gap-3 rounded-md bg-indigo-600 px-1 py-1 text-sm text-white hover:bg-indigo-700 md:gap-5 md:px-10 md:py-2 md:text-lg " onClick={()=> setIsSearching(true)} >
                  Search Task
                  <MagnifyingGlassIcon className="h-8 w-7" />
                </button>
              </div>
            </section>

            <div className="mx-1 mb-10 mt-10 flex grid-cols-3 flex-col  flex-wrap items-center   justify-center gap-3 md:grid 2xl:grid 2xl:grid-cols-8 ">
              {taskList
                .filter((item) => item?.userDetails === userDetails?.data?._id)
                .map((task: TaskType) => {
                  return (
                    <TaskCard
                      key={task._id}
                      taskTitle={task.taskTitle}
                      taskDescription={task.taskDescription}
                      _id={task._id}
                      taskId={task.taskId}
                    />
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="mt-[-50px] flex  min-h-screen w-full flex-col items-center justify-center md:mt-16 md:min-h-full">
            <div className="relative">
              <img src="/no_task.svg" loading="lazy" />
              <h1 className="absolute inset-0 left-14 top-[70%] text-center text-4xl font-semibold text-gray-500/80">
                No Task Available
              </h1>
            </div>

            <button
              className="my-5 flex items-center gap-5 rounded-md bg-indigo-600 px-24 py-2 text-lg text-white hover:bg-indigo-700 "
              onClick={() => setIsModelOpen(true)}
            >
              Create Task
              <PlusCircleIcon className="h-8 w-7" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
