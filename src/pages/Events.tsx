// import React from "react";

import { Link } from "react-router-dom";
import { useEvent } from "../Context";

export default function Events() {
  const { eventList , removeEvent } = useEvent();
  return (
    <div className="  min-h-screen   ">
      <p className="text-5xl font-bold text-center my-3">Events</p>


<div className="relative mx-4">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    S.N
                </th>
                <th scope="col" className="px-6 py-3">
                    Nepali Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Event
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
          {
            eventList?.map((event,index)=>{
              return(
                <tr className="bg-white border-b " key={event.id} >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {index + 1}
                </th>
                <td className="px-6 py-4">
                    {`${event.year}-${event.month}-${event.date}`}
                </td>
                
                <td className="px-6 py-4">
                    {event.event}
                </td>
                <td className="px-6 py-4">
                   {event.description}
                </td>
                <td className="px-6 py-4">
                    <div className="flex justify-left gap-3">
                      <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 text-white rounded-md">Edit</button>
                      <button className="bg-red-600 hover:bg-red-700 px-4 py-1.5 text-white rounded-md" onClick={()=>removeEvent(event.id)} >delete</button>
                      <Link to={'mailto:roshandalami0@gmail.com'} className="bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 text-white rounded-md" >
                        send mail
                      </Link>
                    </div>
                </td>
            </tr>
              )
            })
          }
            
            
        </tbody>
    </table>
</div>

      
    </div>
  );
}
