// import React from 'react'
import { Card, Text, Metric } from "@tremor/react";
import axios from "axios";
import CountUp from "react-countup";
import { url } from "../service/apiHelper";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import NepaliDate from "nepali-date-converter";
import { Event } from "../types";

export default function EventCard() {
  const [totalEvent, setTotalEvent] = useState(0);
  const [totalTask, setTotalTask] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
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
      const response = await axios.get(`${url.getAllEvents}`);
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
  }, []);

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

  const getTaskByUser = async () => {
    try {
      const response = await axios.get(
        `${url.getAllTaskByUser}/${user?.data?._id}`
      );
      setTotalTask(response.data.length);
    } catch (error) {
      toast.error("Task fetching failed");
    }
  };
  const getTaskAssigned = async () => {
    try {
      const response = await axios.get(
        `${url.getTaskByAssignee}/${user?.data?.username}`
      );
      setTotalTask(response.data.length);
    } catch (error) {
      toast.error("Task fetching failed");
    }
  };

  useEffect(() => {
    if (user?.data?.role === "superadmin") {
      getTaskByUser();
    } else {
      getTaskAssigned();
    }
  }, [totalTask]);

  const cardDetails = [
    {
      title: "Total Events",
      metric: events.length,
    },
    {
      title: "Events This Month",
      metric: eventOnMonthCount,
    },
    {
      title: "Total Task",
      metric: totalTask,
    },
  ];

  return (
    <div className="mx-4 flex flex-col items-center gap-5 md:flex-row">
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
  );
}
