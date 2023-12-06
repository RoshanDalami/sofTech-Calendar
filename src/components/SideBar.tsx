// import React from 'react'

import LinkLists from "./LinkLists";
import ProfileCard from "./ProfileCard";

export default function SideBar() {
  return (
    <div className="h-[100vh] w-60 fixed bg-slate-200 rounded-r-3xl flex flex-col items-center overflow-hidden dark:bg-gray-900 " >
        <div className="font-bold text-xl mt-10 hover:bg-slate-300 hover:rounded-lg px-5 py-2 transition duration-200 dark:text-white  " >
            Softech
        </div>
        <div className="border border-gray-300 w-52" >
        </div>
        <ProfileCard/>
        <div className="border border-gray-300 w-52" >
        </div>
        <LinkLists/>
      
    </div>
  )
}
