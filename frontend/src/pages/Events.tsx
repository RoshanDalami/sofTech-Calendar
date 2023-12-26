// import React from "react";

import { Link } from "react-router-dom";

import Model from "../components/Model";
import { useEffect, useState } from "react";
import {
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import TableHeader from "../components/TableHeader";
import NepaliDate from "nepali-date-converter";
import clsx from "clsx";
import axios from 'axios'
import { url } from "../service/apiHelper";
import { Event } from "../types";
import EditFrom from "../components/EditFrom";
import { userAtom } from "../recoil/userAtom";
import { useRecoilValue } from "recoil";
export default function Events() {
  // const { eventList, removeEvent } = useEvent();
  const [isEdit, setIsEdit] = useState(false);
  const [EventList,setEvents] = useState<Event[]>([])
  const [currentEventId, setCurrentEventId] = useState("");
  const user = useRecoilValue(userAtom)
  const getAllEvents = async()=>{
    try {
      
      const response = await axios.get(url.getAllEvents)
  
      setEvents(response.data)
    } catch (error) {
        console.log(error)
    }
  }
  useEffect(()=>{
    getAllEvents();
  },[EventList])



  const removeEvent = async(id:any)=>{
    console.log(id)
    try { 
        await axios.delete(url.deleteEvent,{data:{id:id}})
        
    } catch (error) {
      console.log(error)
    }
  }
const userDetail = JSON.parse(localStorage.getItem('user')!)
  // const onSubmitHandler = (e: any) => {
  //   e.preventDefault();
  //   console.log("Hello");
  //   console.log(formData);
  // };

  function convertTo12HourFormat(time24: string) {
    // Split the time string into hours and minutes
    const [hours, minutes] = time24?.split(":");

    // Convert hours to a number
    let hoursIn12Format = parseInt(hours, 10);

    // Determine the period (AM or PM)
    const period = hoursIn12Format >= 12 ? "PM" : "AM";

    // Adjust hours for 12-hour format
    hoursIn12Format = hoursIn12Format % 12 || 12;

    // Construct the 12-hour time string
    const time12 = `${hoursIn12Format}:${minutes} ${period}`;

    return time12;
  }

  const sortedEvents = EventList?.sort((a, b) => {
    const dateA = new Date(`${a.eventDateNepali}`).getTime();
    const dateB = new Date(`${b.eventDateNepali}`).getTime();
    return dateA - dateB;
  });

  const currentDateTime = new Date(
    `${new NepaliDate().getBS().year}/${new NepaliDate().getBS().month + 1}/${
      new NepaliDate().getBS().date
    }`
  ).getTime();

  return (
    <div className="  min-h-screen   ">
      {isEdit && (
        <Model>
          <div className="relative rounded-md bg-white p-3">
            <XCircleIcon
              className="absolute right-5 h-10 w-10 cursor-pointer text-black"
              onClick={() => {
                setIsEdit(false);
              }}
            />
            {EventList?.map((event) => {
              if (event.eventId === currentEventId) {
                return (
                  <EditFrom event={event} setIsEdit={setIsEdit} />
                );
              }
            })}
          </div>
        </Model>
      )}

      <TableHeader title={"Events List"} />

      <div className="relative mx-4 overflow-x-auto ">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right ">
          {sortedEvents?.length > 0 ? (
            <thead className="bg-gray-200 text-xs uppercase text-gray-700 ">
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
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
          ) : (
            ""
          )}
          <tbody>
            {EventList?.length > 0 ? (
              sortedEvents?.filter((event)=>event?.userDetails === user?.data?._id ).map((event, index) => {
                const eventDate = new Date(
                  `${event.eventDateNepali}`
                ).getTime();

                const isEventPassed = eventDate < currentDateTime;
                const isToday = eventDate === currentDateTime;

                return (
                  <tr
                    className={clsx("border-b bg-white  ", {
                      "bg-red-200/50 text-red-600" : isEventPassed ,
                    })}
                    key={event.eventId}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">
                      <p className="text-center text-lg">
                        <p className="">
                          { `${event.eventDateNepali}`}
                        </p>
                        {isToday ? (
                          <p className="rounded-lg bg-gray-300/60 text-center text-sm  text-lime-600 ">
                            Today
                          </p>
                        ) : isEventPassed ? (
                          <p className="rounded-lg bg-red-300/60 text-center text-sm  text-red-600 ">
                            Event passed
                          </p>
                        ) : (
                          <p className="rounded-lg bg-gray-300/60 text-center text-sm  text-blue-600 ">
                            Upcoming
                          </p>
                        )}
                      </p>
                    </td>

                    <td className="px-6 py-4">{event.eventTitle.slice(0,15)}</td>
                    <td className="px-6 py-4">{event.eventDescription.slice(0,15)}</td>
                    <td className="px-6 py-4">
                      {convertTo12HourFormat(event.eventStartTime)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="justify-left flex gap-3  ">
                        <button
                          className="rounded-md bg-indigo-600 px-4 py-1.5 uppercase text-white hover:bg-indigo-700"
                          onClick={() => {
                            setCurrentEventId(event.eventId)
                            setIsEdit(true);
                          }}
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="rounded-md bg-red-600 px-4 py-1.5 uppercase text-white hover:bg-red-700"
                          onClick={() => removeEvent(event.eventId)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                        <Link
                          to={"https://mail.google.com/"}
                          target="_blank"
                          className="rounded-md bg-lime-600 px-4 py-1.5 uppercase text-white hover:bg-lime-700"
                        >
                          <EnvelopeIcon className="h-5 w-5" />
                        </Link>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4">
                      {isToday ? (
                        <p className="bg-gray-300 rounded-lg text-center text-lime-600 py-1 ">Today</p>
                      ) : isEventPassed ? (
                        <p className="bg-gray-300 rounded-lg text-center text-red-600 py-1 ">Event passed</p>
                        
                      ) : (
                        <p className="bg-gray-300 rounded-lg text-center text-blue-600 py-1 ">Upcoming</p>
                        
                      )}
                    </td> */}
                  </tr>
                );
              })
            ) : (
              <p className="text-center text-3xl font-bold text-gray-700/60">
                No Events Available
              </p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
