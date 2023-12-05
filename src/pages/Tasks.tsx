import { useTask } from "../Context/index";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import { FormEvent, useState } from "react";
import Model from "../components/Model";
import { nanoid } from "nanoid";
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Tasks() {
  const { taskList , addTask } = useTask();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    id: '',
    createdAt: new Date().toDateString(),
    description:'',
    assingedTo: "",
    todo: [],
    inprogress: [],
    completed: [],
  });
    const onSubmitHandler =(e:FormEvent)=>{
        e.preventDefault()
        try {
          addTask({
            title:formData.title,
            id:nanoid(),
            createdAt:new Date().toDateString(),
            description:formData.description,
            assignedTo :formData.assingedTo ,
            todo:[],
            inprogress:[],
            complete:[]
          })
          setFormData({
            title:'',
            id:'',
            createdAt:'',
            description:'',
            assingedTo:'',
            todo:[],
            inprogress:[],
            completed:[]
          })
          setIsModelOpen(false)
        } catch (error) {
          console.log(error)
        }
       
    }
  return (
    <>
      {isModelOpen && (
        <Model>
          <div className="rounded-md bg-white p-5 relative">
            <div className="bg-black/10 absolute right-5 rounded-full p-2 hover:bg-black/20 transition duration-300 ">

            <XMarkIcon className="h-7 w-7 cursor-pointer " onClick={()=>setIsModelOpen(false)} />
            </div>
            <form action="" className="flex flex-col gap-2 mt-5" onSubmit={onSubmitHandler} >
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Task Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                  className="border-2 border-slate-200 px-4 py-2 rounded-md "
                  placeholder="Eg: Event Management"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Created At</label>
                <input type="text" name="title" value={formData.createdAt} className="border-2 border-slate-200 px-4 py-2 rounded-md "
                required
                   />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Assigned To</label>
                <input
                  type="text"
                  name="title"
                  value={formData.assingedTo}
                  onChange={(e) => {
                    setFormData({ ...formData, assingedTo: e.target.value });
                  }}
                  className="border-2 border-slate-200 px-4 py-2 rounded-md "
                  placeholder="Eg: roshan dalami"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Description</label>
                <input
                  type="text"
                  name="title"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                  }}
                  className="border-2 border-slate-200 px-4 py-2 rounded-md "
                  placeholder="Eg: Should be ended at 3:00 PM"
                  required
                />
              </div>
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md py-2 mt-3" > 
                  Add Task
              </button>
            </form>
          </div>
        </Model>
      )}
      <div>
        {taskList.length > 0 ? (
          <div className="mx-5 mt-10 overflow-hidden  ">
            <section className="flex h-full items-center justify-between border-b bg-slate-100 px-10  py-2 text-4xl">
              Tasks
              <button
                className="my-5 flex items-center gap-5 rounded-md bg-indigo-600 px-10 py-2 text-lg text-white hover:bg-indigo-700 "
                onClick={() => setIsModelOpen(true)}
              >
                Create Task
                <PlusCircleIcon className="h-8 w-7" />
              </button>
            </section>
            <div className="mt-10 flex  items-center gap-10">
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
          <div className="mt-16 flex  w-full  flex-col items-center justify-center">
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
