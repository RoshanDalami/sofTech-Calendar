// import React from 'react'
import { Card, Text, Metric } from "@tremor/react";
import axios from "axios";
import CountUp from "react-countup";
import { url } from "../service/apiHelper";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import NepaliDate from "nepali-date-converter";
import { Event } from "../types";
import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline'

export default function EventReportCard() {
  const [totalEvent, setTotalEvent] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState(0);
  const [pastEventsList,setPastEventsList] = useState<Event[]>([])
  const [todayEventsList,setTodayEventsList] = useState<Event[]>([])
  const [upcommingEventsList,setUpcommingEventsList] = useState<Event[]>([])
  const [todayEvents, setTodayEvents] = useState(0);
  const [upcommingEvents, setUpcommingEvents] = useState(0);
  const [eventOnMonthCount, setEventOnMonthCount] = useState(0);
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
    //   console.log(pastEvent.length,'past')
    setPastEventsList(pastEvent);
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
    setUpcommingEventsList(upcommingEvent);
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
      title: "Events This Month",
      metric: eventOnMonthCount,
    },
    {
      title: "Passed Events",
      metric: pastEvents,
    },
    {
      title: "Today Events",
      metric: todayEvents,
    },
    {
      title: "Upcomming Events",
      metric: upcommingEvents,
    },
  ];

  return (
    <>
    <div className="mx-1 grid items-center  gap-5   md:grid-cols-3 md:flex-row">
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

    <div className=" h-52 rounded-xl shadow-xl bg-gray-700 my-5 mx-2 ">
        <h1 className="mx-4 pt-3 text-xl font-bold dark:text-white">Passed Events</h1>
        <div className="h-48 overflow-auto">
            {
                pastEventsList?.map((event)=>{
                    return(
                        <div key={event.eventId} className="ml-4  flex items-center gap-5">
                            <ChevronDoubleRightIcon className="h-5 w-5 text-red-600" />
                            <p className="text-xl font-bold text-red-600" >{event.eventTitle}</p>
                        </div>
                    )
                })
            }

        </div>
    </div>
    <div className=" h-52 rounded-xl shadow-xl bg-gray-700 my-5 mx-2 ">
        <h1 className="mx-4 pt-3 text-xl font-bold dark:text-white">Today's Events</h1>
        <div className="h-48 overflow-auto">
            {
                todayEventsList?.map((event)=>{
                    return(
                        <div key={event.eventId} className="ml-4  flex items-center gap-5">
                            <ChevronDoubleRightIcon className="h-5 w-5 text-green-600" />
                            <p className="text-xl font-bold text-green-600" >{event.eventTitle}</p>
                        </div>
                    )
                })
            }

        </div>
    </div>
    <div className=" h-52 rounded-xl shadow-xl bg-gray-700 my-5 mx-2 ">
        <h1 className="mx-4 pt-3 text-xl font-bold dark:text-white">Upcomming Events</h1>
        <div className="h-48 overflow-auto">
            { upcommingEventsList?.length > 0 ?
                upcommingEventsList?.map((event)=>{
                    return(
                        <div key={event.eventId} className="ml-4  flex items-center gap-5">
                            <ChevronDoubleRightIcon className="h-5 w-5 text-blue-600" />
                            <p className="text-xl font-bold text-blue-600" >{event.eventTitle}</p>
                        </div>
                    )
                }) : <p className="text-4xl mx-4 font-bold mt-10 ml-24 dark:text-gray-200"> No upcomming events</p>
            }

        </div>
    </div>
    </div>
    </>
  );
}