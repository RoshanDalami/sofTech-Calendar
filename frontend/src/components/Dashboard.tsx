// import React from 'react'
import AreaChartComp from "./AreaChart";
import BarChartComp from "./BarChart";
import EventCard from "./EventCard";
import MainProfileCard from "./MainProfileCard";
import DonutChartComp from "./PieChart";


export default function Dashboard() {
  
  return (

    <div className="   min-h-screen ">
      {/* <p className="mx-5 my-3 text-4xl font-bold dark:text-white" >Dashboard</p> */}
      <div className="mx-5 my-8">
        <MainProfileCard />
      </div>
      <div className="">
        <p className="mx-5 my-2 text-3xl font-bold dark:text-white">
          Event Details
        </p>
        <EventCard />
      </div>
      <div className="mx-5 my-7 flex flex-wrap md:flex-nowrap items-center justify-center gap-10">
        <DonutChartComp title="Task" />
        <AreaChartComp />
      </div>
      <div className="mx-5 my-7">
        <BarChartComp />
      </div>
    </div>
  );
}
