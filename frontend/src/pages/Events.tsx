// import React from "react";

import { Link , useNavigate } from "react-router-dom";


import Model from "../components/Model";
import {  useEffect, useState } from "react";
import {
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  EnvelopeIcon,
EyeIcon
} from "@heroicons/react/24/outline";
import TableHeader from "../components/TableHeader";
import NepaliDate from "nepali-date-converter";
import clsx from "clsx";
import axios from "axios";
import { url } from "../service/apiHelper";
import { Event } from "../types";
import EditFrom from "../components/EditFrom";

// import { userAtom } from "../recoil/userAtom";
// import { useRecoilValue } from "recoil";
import TablePagination from '@mui/material/TablePagination';

export default function Events() {
  // const { eventList, removeEvent } = useEvent();
  const naviagate = useNavigate()
  const [isEdit, setIsEdit] = useState(false);
  const [EventList, setEvents] = useState<Event[]>([]);
  const [currentEventId, setCurrentEventId] = useState("");
  const [selectMonth,setSelectMonth] = useState('0')
  const [page,setPage] = useState(0)
  const [rowPerPage,setRowPerPage] = useState(6)

  // const user = useRecoilValue(userAtom)
  const user = JSON.parse(localStorage.getItem('user')!)
  const getAllEvents = async()=>{

    try {
      const response = await axios.get(url.getAllEvents);

      if(selectMonth !== '0'){
        const filterData = response?.data?.filter((item : Event)=>((item.eventDateNepali.split('-')[1]) === selectMonth)
        )
        console.log(typeof(selectMonth))
        console.log(filterData)
        setEvents(filterData)
      }else{
        setEvents(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllEvents();
  }, [selectMonth]);

  const handlePageChange = (_e:any,newpage:number)=>{
    setPage(newpage)
  }
  function handlePerPage(e:any){
    setRowPerPage(+e.target.value)
    setPage(0)
  }


  const removeEvent = async(id:any)=>{
    try { 
        await axios.delete(url.deleteEvent,{data:{id:id}})
        

    } catch (error) {
      console.log(error);
    }

  }
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
                return <EditFrom event={event} setIsEdit={setIsEdit} />;
              }
            })}
          </div>
        </Model>
      )}

      <TableHeader title={"Events List"} />
      <div className="flex items-end justify-end mr-10 mb-3">

      <div className=" flex items-center">
        <h1 className="text-xl font-bold text-white">Filter By Month</h1>
        <select name="" id="" onChange={(e)=>setSelectMonth(e.target.value)} value={selectMonth} className="bg-green-600 rounded-md py-3  font-bold text-white focus:outline-none text-md" >
          <option value='0' >-- All Events --</option>
          <option value="1">बैशाख</option>
          <option value="2">जेठ</option>
          <option value="3">असार</option>
          <option value="4">श्रावण</option>
          <option value="5">भदौ</option>
          <option value="6">आश्विन</option>
          <option value="7">कार्तिक</option>
          <option value="8">मंसिर</option>
          <option value="9">पुष</option>
          <option value="10">माघ</option>
          <option value="11">फाल्गुन</option>
          <option value="12">चैत्र</option>
        </select>
      </div>
      </div>

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
                {
                  user?.data?.role === 'superadmin' ? 
                <th scope="col" className="px-6 py-3">
                  Actions
                </th> : <></>
                }
              </tr>
            </thead>
          ) : (
            ""
          )}
          <tbody>


            {EventList?.length > 0 ? (
              // .filter((event)=>((event?.userDetails === user?.data?._id)))
              sortedEvents?.slice((page * rowPerPage),((page * rowPerPage) + rowPerPage)).map((event, index) => {
                
                const eventDate = new Date(
                  `${event.eventDateNepali}`
                ).getTime();

                const isEventPassed = eventDate < currentDateTime;
                const isToday = eventDate === currentDateTime;

                return (

                  <tr
                    className={clsx("border-b bg-white cursor-pointer ", {
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
                          <p className="">{`${event.eventDateNepali}`}</p>
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

                      <td className="px-6 py-4" >
                        {event.eventTitle.slice(0, 15)}
                      </td>
                      <td className="px-6 py-4">
                        {event.eventDescription.slice(0, 15)}
                      </td>
                      <td className="px-6 py-4">
                        {convertTo12HourFormat(event.eventStartTime)}
                      </td>
                      {
                        user?.data?.role === 'superadmin'?
                      <td className="px-6 py-4">
                        <div className="justify-left flex gap-3  ">
                          <button
                            className="rounded-md bg-indigo-600 px-4 py-1.5 uppercase text-white hover:bg-indigo-700"
                            onClick={() => {
                              setCurrentEventId(event.eventId);
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
                          <Link
                            to={`/events/${event.eventId}`}
                            
                            className="rounded-md bg-orange-600 px-4 py-1.5 uppercase  text-white hover:bg-orange-700"
                          >
                            <EyeIcon className="h-5 w-5 " />
                          </Link>
                        </div>
                      </td> : <></>
                      }
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
        <div className="bg-white rounded-b-md mb-5 text-xl">

        <TablePagination
        rowsPerPageOptions={[7]}
        rowsPerPage={rowPerPage}
        page={page}
        count={sortedEvents.length}
        component={'div'}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePerPage}
        >

        </TablePagination>
        </div>
      </div>
    </div>
  );

}