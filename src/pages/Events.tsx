// import React from "react";

import { Link } from "react-router-dom";
import { useEvent } from "../Context";
import Model from "../components/Model";
import { useState } from "react";
import {
  XCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import TableHeader from "../components/TableHeader";
import NepaliDate from "nepali-date-converter";
import clsx from "clsx";

export default function Events() {
  const { eventList, removeEvent } = useEvent();
  const [isEdit, setIsEdit] = useState(false);
  const [currentEventId, setCurrentEventId] = useState("");
  const [formData, setFormData] = useState({
    event: "",
    description: "",
    year: "",
    month: "",
    date: "",
  });

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("Hello");
    console.log(formData);
  };

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

  const sortedEvents = eventList?.sort((a, b) => {
    const dateA = new Date(`${a.year}/${a.month}/${a.date}`).getTime();
    const dateB = new Date(`${b.year}/${b.month}/${b.date}`).getTime();
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
            {eventList?.map((event) => {
              if (event.id === currentEventId) {
                return (
                  <form
                    action=""
                    className="mx-5 mt-12 flex flex-col gap-4"
                    onSubmit={onSubmitHandler}
                    key={event.id}
                  >
                    <div className="flex flex-col gap-2">
                      <label htmlFor="event" className="text-2xl font-bold">
                        Event
                      </label>
                      <input
                        type="text"
                        className="rounded-md border-[1px] border-gray-500 px-4 py-2"
                        placeholder="Events"
                        onChange={(e) => {
                          setFormData({ ...formData, event: e.target.value });
                        }}
                        value={event.event}
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="description"
                        className="text-2xl font-bold"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        className="rounded-md border-[1px] border-gray-500 px-4 py-2"
                        placeholder="Event Description"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          });
                        }}
                        value={event.description}
                        required
                      />
                    </div>
                    <div className="flex items-center gap-2 ">
                      <div>
                        <label htmlFor="">Year</label>
                        <input
                          type="text"
                          className="rounded-md border-[1px] border-gray-500 px-4 py-2"
                          value={event.year}
                          readOnly
                        />
                      </div>
                      <div>
                        <label htmlFor="">Month</label>
                        <input
                          type="text"
                          className="rounded-md border-[1px] border-gray-500 px-4 py-2"
                          value={event.month}
                          readOnly
                        />
                      </div>
                      <div>
                        <label htmlFor="">Date</label>
                        <input
                          type="text"
                          className="rounded-md border-[1px] border-gray-500 px-4 py-2"
                          value={event.date}
                          readOnly
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mb-3 mt-2 rounded-md bg-blue-600 py-2 text-white"
                    >
                      Update Event
                    </button>
                  </form>
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
            {eventList?.length > 0 ? (
              eventList?.map((event, index) => {
                const eventDate = new Date(
                  `${event.year}/${event.month}/${event.date}`
                ).getTime();

                const isEventPassed = eventDate < currentDateTime;
                const isToday = eventDate === currentDateTime;

                return (
                  <tr
                    className={clsx("border-b bg-white  ", {
                      "bg-red-200/50 text-red-600" : isEventPassed ,
                    })}
                    key={event.id}
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
                          {`${event.year}/${event.month}/${event.date}`}
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

                    <td className="px-6 py-4">{event.event}</td>
                    <td className="px-6 py-4">{event.description}</td>
                    <td className="px-6 py-4">
                      {convertTo12HourFormat(event.time)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="justify-left flex gap-3  ">
                        <button
                          className="rounded-md bg-indigo-600 px-4 py-1.5 uppercase text-white hover:bg-indigo-700"
                          onClick={() => {
                            setCurrentEventId(event.id);
                            setIsEdit(true);
                          }}
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="rounded-md bg-red-600 px-4 py-1.5 uppercase text-white hover:bg-red-700"
                          onClick={() => removeEvent(event.id)}
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
