import React, { useState, useEffect , useCallback } from "react";
import { Todos , TaskType } from "../types";
import axios from "axios";
import { url } from "../service/apiHelper";
import DonutChartComp from "./PieChart";
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline'

export default function TaskReportCard() {
  const [todos, setTodos] = useState<Todos[]>([]);
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
      setTaskList(response.data)
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
        <div className="flex flex-col  rounded-lg bg-gray-300 py-5 shadow-lg dark:bg-gray-900">
          <p className="flex items-center text-2xl font-bold dark:text-gray-200">
            <div className="mx-3 h-6 w-6 rounded-full bg-lime-600"></div>
            Task on todo: {todo[0]?.count}
          </p>
          <p className="flex items-center text-2xl font-bold dark:text-gray-200">
            <div className="mx-3 h-6 w-6 rounded-full bg-orange-600"></div>
            Task on progress: {inprogress[0]?.count}
          </p>
          <p className="flex items-center text-2xl font-bold dark:text-gray-200">
            <div className="mx-3 h-6 w-6 rounded-full bg-indigo-600"></div>
            Task completed: {completed[0]?.count}
          </p>
          <p className="flex items-center text-2xl font-bold dark:text-gray-200">
            <div className="mx-3 h-6 w-6 rounded-full bg-blue-600"></div>
            Task on backlogs: {backlogs[0]?.count}
          </p>
        </div>
        <DonutChartComp title="Task" />
      </div>
      <div className="grid grid-cols-2 my-6">

      <div className="flex flex-col  rounded-lg bg-gray-300 py-2 shadow-lg dark:bg-gray-900">
        <h1 className="text-2xl font-bold ml-5 dark:text-gray-300  ">Task List</h1>
            {
                taskList?.length > 0 ?(
                    taskList?.map((item)=>{
                        return(
                            <div className="ml-5 flex  items-center gap-3">
                                <ChevronDoubleRightIcon className="h-5 w-5 dark:text-gray-300" />
                                <p className="text-2xl dark:text-gray-300 ">{item.taskTitle}</p>
                            </div>
                        )
                    })
                ):''
            }
      </div>
      </div>
    </div>
  );
}
