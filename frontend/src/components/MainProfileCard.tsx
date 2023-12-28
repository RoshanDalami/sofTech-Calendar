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

export default function MainProfileCard() {
  const userDetails = JSON.parse(localStorage.getItem("user")!);

  // console.log(user, "hey");
  return (
    <div className="flex justify-between rounded-md border border-gray-400/50 px-5 py-5 shadow-md   ">
      <div className="flex flex-col items-center gap-10 md:flex-row ">
        <img src={userDetail.image} className=" h-28 w-28 rounded-full " />
        <div className="mt-[-10px] flex flex-col items-center md:gap-3">
          <p className="font-bold dark:text-white md:text-3xl ">
            Welcome ,{userDetails.username}
          </p>
          <p className="text-md text-gray-500 dark:text-white">
            {userDetails.role}
          </p>
        </div>
      </div>

      <div className="mr-5 flex flex-col gap-2">
        <span className="flex  items-center ">
          <div className="mx-3 h-3 w-3 rounded-full bg-lime-600"></div>
          <p className="text-md text-black dark:text-white">Todo</p>
          <div className="mx-3 flex h-6  w-6 items-center justify-center  rounded-full bg-gray-400/50 text-xs  text-black dark:text-white">
            <span>
              <CountUp end={10} />
            </span>
          </div>
        </span>
        <span className="flex  items-center ">
          <div className="mx-3 h-3 w-3 rounded-full bg-orange-600"></div>
          <p className="text-md text-black dark:text-white">In progress</p>
          <div className="mx-3 flex h-6  w-6 items-center justify-center rounded-full bg-gray-400/50 text-xs  text-black dark:text-white">
            <span>
              <CountUp end={13} />
            </span>
          </div>
        </span>
        <span className="flex  items-center ">
          <div className="mx-3 h-3 w-3 rounded-full bg-indigo-600"></div>
          <p className="text-md text-black dark:text-white">Completed</p>
          <div className="mx-3 flex h-6  w-6 items-center justify-center rounded-full bg-gray-400/50 text-xs  text-black dark:text-white">
            <span>
              <CountUp end={20} />
            </span>
          </div>
        </span>
        <span className="flex  items-center ">
          <div className="mx-3 h-3 w-3 rounded-full bg-blue-600"></div>
          <p className="text-md text-black dark:text-white">Backlogs</p>
          <div className="mx-3 flex h-6  w-6 items-center justify-center rounded-full bg-gray-400/50 text-xs  text-black dark:text-white">
            <span>
              <CountUp end={2} />
            </span>
          </div>
        </span>
      </div>
    </div>
  );
}
