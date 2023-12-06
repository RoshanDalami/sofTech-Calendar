// import React from 'react'

const userDetail = {
    image:
      "https://firebasestorage.googleapis.com/v0/b/weugly-94422.appspot.com/o/bamya2ndLot.jpg?alt=media&token=76cd814b-f93d-46c1-857c-26e8197a1b28",
    userDisplayName: "Roshan Dalami",
    role: "Admin",
  };
  

export default function MainProfileCard() {
  return (
    <div className='flex items-center border shadow-md border-gray-400/50 px-5 py-2 rounded-md gap-10 '>
        <img src={userDetail.image} className=" w-28 h-28 rounded-full " />
        <div className="mt-[-10px] flex flex-col gap-3">
            <p className="text-3xl font-bold dark:text-white " >Welcome , {userDetail.userDisplayName}</p>
            <p className="text-gray-500 dark:text-white text-md" >{userDetail.role}</p>
        </div>

    </div>
  )
}
