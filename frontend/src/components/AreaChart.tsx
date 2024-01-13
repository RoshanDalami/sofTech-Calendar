import { AreaChart, Card, Title } from "@tremor/react";
import { url } from "../service/apiHelper";
import axios from "axios";
import { IUser } from "../types";
import { useEffect, useState } from "react";


export default function AreaChartComp (){
  const [data,setData] = useState<IUser[]>([])
  const fetchData = async ()=>{
    try {
      const response = await axios.get(`${url.getAllUser}`)
      setData(response.data)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(()=>{
    fetchData();
  },[])
  const January = data?.filter((item)=>item?.createdAt.slice(0,10).split('-')[1] === '01').length
  const Februray = data?.filter((item)=>item?.createdAt.slice(0,10).split('-')[1] === '02').length
  const March = data?.filter((item)=>item?.createdAt.slice(0,10).split('-')[1] === '03').length
  const April = data?.filter((item)=>item?.createdAt.slice(0,10).split('-')[1] === '04').length
  const May = data?.filter((item)=>item?.createdAt.slice(0,10).split('-')[1] === '05').length
  const June = data?.filter((item)=>item?.createdAt.slice(0,10).split('-')[1] === '06').length
  const July = data?.filter((item)=>item?.createdAt.slice(0,10).split('-')[1] === '07').length
  const August = data?.filter((item)=>item?.createdAt.slice(0,10).split('-')[1] === '08').length
  const September = data?.filter((item)=>item?.createdAt.slice(0,10).split('-')[1] === '09').length
  const October = data?.filter((item)=>item?.createdAt.slice(0,10).split('-')[1] === '10').length
  const November = data?.filter((item)=>item?.createdAt.slice(0,10).split('-')[1] === '11').length
  const December = data?.filter((item)=>item?.createdAt.slice(0,10).split('-')[1] === '12').length



  const chartdata = [
    {
      date: "January",
      Users: January,
  
    },
    {
      date: "Februray",
      Users: Februray,
  
    },
    {
      date: "March",
      Users: March,
  
    },
    {
      date: "April",
      Users: April,
  
    },
    {
      date: "May",
      Users: May,
  
    },
    {
      date: "June",
      Users: June,
  
    },
    {
      date: "July",
      Users: July,
  
    },
    {
      date: "August",
      Users: August,
  
    },
    {
      date: "September",
      Users: September,
  
    },
    {
      date: "October",
      Users: October,
  
    },
    {
      date: "November",
      Users: November,
  
    },
    {
      date: "December",
      Users: December,
  
    },
  ];
  
  const valueFormatter = function(number:number) {
    return   new Intl.NumberFormat("us").format(number).toString();
  };
    return(
        <Card>
        <Title>User Per Month</Title>
        <AreaChart
          className="h-44 mt-3"
          data={chartdata}
          index="date"
          categories={["Users"]}
          colors={["indigo"]}
          valueFormatter={valueFormatter}
        />
      </Card>
    )
}



