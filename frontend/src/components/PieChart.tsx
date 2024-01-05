import { Card, DonutChart, Title } from "@tremor/react";
import { useState, useEffect } from "react";
import { url } from "../service/apiHelper";
import axios from "axios";
import { Todos } from "../types";
import { userAtom } from "../recoil/userAtom";
import { useRecoilValue } from "recoil";

export default function DonutChartComp({ title }: { title: string }) {
  const user = useRecoilValue(userAtom)
  const userFromLocal = JSON.parse(localStorage.getItem("user")!);
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
  
  const todo = todos?.filter((item) => item?._id === "1") || [{ count: 0 }];
  const inprogress = todos?.filter((item) => item?._id === "2") || [
    { count: 0 },
  ];
  const completed = todos?.filter((item) => item?._id === "3") || [
    { count: 0 },
  ];
  const backlogs = todos?.filter((item) => item?._id === "4") || [{ count: 0 }];

  const cities = [
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

  const valueFormatter = (number: number) =>
    `${new Intl.NumberFormat("us").format(number).toString()}`;
  return (
    <Card className="max-w-lg">
      <Title>{title}</Title>
      <DonutChart
        variant="pie"
        className=""
        data={cities}
        category="sales"
        index="name"
        valueFormatter={valueFormatter}
        colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
      />
    </Card>
  );
}
