// import React from 'react'

import LinkLists from "./LinkLists";
import ProfileCard from "./ProfileCard";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();



  return (
    <div className="h-[100vh] w-60 fixed bg-slate-200 rounded-r-3xl flex flex-col items-center overflow-hidden dark:bg-gray-900 ">
      <div className="font-bold text-xl mt-10  hover:rounded-lg px-5 py-2 transition duration-200 dark:text-white  ">
        Softech
      </div>
      <div className="border border-gray-300 w-52"></div>
      <ProfileCard />
      <div className="border border-gray-300 w-52"></div>
      <LinkLists />
      <div className=" absolute bottom-5">
        <button className="bg-red-600 rounded-md px-4 py-1.5 text-white flex text-lg items-center gap-3 w-full " onClick={()=>navigate('/')} >
          Log Out
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
