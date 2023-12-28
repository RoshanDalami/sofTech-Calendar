import { useTask } from "../Context/index";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCardComp";
import { FormEvent, useState } from "react";
import Model from "../components/Model";
import { nanoid } from "nanoid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
export default function Tasks() {
  const { taskList, addTask } = useTask();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    id: "",
    createdAt: new Date().toDateString(),
    description: "",
    assingedTo: "",
  });
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    try {
      addTask({
        title: formData.title,
        id: nanoid(),
        createdAt: new Date().toDateString(),
        description: formData.description,
        assignedTo: formData.assingedTo,
        todo: [],
        inprogress: [],
        complete: [],
        backlogs: [],
      });
      setFormData({
        title: "",
        id: "",
        createdAt: new Date().toDateString(),
        description: "",
        assingedTo: "",
      });
      setIsModelOpen(false);
    } catch (error) {
      console.log(error);
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
              onSubmit={onSubmitHandler}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Task Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                  className="rounded-md border-2 border-slate-200 px-4 py-2 "
                  placeholder="Eg: Event Management"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Created At</label>
                <input
                  type="text"
                  name="title"
                  value={formData.createdAt}
                  className="rounded-md border-2 border-slate-200 px-4 py-2 "
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
                  className="rounded-md border-2 border-slate-200 px-4 py-2 "
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
                  className="rounded-md border-2 border-slate-200 px-4 py-2 "
                  placeholder="Eg: Should be ended at 3:00 PM"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-3 rounded-md bg-indigo-600 py-2 font-bold text-white hover:bg-indigo-700"
              >
                Add Task
              </button>
            </form>
          </div>
        </Model>
      </Transition>

      <div>
        {taskList.length > 0 ? (
          <div className="mx-1 mt-10 overflow-hidden  ">
            <section className="mx-4 flex h-full items-center justify-between rounded-md border-b bg-slate-100  px-2 py-2 text-4xl md:mx-0 md:px-10">
              Tasks
              <button
                className="my-5 flex items-center gap-3 rounded-md bg-indigo-600 px-1 py-1 text-sm text-white hover:bg-indigo-700 md:gap-5 md:px-10 md:py-2 md:text-lg "
                onClick={() => setIsModelOpen(true)}
              >
                Create Task
                <PlusCircleIcon className="h-8 w-7" />
              </button>
            </section>
            <div className="mb-10 mt-10 flex flex-col flex-wrap items-center  justify-center gap-3  md:flex-row">
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
