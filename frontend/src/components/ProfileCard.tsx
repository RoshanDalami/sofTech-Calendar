// import React from 'react'



// import { useUser } from "../Context";
const userDetail = {
  image:
    "https://firebasestorage.googleapis.com/v0/b/weugly-94422.appspot.com/o/bamya2ndLot.jpg?alt=media&token=76cd814b-f93d-46c1-857c-26e8197a1b28",
  userDisplayName: "Roshan Dalami",
  role: "Admin",
};



export default function ProfileCard() {
  const userDetails = JSON.parse(localStorage.getItem('user')!)
  
  return (
    <div className="bg-gray-300/50 rounded-lg flex items-center gap-4 py-2 px-3 my-5 cursor-pointer ">
      <div className="h-10 w-10 rounded-full overflow-hidden">
        <img src={userDetail.image} alt="profile image" />
      </div>
      <div className="flex flex-col items-start ">
        <p className="text-md text-gray-600  font-semibold dark:text-white " >{userDetails.username}</p>
        <p className="text-gray-500 dark:text-white">{userDetails.role}</p>
      </div>
    </div>
  );
}
