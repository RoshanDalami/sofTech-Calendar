import { useTask } from "../Context/index";
import {
  PlusCircleIcon,

} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";

export default function Tasks() {
  const { taskList } = useTask();
  return (
    <div>
      {taskList.length > 0 ? (
        <div className="mx-5 mt-10 overflow-hidden  ">
          <section className="flex h-full items-center justify-between border-b bg-slate-100 px-10  py-2 text-4xl">
            Tasks
            <button className="my-5 flex items-center gap-5 rounded-md bg-indigo-600 px-10 py-2 text-lg text-white hover:bg-indigo-700 ">
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
                  />
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex w-full  mt-16  flex-col items-center justify-center">
          <div className="relative">
            <img src="/no_task.svg" loading="lazy" />
            <h1 className="absolute inset-0 left-14 top-[70%] text-center text-4xl font-semibold text-gray-500/80">
              No Task Available
            </h1>
          </div>

          <button className="my-5 flex items-center gap-5 rounded-md bg-indigo-600 px-24 py-2 text-lg text-white hover:bg-indigo-700 ">
            Create Task
            <PlusCircleIcon className="h-8 w-7" />
          </button>
        </div>
      )}
    </div>
  );
}
