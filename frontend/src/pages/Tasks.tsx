import { useTask } from "../Context/index";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCardComp";
import { useState } from "react";
import Model from "../components/Model";
import { nanoid } from "nanoid";
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Transition } from '@headlessui/react'
import {  FieldValues, useForm } from 'react-hook-form';
import axios from "axios";
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { url } from "../service/apiHelper";

const schema = z.object({
  taskTitle:z.string().min(1,{message:'Taskname is required'}),
  taskDescription : z.string().min(1,{message:'Task description is required'})
})

export default function Tasks() {
  const { taskList  } = useTask();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [ isLoading,setIsLoading ] = useState(false);

  const {register , handleSubmit , resetField , formState:{errors} } = useForm({
    resolver:zodResolver(schema)
  }) 
     const onSubmitHandler = async(data: FieldValues)=>{
       try {
        setIsLoading(true)
         const response = await axios.post(url.createTask,data)

        console.log(response)
        if(response.status === 200){
          setIsLoading(false)
          resetField('taskTitle')
          resetField('taskDescription')
          setIsModelOpen(false)
        }
      } catch (error) {

        console.log(error)
      }finally{
          setIsLoading(false)
      }
       
    }
  return (
    <>
      
        <Transition show={isModelOpen} 
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className='w-full  min-h-screen fixed md:absolute z-40 inset-0  '
        >
        <Model>
          <div className="rounded-md bg-white p-5 relative">
            <div className="bg-black/10 absolute right-5 rounded-full p-2 hover:bg-black/20 transition duration-300 ">

            <XMarkIcon className="h-7 w-7 cursor-pointer " onClick={()=>setIsModelOpen(false)} />
            </div>
            <form action="" className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit((data)=>onSubmitHandler(data))} >
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Task Title</label>
                <input
                  type="text"
                  {...register('taskTitle')}
                  className="border-2 border-slate-200 px-4 py-2 rounded-md "
                  placeholder="Eg: Event Management"
                  required
                />
                
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Description</label>
                <input
                  type="text"
                  {...register('taskDescription')}
                  className="border-2 border-slate-200 px-4 py-2 rounded-md "
                  placeholder="Eg: Should be ended at 3:00 PM"
                  required
                />
                
              </div>
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md py-2 mt-3" > 
                  {isLoading ? 'submitting...':'Add Task'}
              </button>
            </form>
          </div>
        </Model>
        </Transition>
      
      <div>
        {taskList.length > 0 ? (
          <div className="mx-1 mt-10 overflow-hidden  ">
            <section className="flex h-full items-center justify-between border-b bg-slate-100 md:px-10 px-2  py-2 text-4xl">
              Tasks
              <button
                className="my-5 flex items-center gap-3 md:gap-5 rounded-md bg-indigo-600 md:px-10 md:py-2 text-sm py-1 px-1 md:text-lg text-white hover:bg-indigo-700 "
                onClick={() => setIsModelOpen(true)}
              >
                Create Task
                <PlusCircleIcon className="h-8 w-7" />
              </button>
            </section>
            <div className="mt-10 flex flex-col mb-10 md:flex-row flex-wrap  items-center justify-center  gap-3">
              {taskList.map((task) => {
                return (
                  <Link to={`/tasks/${task.id}`}>
                    {/* <div className=" flex items-center gap-4 px-5 py-3 border-b cursor-pointer hover:bg-blue-200/40 transition duration-200  " key={task.id}  >
                            <RectangleGroupIcon className="h-8 w-8"/>
                            <p className="text-2xl font-semibold" >
                                {task.title}
                            </p>
                        </div> */}
                    <TaskCard
                      title={task.title}
                      assignedTo={task.assignedTo}
                      createdAt={task.createdAt}
                      description={task.description}
                      id={task.id}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="md:mt-16 flex  w-full mt-[-50px] min-h-screen md:min-h-full flex-col items-center justify-center">
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
