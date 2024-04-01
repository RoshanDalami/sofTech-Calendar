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
// import {Task} from '../types'
import toast from "react-hot-toast";
import { TablePagination } from "@mui/material";
const schema = z.object({
  taskTitle: z.string().min(1, { message: "Taskname is required" }),
  taskDescription: z
    .string()
    .min(1, { message: "Task description is required" }),
});

export default function Tasks() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [activeTaskList, setActiveTaskList] = useState<TaskType[]>([]);
  const [completedTaskList, setCompletedTaskList] = useState<TaskType[]>([]);
  const [assignedTask, setAssignedTask] = useState<TaskType[]>([]);
  const [selectedTask, setSelectedTask] = useState(0);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(6);

  const handlePageChange = (_e: any, newpage: number) => {
    setPage(newpage);
  };
  function handlePerPage(e: any) {
    setRowPerPage(+e.target.value);
    setPage(0);
  }

  // const userDetails = useRecoilValue(userAtom);
  const userDetails = JSON.parse(localStorage.getItem("user")!);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (userDetails?.data?.role !== "superadmin") {
      setSelectedTask(3);
    }
  }, [userDetails?.data?.role]);

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
  }, []);

  const getAllInCompletedTask = useCallback(async () => {
    try {
      const response = await axios.get(url.getAllInCompletedTask);
      setActiveTaskList(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getAllInCompletedTask();
  }, []);
  const getAllCompletedTask = useCallback(async () => {
    try {
      const response = await axios.get(url.getAllCompletedTask);
      setCompletedTaskList(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    getAllCompletedTask();
  }, []);

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
        window.location.reload();
      }
    } catch (error) {
      toast.error("Task fetching failed");
    } finally {
      setIsLoading(false);
    }
  };
  const getTodoByAssignee = async () => {
    try {
      const response = await axios.get(
        `${url.getTaskByAssignee}/${userDetails?.data?.username}`
      );
      // console.log(response.data, "response");
      setAssignedTask(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodoByAssignee();
  }, []);

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
            <div className="flex w-[90%] items-center rounded-md border border-gray-300">
              <input
                type="search"
                className=" w-full rounded-md px-4 py-2 focus:outline-none"
                placeholder="Search Task by Title  "
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <MagnifyingGlassIcon className="mr-6 h-6 w-6" />
            </div>
            <div className=" my-3 max-h-52 overflow-auto">
              {taskList
                .filter((item) => {
                  if (searchTerm.toLowerCase() !== "") {
                    return item.taskTitle
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                  }
                })
                .map((item) => {
                  return (
                    <a href={`/tasks/${item._id}`}>
                      <div
                        key={item._id}
                        className="my-2 flex  h-10 items-center rounded-md bg-gray-400/20 "
                      >
                        <p className="mx-2 text-lg font-bold">
                          {item.taskTitle}
                        </p>
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
        </Model>
      </Transition>

      <div>
        {taskList.length > 0 ? (
          <div className="mx-1 mt-10 overflow-hidden  ">
            <section className="mx-4 flex  h-full items-center justify-between rounded-md border-b bg-slate-100  px-2 py-2 text-4xl md:mx-0 md:px-10">
              Tasks
              {userDetails?.data?.role === "superadmin" && (
                <div>
                  <button
                    className="my-5 flex items-center gap-3 rounded-md bg-indigo-600 px-1 py-1 text-sm text-white hover:bg-indigo-700 md:gap-5 md:px-10 md:py-2 md:text-lg "
                    onClick={() => setIsModelOpen(true)}
                  >
                    Create Task
                    <PlusCircleIcon className="h-8 w-7" />
                  </button>
                  <button
                    className="my-5 flex items-center gap-3 rounded-md bg-indigo-600 px-1 py-1 text-sm text-white hover:bg-indigo-700 md:gap-5 md:px-10 md:py-2 md:text-lg "
                    onClick={() => setIsSearching(true)}
                  >
                    Search Task
                    <MagnifyingGlassIcon className="h-8 w-7" />
                  </button>
                </div>
              )}
            </section>
            <div className="mt-6 grid grid-cols-3 md:grid-cols-5 gap-5">
              {userDetails?.data?.role === "superadmin" ? (
                <>
                  <button
                    className={`rounded-md bg-indigo-600 px-5 py-2 font-bold text-white shadow-md hover:bg-indigo-700 ${
                      selectedTask === 0 ? "bg-lime-600 hover:bg-lime-700" : ""
                    } `}
                    onClick={() => setSelectedTask(0)}
                  >
                    Active Task
                  </button>
                  <button
                    className={`rounded-md bg-indigo-600 px-5 py-2 font-bold text-white shadow-md hover:bg-indigo-700 ${
                      selectedTask === 1 ? "bg-lime-600 hover:bg-lime-700" : ""
                    } `}
                    onClick={() => setSelectedTask(1)}
                  >
                    Completed Task
                  </button>
                  <button
                    className={`rounded-md bg-indigo-600 px-5 py-2 font-bold text-white shadow-md hover:bg-indigo-700 ${
                      selectedTask === 2 ? "bg-lime-600 hover:bg-lime-700" : ""
                    } `}
                    onClick={() => setSelectedTask(2)}
                  >
                    All Task
                  </button>
                </>
              ) : (
                <></>
              )}
              <button
                className={`rounded-md bg-indigo-600 px-5 py-2 font-bold text-white shadow-md hover:bg-indigo-700 ${
                  selectedTask === 3 ? "bg-lime-600 hover:bg-lime-700" : ""
                } `}
                onClick={() => setSelectedTask(3)}
              >
                Assigned Task
              </button>
            </div>

            <div className="mx-1 mb-10 mt-10 flex grid-cols-3 flex-col  flex-wrap items-center   justify-center gap-3 md:grid 2xl:grid 2xl:grid-cols-8 ">
              {selectedTask === 0 ? (
                <>
                  {activeTaskList
                    .filter(
                      (item) => item?.userDetails === userDetails?.data?._id
                    )
                    .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                    .map((task: TaskType) => {
                      return (
                        <TaskCard
                          key={task._id}
                          taskTitle={task.taskTitle}
                          taskDescription={task.taskDescription}
                          _id={task._id}
                          taskId={task.taskId}
                          setTaskList={setTaskList}
                          setCompletedTaskList={setCompletedTaskList}
                          setActiveTaskList={setActiveTaskList}
                          setAssignedTask={setAssignedTask}
                          isCompleted={task.isCompleted}
                        />
                      );
                    })}
                </>
              ) : selectedTask === 1 ? (
                <>
                  {completedTaskList
                    .filter(
                      (item) => item?.userDetails === userDetails?.data?._id
                    )
                    .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                    .map((task: TaskType) => {
                      return (
                        <TaskCard
                          key={task._id}
                          taskTitle={task.taskTitle}
                          taskDescription={task.taskDescription}
                          _id={task._id}
                          taskId={task.taskId}
                          setTaskList={setTaskList}
                          setCompletedTaskList={setCompletedTaskList}
                          setActiveTaskList={setActiveTaskList}
                          setAssignedTask={setAssignedTask}
                          isCompleted={task.isCompleted}
                        />
                      );
                    })}
                </>
              ) : selectedTask === 2 ? (
                <>
                  {taskList
                    .filter(
                      (item) => item?.userDetails === userDetails?.data?._id
                    )
                    .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                    .map((task: TaskType) => {
                      return (
                        <TaskCard
                          key={task._id}
                          taskTitle={task.taskTitle}
                          taskDescription={task.taskDescription}
                          _id={task._id}
                          taskId={task.taskId}
                          setTaskList={setTaskList}
                          setCompletedTaskList={setCompletedTaskList}
                          setActiveTaskList={setActiveTaskList}
                          setAssignedTask={setAssignedTask}
                          isCompleted={task.isCompleted}
                        />
                      );
                    })}
                </>
              ) : selectedTask === 3 ? (
                <>
                  {assignedTask?.slice(page * rowPerPage, page * rowPerPage + rowPerPage).map((task: TaskType) => {
                    return (
                      <TaskCard
                        key={task._id}
                        taskTitle={task.taskTitle}
                        taskDescription={task.taskDescription}
                        _id={task._id}
                        taskId={task.taskId}
                        setTaskList={setTaskList}
                        setCompletedTaskList={setCompletedTaskList}
                        setActiveTaskList={setActiveTaskList}
                        setAssignedTask={setAssignedTask}
                        isCompleted={task.isCompleted}
                      />
                    );
                  })}
                </>
              ) : (
                ""
              )}
            </div>
            <div className="bg-white rounded-full">
              {selectedTask === 0 ? (
                <TablePagination
                  rowsPerPageOptions={[7]}
                  rowsPerPage={rowPerPage}
                  page={page}
                  count={activeTaskList.length}
                  component={"div"}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handlePerPage}
                ></TablePagination>
              ) : selectedTask === 1 ? (
                <TablePagination
                  rowsPerPageOptions={[7]}
                  rowsPerPage={rowPerPage}
                  page={page}
                  count={completedTaskList.length}
                  component={"div"}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handlePerPage}
                ></TablePagination>
              ) : selectedTask === 2 ? (
                <TablePagination
                  rowsPerPageOptions={[7]}
                  rowsPerPage={rowPerPage}
                  page={page}
                  count={taskList.length}
                  component={"div"}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handlePerPage}
                ></TablePagination>
              ) : selectedTask === 3 ? (
                <TablePagination
                  rowsPerPageOptions={[7]}
                  rowsPerPage={rowPerPage}
                  page={page}
                  count={assignedTask.length}
                  component={"div"}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handlePerPage}
                ></TablePagination>
              ) : (
                ""
              )}
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
