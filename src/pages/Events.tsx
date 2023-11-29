// import React from "react";

import { Link } from "react-router-dom";
import { useEvent } from "../Context";
import Model from "../components/Model";
import { useState } from "react";
import { XCircleIcon , PencilSquareIcon,TrashIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import TableHeader from "../components/TableHeader"





export default function Events() {
  const { eventList, removeEvent } = useEvent();
  const [isEdit, setIsEdit] = useState(false);
  const [currentEventId, setCurrentEventId] = useState("");
  const [formData, setFormData] = useState({
    event: "",
    description: "",
    year: '',
    month: '',
    date: '',
  });



  const onSubmitHandler = (e:any) => {
    e.preventDefault();
    console.log("Hello");
    console.log(formData)
  };

 
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
                          setFormData({ ...formData, description: e.target.value });
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

      <TableHeader title={"Events List"}/>

      <div className="relative mx-4">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right ">
          {eventList?.length > 0 ? (
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
                return (
                  <tr className="border-b bg-white " key={event.id}>
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">
                      {`${event.year}-${event.month}-${event.date}`}
                    </td>

                    <td className="px-6 py-4">{event.event}</td>
                    <td className="px-6 py-4">{event.description}</td>
                    <td className="px-6 py-4">
                      <div className="justify-left flex gap-3  ">
                        <button
                          className="rounded-md bg-indigo-600 px-4 py-1.5 text-white hover:bg-indigo-700 uppercase"
                          onClick={() => {
                            setCurrentEventId(event.id);
                            setIsEdit(true);
                          }}
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="rounded-md bg-red-600 px-4 py-1.5 text-white hover:bg-red-700 uppercase"
                          onClick={() => removeEvent(event.id)}
                        >
                          <TrashIcon className="h-5 w-5"/>
                        </button>
                        <Link
                          to={"https://mail.google.com/"}
                          target="_blank"
                          className="rounded-md bg-lime-600 px-4 py-1.5 text-white hover:bg-lime-700 uppercase"
                        >
                          <EnvelopeIcon className="h-5 w-5"/>
                        </Link>
                      </div>
                    </td>
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
