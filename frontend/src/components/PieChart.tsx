import { Card, DonutChart, Title } from "@tremor/react";
import { useState, useEffect } from "react";
import { url } from "../service/apiHelper";
import axios from "axios";
import { Todos , TaskType } from "../types";


export default function DonutChartComp({ title }: { title: string }) {
  // const user = useRecoilValue(userAtom)
  const user = JSON.parse(localStorage.getItem("user")!);
  const [todos, setTodos] = useState<Todos[]>([]);
  const [assignedTask, setAssignedTask] = useState<TaskType[]>([]);
  const [assignedTaskTodo, setAssignedTaskTodo] = useState(0);
  const [assignedTaskInprogress, setAssignedTaskInprogress] = useState(0);
  const [assignedTaskCompleted, setAssignedTaskCompleted] = useState(0);
  const [assignedTaskBacklogs, setAssignedTaskBacklogs] = useState(0);
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
  }, []);
  
  const todo = todos?.filter((item) => item?._id === "1") || [{ count: 0 }];
  const inprogress = todos?.filter((item) => item?._id === "2") || [
    { count: 0 },
  ];
  const completed = todos?.filter((item) => item?._id === "3") || [
    { count: 0 },
  ];
  const backlogs = todos?.filter((item) => item?._id === "4") || [{ count: 0 }];

  const superAdminData = [
    {
      name: "Todo",
      sales: todo[0]?.count,
    },
    {
      name: "Inprogress",
      sales: inprogress[0]?.count ,
    },
    {
      name: "Completed",
      sales: completed[0]?.count,
    },
    {
      name: "Backlogs",
      sales: backlogs[0]?.count,
    },
  ];
  const userData = [
    {
      name: "Todo",
      sales: assignedTaskTodo,
    },
    {
      name: "Inprogress",
      sales: assignedTaskInprogress ,
    },
    {
      name: "Completed",
      sales: assignedTaskCompleted,
    },
    {
      name: "Backlogs",
      sales: assignedTaskBacklogs,
    },
  ];

  const valueFormatter = (number: number) =>
    `${new Intl.NumberFormat("us").format(number).toString()}`;
  return (
    <>
    {
      user?.data?.role === 'superadmin' ? 
    <Card className="max-w-lg">
      <Title>{title}</Title>
      <DonutChart
        variant="pie"
        className=""
        data={superAdminData}
        category="sales"
        index="name"
        valueFormatter={valueFormatter}
        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
      />
    </Card> :
    <Card className="max-w-lg">
    <Title>{title}</Title>
    <DonutChart
      variant="pie"
      className=""
      data={userData}
      category="sales"
      index="name"
      valueFormatter={valueFormatter}
      colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
    />
  </Card>
    }
    </>
  );
}
