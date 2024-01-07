// import React from 'react'
import { Card, Text, Metric } from "@tremor/react";
import axios from "axios";
import CountUp from "react-countup";
import { url } from "../service/apiHelper";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import NepaliDate from "nepali-date-converter";
import { Event } from "../types";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

export default function EventReportCard() {
  const [totalEvent, setTotalEvent] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState(0);
  const [pastEventsList, setPastEventsList] = useState<Event[]>([]);
  const [todayEventsList, setTodayEventsList] = useState<Event[]>([]);
  const [upcommingEventsList, setUpcommingEventsList] = useState<Event[]>([]);
  const [todayEvents, setTodayEvents] = useState(0);
  const [upcommingEvents, setUpcommingEvents] = useState(0);
  const [eventOnMonthCount, setEventOnMonthCount] = useState(0);
  const [eventOnNextCount, setEventOnNextCount] = useState(0);
  // const user = useRecoilValue(userAtom)
  const user = JSON.parse(localStorage.getItem("user")!);
  const nepali_date = new NepaliDate();

  const getEventsByUser = async () => {
    try {
      const response = await axios.get(
        `${url.getAllEventsByUser}/${user.data._id}`
      );
      setTotalEvent(response?.data?.length);
      setEvents(response?.data);
    } catch (error) {
      toast.error("Failed to get total events");
    }
  };
  const getEvents = async () => {
    try {
      const response = await axios.get(
        `${url.getAllEventsByUser}/${user.data._id}`
      );
      setEvents(response?.data);
    } catch (error) {
      toast.error("Failed to get total events");
    }
  };

  useEffect(() => {
    getEventsByUser();
  }, [totalEvent]);
  useEffect(() => {
    getEvents();
  }, [events]);

  const getEventOnMonthCount = async () => {
    const eventsOnMonth = events?.filter(
      (item) =>
        item.eventDateNepali.split("-")[0] ===
          nepali_date.format("YYYY-M-D").split("-")[0] &&
        item.eventDateNepali.split("-")[1] ===
          nepali_date.format("YYYY-M-D").split("-")[1]
    );
    setEventOnMonthCount(eventsOnMonth?.length);
  };
  useEffect(() => {
    getEventOnMonthCount();
  }, [events]);
  const getEventOnNextCount = async () => {
    const eventsOnMonth = events?.filter(
      (item) =>
        item.eventDateNepali.split("-")[0] ===
          nepali_date.format("YYYY-M-D").split("-")[0] &&
        item.eventDateNepali.split("-")[1] ===
         ( (parseInt(nepali_date.format("YYYY-M-D").split("-")[1]) + 1).toString())
    );
    setEventOnNextCount(eventsOnMonth?.length);
  };
  useEffect(() => {
    getEventOnNextCount();
  }, [events]);

  //todays events
  const getTodayEventsCount = async () => {
    const TodayEvent = events?.filter(
      (item) =>
        new Date(item.eventDateNepali).getTime() ===
        new Date(
          `${new NepaliDate().getBS().year}/${
            new NepaliDate().getBS().month + 1
          }/${new NepaliDate().getBS().date}`
        ).getTime()
    );
    //   console.log(pastEvent.length,'past')
    setTodayEvents(TodayEvent.length);
  };
  const getTodayEvents = async () => {
    const TodayEvent = events?.filter(
      (item) =>
        new Date(item.eventDateNepali).getTime() ===
        new Date(
          `${new NepaliDate().getBS().year}/${
            new NepaliDate().getBS().month + 1
          }/${new NepaliDate().getBS().date}`
        ).getTime()
    );
    //   console.log(pastEvent.length,'past')
    setTodayEventsList(TodayEvent);
  };
  useEffect(() => {
    getTodayEventsCount();
  }, [events]);
  useEffect(() => {
    getTodayEvents();
  }, [events]);

  //passed events
  const getPastEventsCount = async () => {
    const pastEvent = events?.filter(
      (item) =>
        new Date(item.eventDateNepali).getTime() <
        new Date(
          `${new NepaliDate().getBS().year}/${
            new NepaliDate().getBS().month + 1
          }/${new NepaliDate().getBS().date}`
        ).getTime()
    );
    //   console.log(pastEvent.length,'past')
    setPastEvents(pastEvent.length);
  };
  const getPastEvents = async () => {
    const pastEvent = events?.filter(
      (item) =>
        new Date(item.eventDateNepali).getTime() <
        new Date(
          `${new NepaliDate().getBS().year}/${
            new NepaliDate().getBS().month + 1
          }/${new NepaliDate().getBS().date}`
        ).getTime()
    );
    const pastEventOfThreeMonth = pastEvent.filter((item)=>((item.eventDateNepali.split('-')[0] === new NepaliDate().getBS().year.toString()) && ((item.eventDateNepali.split('-')[1] === (new NepaliDate().getMonth() + 1 ).toString()) || (item.eventDateNepali.split('-')[1] === (new NepaliDate().getMonth() ).toString()) || (item.eventDateNepali.split('-')[1] === (new NepaliDate().getMonth() - 1 ).toString())) ))
    //   console.log(pastEvent.length,'past')
    setPastEventsList(pastEventOfThreeMonth.sort((a, b) => {
      const dateA = new Date(`${a.eventDateNepali}`).getTime();
      const dateB = new Date(`${b.eventDateNepali}`).getTime();
      return dateA - dateB;
    }));
  };
  useEffect(() => {
    getPastEventsCount();
  }, [events]);
  useEffect(() => {
    getPastEvents();
  }, [events]);

  //upcomming events
  const getUpcommingEventsCount = async () => {
    const upcommingEvent = events?.filter(
      (item) =>
        new Date(item.eventDateNepali).getTime() >
        new Date(
          `${new NepaliDate().getBS().year}/${
            new NepaliDate().getBS().month + 1
          }/${new NepaliDate().getBS().date}`
        ).getTime()
    );
    setUpcommingEvents(upcommingEvent.length);
  };
  const getUpcommingEvents = async () => {
    const upcommingEvent = events?.filter(
      (item) =>
        new Date(item.eventDateNepali).getTime() >
        new Date(
          `${new NepaliDate().getBS().year}/${
            new NepaliDate().getBS().month + 1
          }/${new NepaliDate().getBS().date}`
        ).getTime()
    );
    const upcommingEventOfThreeMonth = upcommingEvent.filter((item)=>((item.eventDateNepali.split('-')[0] === new NepaliDate().getBS().year.toString()) && ((item.eventDateNepali.split('-')[1] === (new NepaliDate().getMonth() + 1 ).toString()) || (item.eventDateNepali.split('-')[1] === (new NepaliDate().getMonth() + 3 ).toString()) || (item.eventDateNepali.split('-')[1] === (new NepaliDate().getMonth() + 2 ).toString())) ))
    //   console.log(pastEvent.length,'past')
    setUpcommingEventsList(upcommingEventOfThreeMonth.sort((a, b) => {
      const dateA = new Date(`${a.eventDateNepali}`).getTime();
      const dateB = new Date(`${b.eventDateNepali}`).getTime();
      return dateA - dateB;
    }));
  };
  useEffect(() => {
    getUpcommingEvents();
  }, [events]);
  useEffect(() => {
    getUpcommingEventsCount();
  }, [events]);

  const cardDetails = [
    {
      title: "Total Events",
      metric: totalEvent,
    },
    {
      title: "Today Events",
      metric: todayEvents,
    },
    {
      title: "Events This Month",
      metric: eventOnMonthCount,
    },
    {
      title: "Events Next Month",
      metric: eventOnNextCount,
    },
    {
      title: "Passed Events",
      metric: pastEvents,
    },
    {
      title: "Upcomming Events",
      metric: upcommingEvents,
    },
  ];

  return (
    <>
      <div className="mx-1 grid grid-cols-3  items-center  gap-5  md:grid-cols-3 md:flex-row">
        {cardDetails?.map((card) => {
          return (
            <Card key={card.title}>
              <Text>{card.title}</Text>
              <Metric>
                <CountUp
                  end={+card.metric}
                  start={0}
                  // duration={}
                />
                {/* {card.metric} */}
              </Metric>
            </Card>
          );
        })}
      </div>
      <div className="grid grid-cols-2">
        <div className=" mx-2 my-5 h-52 rounded-xl bg-gray-300 dark:bg-gray-700 shadow-xl ">
          <h1 className="mx-4 pt-3 text-xl font-bold dark:text-white">
            Passed Events of 3 Months 
             <span className="bg-gray-200 px-2 py-1 mx-3 rounded-full text-gray-900">
               {pastEventsList.length}
              </span>
          </h1>
          <div className="h-[10rem] overflow-auto">
            {pastEventsList?.map((event) => {
              return (
                <div
                  key={event.eventId}
                  className="ml-4 my-2 flex items-center gap-5"
                >
                  <ChevronDoubleRightIcon className="h-5 w-5 text-red-400" />
                  <p className="text-xl font-bold text-red-400">
                    {event.eventTitle}
                  </p>
                  <p className="bg-red-400 p-1 rounded-md text-white fond-bold">
                    {event.eventDateNepali}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" mx-2 my-5 h-52 rounded-xl bg-gray-300 dark:bg-gray-700 shadow-xl ">
          <h1 className="mx-4 pt-3 text-xl font-bold dark:text-white">
            Today's Events 
            <span className="bg-gray-200 px-2 py-1 mx-3 rounded-full text-gray-900">
               {todayEventsList.length}
              </span>
          </h1>
          <div className="h-[10rem] overflow-auto">
            {todayEventsList?.map((event) => {
              return (
                <div
                  key={event.eventId}
                  className="ml-4 my-2 flex items-center gap-5"
                >
                  <ChevronDoubleRightIcon className="h-5 w-5 text-green-600" />
                  <p className="text-xl font-bold text-green-600">
                    {event.eventTitle}
                  </p>
                  <p className="bg-green-900 p-1 rounded-md text-white fond-bold">
                    {event.eventDateNepali}
                  </p>

                </div>
              );
            })}
          </div>
        </div>
        <div className=" mx-2 my-5 h-52 rounded-xl bg-gray-300 dark:bg-gray-700 shadow-xl ">
          <h1 className="mx-4 pt-3 text-xl font-bold dark:text-white">
            Upcomming Events on 3 Months
            <span className="bg-gray-200 px-2 py-1 mx-3 rounded-full text-gray-900">
               {upcommingEventsList.length}
              </span>
          </h1>
          <div className="h-[10rem] overflow-auto">
            {upcommingEventsList?.length > 0 ? (
              upcommingEventsList?.map((event) => {
                return (
                  <div
                    key={event.eventId}
                    className="ml-4 my-2 flex items-center gap-5"
                  >
                    <ChevronDoubleRightIcon className="h-5 w-5 text-blue-400" />
                    <p className="text-xl font-bold text-blue-400">
                      {event.eventTitle}
                    </p>
                    <p className="bg-blue-600 p-1 rounded-md text-white fond-bold">
                    {event.eventDateNepali}
                  </p>
                  </div>
                );
              })
            ) : (
              <p className="mx-4 ml-24 mt-10 text-4xl font-bold dark:text-gray-200">
                {" "}
                No upcomming events
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
