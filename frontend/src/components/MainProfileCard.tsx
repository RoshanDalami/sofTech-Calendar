// import React from 'react'
// import { useRecoilValue } from "recoil";
// import { userData } from "../recoil/userAtom";
// import { useUser } from "../Context";
const userDetail = {
  image:
    "https://firebasestorage.googleapis.com/v0/b/weugly-94422.appspot.com/o/bamya2ndLot.jpg?alt=media&token=76cd814b-f93d-46c1-857c-26e8197a1b28",
  userDisplayName: "Roshan Dalami",
  role: "Admin",
};
import CountUp from "react-countup";
import { useState, useEffect } from "react";

import { Todos, User, TaskType } from "../types";
import axios from "axios";
import { url } from "../service/apiHelper";

export default function MainProfileCard() {
  const user: User = JSON.parse(localStorage.getItem("user")!);

  const [todos, setTodos] = useState<Todos[]>([]);
  const [assignedTask, setAssignedTask] = useState<TaskType[]>([]);
  const [assignedTaskTodo, setAssignedTaskTodo] = useState(0);
  const [assignedTaskInprogress, setAssignedTaskInprogress] = useState(0);
  const [assignedTaskCompleted, setAssignedTaskCompleted] = useState(0);
  const [assignedTaskBacklogs, setAssignedTaskBacklogs] = useState(0);
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
  }, [assignedTask]);

  const getTodoCount = ()=>{
    let count = 0
    assignedTask?.forEach((item)=> item.todos.forEach((item)=> item.columnId ==='1'? count += 1 : ''
    ))
    setAssignedTaskTodo(count)
  }
  useEffect(()=>{
    getTodoCount()
  },[assignedTask])
  const getInprogressCount = ()=>{
    let count = 0
    assignedTask?.forEach((item)=> item.todos.forEach((item)=> item.columnId ==='2'? count += 1 : ''
    ))
    setAssignedTaskInprogress(count)
  }
  useEffect(()=>{
    getInprogressCount()
  },[assignedTask])
  const getCompletedCount = ()=>{
    let count = 0
    assignedTask?.forEach((item)=> item.todos.forEach((item)=> item.columnId ==='3'? count += 1 : ''
    ))
    setAssignedTaskCompleted(count)
  }
  useEffect(()=>{
    getCompletedCount()
  },[assignedTask])
  const getBacklogsCount = ()=>{
    let count = 0
    assignedTask?.forEach((item)=> item.todos.forEach((item)=> item.columnId ==='4'? count += 1 : ''
    ))
    setAssignedTaskBacklogs(count)
  }
  useEffect(()=>{
    getBacklogsCount()
  },[assignedTask])


  async function getTodosByUser() {
    try {
      const response = await axios.get(
        `${url.getTaskByAssignee}/${user?.data?.username}`
      );
      setAssignedTask(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTodosByUser();
  }, []);


  const todo = todos?.filter((item) => item?._id === "1") || [{ count: 0 }];
  const inprogress = todos?.filter((item) => item?._id === "2") || [
    { count: 0 },
  ];
  const completed = todos?.filter((item) => item?._id === "3") || [
    { count: 0 },
  ];
  const backlogs = todos?.filter((item) => item?._id === "4") || [{ count: 0 }];
  return (
    <>
    {
      user?.data?.role === 'superadmin' ? 
    <div className="flex justify-between rounded-md border border-gray-400/50 px-5 py-5 shadow-md   ">
      <div className="flex flex-col items-center  gap-10 md:flex-row ">
        <img src={userDetail.image} className=" h-28 w-28 rounded-full " />

        <div className="mt-[-10px] flex flex-col items-center md:items-start md:gap-3">
          <p className="font-bold dark:text-white md:text-3xl ">
            Welcome ,{user?.data.username}
          </p>
          <p className="text-md  text-gray-500 dark:text-white">
            {user?.data?.role}
          </p>
        </div>
      </div>

      <div className="mr-5 flex flex-col gap-2">
        <span className="flex  items-center ">
          <div className="mx-3 h-3 w-3 rounded-full bg-lime-600"></div>
          <p className="text-md text-black dark:text-white">Todo</p>
          <div className="mx-3 flex h-6  w-6 items-center justify-center  rounded-full bg-gray-400/50 text-xs  text-black dark:text-white">
            <span>
              <CountUp end={todo[0]?.count || 0} />
            </span>
          </div>
        </span>
        <span className="flex  items-center ">
          <div className="mx-3 h-3 w-3 rounded-full bg-orange-600"></div>
          <p className="text-md text-black dark:text-white">In progress</p>
          <div className="mx-3 flex h-6  w-6 items-center justify-center rounded-full bg-gray-400/50 text-xs  text-black dark:text-white">
            <span>
              <CountUp end={inprogress[0]?.count || 0} />
            </span>
          </div>
        </span>
        <span className="flex  items-center ">
          <div className="mx-3 h-3 w-3 rounded-full bg-indigo-600"></div>
          <p className="text-md text-black dark:text-white">Completed</p>
          <div className="mx-3 flex h-6  w-6 items-center justify-center rounded-full bg-gray-400/50 text-xs  text-black dark:text-white">
            <span>
              <CountUp end={completed[0]?.count || 0} />
            </span>
          </div>
        </span>
        <span className="flex  items-center ">
          <div className="mx-3 h-3 w-3 rounded-full bg-blue-600"></div>
          <p className="text-md text-black dark:text-white">Backlogs</p>
          <div className="mx-3 flex h-6  w-6 items-center justify-center rounded-full bg-gray-400/50 text-xs  text-black dark:text-white">
            <span>
              <CountUp end={backlogs[0]?.count || 0} />
            </span>
          </div>
        </span>
      </div>
    </div> 
    :<div className="flex justify-between rounded-md border border-gray-400/50 px-5 py-5 shadow-md   ">
    <div className="flex flex-col items-center  gap-10 md:flex-row ">
      <img src={userDetail.image} className=" h-28 w-28 rounded-full " />

      <div className="mt-[-10px] flex flex-col items-center md:items-start md:gap-3">
        <p className="font-bold dark:text-white md:text-3xl ">
          Welcome ,{user?.data.username}
        </p>
        <p className="text-md  text-gray-500 dark:text-white">
          {user?.data?.role}
        </p>
      </div>
    </div>

    <div className="mr-5 flex flex-col gap-2">
      <span className="flex  items-center ">
        <div className="mx-3 h-3 w-3 rounded-full bg-lime-600"></div>
        <p className="text-md text-black dark:text-white">Todo</p>
        <div className="mx-3 flex h-6  w-6 items-center justify-center  rounded-full bg-gray-400/50 text-xs  text-black dark:text-white">
          <span>
            <CountUp end={assignedTaskTodo} />
          </span>
        </div>
      </span>
      <span className="flex  items-center ">
        <div className="mx-3 h-3 w-3 rounded-full bg-orange-600"></div>
        <p className="text-md text-black dark:text-white">In progress</p>
        <div className="mx-3 flex h-6  w-6 items-center justify-center rounded-full bg-gray-400/50 text-xs  text-black dark:text-white">
          <span>
            <CountUp end={assignedTaskInprogress} />
          </span>
        </div>
      </span>
      <span className="flex  items-center ">
        <div className="mx-3 h-3 w-3 rounded-full bg-indigo-600"></div>
        <p className="text-md text-black dark:text-white">Completed</p>
        <div className="mx-3 flex h-6  w-6 items-center justify-center rounded-full bg-gray-400/50 text-xs  text-black dark:text-white">
          <span>
            <CountUp end={assignedTaskCompleted} />
          </span>
        </div>
      </span>
      <span className="flex  items-center ">
        <div className="mx-3 h-3 w-3 rounded-full bg-blue-600"></div>
        <p className="text-md text-black dark:text-white">Backlogs</p>
        <div className="mx-3 flex h-6  w-6 items-center justify-center rounded-full bg-gray-400/50 text-xs  text-black dark:text-white">
          <span>
            <CountUp end={assignedTaskBacklogs} />
          </span>
        </div>
      </span>
    </div>
  </div> 
    }
    </>
  );
}
