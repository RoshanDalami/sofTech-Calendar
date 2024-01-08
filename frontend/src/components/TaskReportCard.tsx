import { useState, useEffect, useCallback } from "react";
import { Todos, TaskType  } from "../types";
import axios from "axios";
import { url } from "../service/apiHelper";
import DonutChartComp from "./PieChart";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
// import { userAtom } from "../recoil/userAtom";
// import { useRecoilValue } from "recoil";
export default function TaskReportCard() {
  const [todos, setTodos] = useState<Todos[]>([]);
  // const user:User = useRecoilValue(userAtom);

  async function fetchTodo() {
    try {
      const response = await axios.get(`${url.getAllTodos}`);
      setTodos(response?.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchTodo();
  }, [todos]);
  const [taskList, setTaskList] = useState<TaskType[]>([]);

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
  const todo = todos?.filter((item) => item?._id === "1") || [{ count: 0 }];
  const inprogress = todos?.filter((item) => item?._id === "2") || [
    { count: 0 },
  ];
  const completed = todos?.filter((item) => item?._id === "3") || [
    { count: 0 },
  ];
  const backlogs = todos?.filter((item) => item?._id === "4") || [{ count: 0 }];
  return (
    <div className="mx-4">
      <div className="grid grid-cols-2 gap-10">
        <div className="flex flex-col gap-4 rounded-lg bg-gray-300 py-5 shadow-lg dark:bg-gray-900 md:gap-0">
          <p className="text-md flex items-center font-bold dark:text-gray-200 md:text-2xl">
            <div className="mx-3 h-2 w-2 rounded-full bg-lime-600 md:h-6 md:w-6"></div>
            Task on todo: {todo[0]?.count || 0}
          </p>
          <p className="flex items-center font-bold dark:text-gray-200 md:text-2xl">
            <div className="mx-3 h-2 w-2 rounded-full bg-orange-600 md:h-6 md:w-6"></div>
            Task on progress: {inprogress[0]?.count || 0}
          </p>
          <p className="flex items-center font-bold dark:text-gray-200 md:text-2xl">
            <div className="mx-3 h-2 w-2 rounded-full bg-indigo-600 md:h-6 md:w-6"></div>
            Task completed: {completed[0]?.count || 0}
          </p>
          <p className="flex items-center font-bold dark:text-gray-200 md:text-2xl">
            <div className="mx-3 h-2 w-2 rounded-full bg-blue-600 md:h-6 md:w-6"></div>
            Task on backlogs: {backlogs[0]?.count || 0}
          </p>
        </div>
        <DonutChartComp title="Task" />
      </div>
      <div className="my-6 grid grid-cols-2">
        <div className="flex flex-col  rounded-lg bg-gray-300 py-2 shadow-lg  dark:bg-gray-900">
          <h1 className="ml-5 text-xl font-bold dark:text-gray-300 md:text-2xl  ">
            Task List
          </h1>
          <div className="h-[40rem] overflow-auto">
            {


            }

            <>
              {taskList?.length > 0
                ? taskList?.map((item) => {
                    return (
                      <div className="ml-5 flex  items-center gap-3">
                        <ChevronDoubleRightIcon className="h-5 w-5 dark:text-gray-300" />
                        <p className="text-xl dark:text-gray-300 md:text-2xl ">
                          {item.taskTitle}
                        </p>
                      </div>
                    );
                  })
                : ""}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
