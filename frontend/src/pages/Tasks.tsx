import { PlusCircleIcon } from "@heroicons/react/24/outline";
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
import {Task} from '../types'
const schema = z.object({
  taskTitle: z.string().min(1, { message: "Taskname is required" }),
  taskDescription: z
    .string()
    .min(1, { message: "Task description is required" }),
});

export default function Tasks() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const userDetails = useRecoilValue(userAtom)

  const getAllTask = useCallback(async () => {
    try {
      const response = await axios.get(url.getAllTasks);
      setTaskList(response.data.filter((item:Task)=>item.userDetails === userDetails?.data?._id ))
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getAllTask();
  }, []);


  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmitHandler = async (data: FieldValues) => {
    data={
      ...data,
      taskId:nanoid(),
      userDetails:userDetails?.data?._id
    }
    try {
      setIsLoading(true);
      const response = await axios.post(url.createTask, data);
      if (response.status === 200) {
        setIsLoading(false);
        resetField("taskTitle");
        resetField("taskDescription");
        setIsModelOpen(false);
      }
    } catch (error) {
      console.log(error);
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
        className="fixed  inset-0 z-40 min-h-screen w-full md:absolute  "
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

      <div>
        {taskList.length > 0 ? (
          <div className="mx-1 mt-10 overflow-hidden  ">
            <section className="flex h-full items-center justify-between border-b bg-slate-100 px-2 py-2  text-4xl md:px-10">
              Tasks
              <button
                className="my-5 flex items-center gap-3 rounded-md bg-indigo-600 px-1 py-1 text-sm text-white hover:bg-indigo-700 md:gap-5 md:px-10 md:py-2 md:text-lg "
                onClick={() => setIsModelOpen(true)}
              >
                Create Task
                <PlusCircleIcon className="h-8 w-7" />
              </button>
            </section>
            <div className="mb-10 mt-10 flex flex-col flex-wrap items-center  justify-center gap-10  md:flex-row">
              {taskList.map((task: TaskType) => {
                return (
                  <TaskCard
                  key={task._id}
                    taskTitle={task.taskTitle}
                    taskDescription={task.taskDescription}
                    _id={task._id }
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
