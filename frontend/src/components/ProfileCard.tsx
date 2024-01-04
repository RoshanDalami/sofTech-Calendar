// import React from 'react'
import { userAtom } from "../recoil/userAtom";
import { RecoilValue, useRecoilValue } from "recoil";
import { User } from "../types";

// import { useUser } from "../Context";
const userDetail = {
  image:
    "https://firebasestorage.googleapis.com/v0/b/weugly-94422.appspot.com/o/bamya2ndLot.jpg?alt=media&token=76cd814b-f93d-46c1-857c-26e8197a1b28",
  userDisplayName: "Roshan Dalami",
  role: "Admin",
};

export default function ProfileCard() {

const user:User = useRecoilValue(userAtom);

  

  return (
    <div className="my-5 flex cursor-pointer items-center gap-4 rounded-lg bg-gray-300/50 px-3 py-2 ">
      <div className="h-10 w-10 overflow-hidden rounded-full">
        <img src={userDetail.image} alt="profile image" />
      </div>
      <div className="flex flex-col items-start ">

        <p className="text-md font-semibold  text-gray-600 dark:text-white ">
          {userDetails?.username}
        </p>
        <p className="text-gray-500 dark:text-white">{userDetails?.role}</p>
      </div>
    </div>
  );
}
