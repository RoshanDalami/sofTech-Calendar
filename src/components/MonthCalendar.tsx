// import {
//   getTithiNepali,
//   getChandramaNepali,
//   getTithiEnglish,
//   getChandramaEnglish,
//   relativeTimeFromDates,
// } from "../helper/dates";
import { relativeTimeFromDates } from "../helper/dates";
import nepaliNumber from "../helper/nepaliNumber";
// import AddEventModal from "./AddEventModal";

import useLanguage from "../helper/useLanguage";
import { DayData } from "../types/calendar.types";
import { useEffect, useMemo, useState  } from "react";
import NepaliDate from "nepali-date-converter";
// import useUser from "../helper/useUser";
import { CalendarEventsResult } from "../types/events.types";
import colors from "../constants/colors";
// import SingleUserEvent from "./SingleUserEvent";
import { classNames } from "../helper/utils";
import { useParams } from "react-router-dom";
import Model from "./Model";
// import { eventList } from "../pages/Home";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { nanoid } from 'nanoid'



const getEventsOfSelectedDay = (events: CalendarEventsResult, day: Date) => {
  if (!events || !events.events.length) return [];
  return events.events.filter((event) => {
    const startDate = new Date(
      event.start.date || event.start.dateTime || day.toDateString()
    );
    const endDate = new Date(
      event.end.date || event.end.dateTime || day.toDateString()
    );
    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);
    if (event.end.date) endDate.setDate(endDate.getDate() - 1);
    return startDate <= dayEnd && endDate >= dayStart;
  });
};

const isSameMonth = (date1: NepaliDate, date2: NepaliDate) => {
  return (
    date1.getBS().year === date2.getBS().year &&
    date1.getBS().month === date2.getBS().month
  );
};




export default function MonthCalendar({
  monthData,
  userEvents,
}: {
  monthData: DayData[];
  userEvents?: CalendarEventsResult;
}) {
  const { BSYear, BSMonth } = useParams();
  



  
  const [modelOpen, setModelOpen] = useState(false);
  console.log(modelOpen,"hello");

 if (BSMonth === undefined || BSYear === undefined) {
    window.location.reload();
}

  
  const [eventList, setEventList] = useState<
    {
      event: string;
      description: string;
      year: string | undefined;
      month: string | undefined;
      date: string | undefined;
      id:string;
    }[]
  >([]);

  const { t, isNepaliLanguage } = useLanguage();
  // const { status } = useUser();
  const today = useMemo(() => new NepaliDate(), []);
  // replace all dots with slash
  const firstDay = useMemo(() => {
    const { bs_year, bs_month, bs_day } = monthData[0].AD_date;
    return new NepaliDate(`${bs_year}-${bs_month}-${bs_day}`);
  }, [monthData]);

  const [selectedDay, setSelectedDay] = useState<NepaliDate>(
    isSameMonth(today, firstDay) ? today : firstDay
  );
  // const selectedDayData = useMemo(() => {
  //   const selectedDayIndex = selectedDay.getBS().date - 1;
  //   return monthData[selectedDayIndex];
  // }, [selectedDay]);

  useEffect(() => {
    setSelectedDay(isSameMonth(today, firstDay) ? today : firstDay);
  }, [monthData]);

  const [formData, setFormData] = useState({
    event: "",
    description: "",
    year: BSYear,
    month: BSMonth,
    date: selectedDay.getDate(),
  });
  console.log(formData,"hello")
  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    try {
      const formattedDate = selectedDay.format("DD");

      // Update eventList using setEventList
      setEventList((prevEventList) => [
        ...prevEventList,
        {
          ...formData,
          date: formattedDate,
          id:nanoid()
        },
      ]);

      console.log(eventList);
      console.log("submitted");

      setFormData({
        event: "",
        description: "",
        year: BSYear,
        month: BSMonth,
        date: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(eventList);
  // console.log(BSMonth);

  // console.log(selectedDay.getBS().year);
  // console.log(selectedDay.getBS().month + 1);
  // console.log(selectedDay.getBS().date);

  const eventDeleteHandler = (id:string)=>{
    const updatedList = eventList.filter((item)=>item.id !== id)
    setEventList(updatedList)
    return updatedList
    
  }
  


  return (
    <>
      {modelOpen && (
        <Model>
          <div className="bg-white p-3 rounded-md relative">
            <XCircleIcon
              className="h-10 w-10 text-black cursor-pointer absolute right-5"
              onClick={() => {
                setModelOpen(false);
              }}
            />
            <form
              action=""
              className="flex flex-col mx-5 mt-12 gap-4"
              onSubmit={onSubmitHandler}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="event" className="text-2xl font-bold">
                  Event
                </label>
                <input
                  type="text"
                  className="py-2 border-[1px] border-gray-500 rounded-md px-4"
                  placeholder="Events"
                  onChange={(e) => {
                    setFormData({ ...formData, event: e.target.value });
                  }}
                  value={formData.event}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-2xl font-bold">
                  Description
                </label>
                <input
                  type="text"
                  className="py-2 border-[1px] border-gray-500 rounded-md px-4"
                  placeholder="Event Description"
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                  }}
                  value={formData.description}
                  required
                />
              </div>
              <div className="flex items-center gap-2 ">
                <div>
                  <label htmlFor="">Year</label>
                  <input
                    type="text"
                    className="py-2 border-[1px] border-gray-500 rounded-md px-4"
                    value={BSYear}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="">Month</label>
                  <input
                    type="text"
                    className="py-2 border-[1px] border-gray-500 rounded-md px-4"
                    value={BSMonth}
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="">Date</label>
                  <input
                    type="text"
                    className="py-2 border-[1px] border-gray-500 rounded-md px-4"
                    value={selectedDay.getBS().date}
                    readOnly
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-600 rounded-md py-2 mb-3 text-white mt-2"
              >
                Add Event
              </button>
            </form>
          </div>
        </Model>
      )}
      <div className=" flex gap-3   ">
        <div className="">
          <div className="mt-3    grid grid-cols-7 text-xs leading-10 text-gray-500 ">
            <div className="text-xl text-center">{t("homepage.S")}</div>
            <div className="text-xl text-center">{t("homepage.M")}</div>
            <div className="text-xl text-center">{t("homepage.T")}</div>
            <div className="text-xl text-center">{t("homepage.W")}</div>
            <div className="text-xl text-center">{t("homepage.Th")}</div>
            <div className="text-xl text-center">{t("homepage.F")}</div>
            <div className="text-xl text-center">{t("homepage.Sa")}</div>
          </div>
          <div className="isolate  mt-2 grid grid-cols-7 gap-px overflow-hidden rounded-md bg-gray-200 font-sans text-sm shadow ring-1 ring-gray-200 h-[78vh] w-[72.6vw] ">
            {monthData.map((day, dayIdx) => {
              const { bs_year, bs_month, bs_day } = day.AD_date;
              const dayInNepaliDate = new NepaliDate(
                `${bs_year}-${bs_month}-${bs_day}`
              );
              const isSelectedDay =
                selectedDay.format("YYYY/MM/DD") ===
                dayInNepaliDate.format("YYYY/MM/DD");
              const isToday = today.toString() === dayInNepaliDate.toString();
              return (
                <button
                  key={day.day}
                  type="button"
                  onClick={() => {
                    setSelectedDay(dayInNepaliDate);
                  }}
                  style={
                    dayIdx === 0 ? { gridColumnStart: day.week_day + 1 } : {}
                  }
                  className={classNames(
                    "p-1 font-mukta leading-3  focus:z-10",
                    (isSelectedDay || isToday) && "font-semibold",
                    isToday && "bg-blue-600   font-semibold text-indigo-600",
                    !isSelectedDay && "bg-white ",
                    isSelectedDay &&
                      " bg-blue-600  text-white  hover:bg-blue-700",
                    isSelectedDay && "bg-blue-600",
                    (day.events.find((event) => event.jds?.gh == "1") ||
                      day.week_day === 6) &&
                      "text-rose-600"
                  )}
                >
                  {!!userEvents?.events?.length &&
                    Array.from(
                      new Set(
                        getEventsOfSelectedDay(
                          userEvents,
                          new Date(day.AD_date.ad)
                        ).map((event) => {
                          return event?.colorId || false;
                        })
                      )
                    )?.map((color, i) => (
                      <span
                        key={i}
                        style={{
                          backgroundColor: color ? colors[color] : "#475569",
                        }}
                        className={classNames(
                          `mx-[1px] inline-block h-1 w-1 rounded-full`
                        )}
                      ></span>
                    ))}
                  <time
                    dateTime={day.AD_date.ad}
                    className={classNames(
                      "mx-auto mt-0 flex items-center justify-center rounded-full pt-0 text-3xl"
                    )}
                  >
                    {nepaliNumber(day.day)}
                  </time>
                  <span className="mx-auto my-0 mt-0 py-0 text-md font-extralight">
                    {dayInNepaliDate.getAD().date} 
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        {/* event  */}
        <div className=" ">
          {/* <div className="my-5">

     <div className="w-[40vh] ">
        <Link
          type="button"
          to={`/upcoming`}
          className=" w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 items-center text-center ">
          {t("homepage.View_all_events")} 
        </Link>
      </div>
       <div className="mx-2 mt-1 flex rounded-md border  bg-white p-4 shadow-lg ">
        <div className="flex-col">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50 font-semibold ">
            <h1>
              {isNepaliLanguage ? nepaliNumber(`${selectedDay.getBS().date}`) : selectedDay.getBS().date}
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-500 ">
            {selectedDay
              .toJsDate()
              .toLocaleDateString(isNepaliLanguage ? "ne-NP" : "en-US", { weekday: "long" })}
          </p>
        </div>

        <div className="ml-4 grow text-left">
          <h2 className="font-semibold">
            {new Intl.DateTimeFormat(isNepaliLanguage ? "ne-NP" : "en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).format(selectedDay.toJsDate())}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {isNepaliLanguage
              ? `${getTithiNepali(selectedDayData.AD_date.tithi)},
              ${getChandramaNepali(selectedDayData.AD_date.chandrama)} •
              ${selectedDayData?.events.map((event) => event?.jds?.ne).join(" | ")}`
              : `${getTithiEnglish(selectedDayData?.AD_date?.tithi)},
              ${getChandramaEnglish(selectedDayData?.AD_date?.chandrama)} •
              ${selectedDayData?.events.map((event) => event?.jds?.en).join(" | ")}`}
          </p>
        </div>
        <div className="ml-10 flex-col text-end">
          <h1 className="mt-2 text-sm text-gray-500 ">
            {relativeTimeFromDates(selectedDay.toJsDate(), isNepaliLanguage)}
          </h1>
        </div>
      </div> 
      </div> */}

          <div>
            <div className="w-[38vh] ">
              <button
                type="button"
                className=" w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none  items-center text-center "
              >
                {/* {t("homepage.View_all_events")}  */}
                {" Events"}
              </button>
            </div>
            {eventList.map((event) => {
              if (
                event.year === JSON.stringify(selectedDay.getBS().year) &&
                event.month === (JSON.stringify(selectedDay.getBS().month + 1))&&
                event.date === JSON.stringify(selectedDay.getDate())
              ) {
                return (
                  <div
                    className="mx-2 mt-1 flex gap-2 flex-col rounded-md border  bg-white p-4 shadow-lg "
                    key={event.id}
                  >
                    <div className="flex">

                    <div className="flex-col">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50 font-semibold ">
                        <h1>
                          {/* {isNepaliLanguage
                          ? nepaliNumber(`${selectedDay.getBS().date}`)
                          : selectedDay.getBS().date}  */}
                          {event.date}
                        </h1>
                      </div>
                      <p className="mt-2 text-sm text-gray-500 ">
                        {selectedDay
                          .toJsDate()
                          .toLocaleDateString(
                            isNepaliLanguage ? "ne-NP" : "en-US",
                            {
                              weekday: "long",
                            }
                          )}
                      </p>
                    </div>

                    <div className="ml-4 grow text-left">
                      <h2 className="font-semibold">
                        {new Intl.DateTimeFormat(
                          isNepaliLanguage ? "ne-NP" : "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        ).format(selectedDay.toJsDate())}
                      </h2>
                      <p className="mt-2 text-sm text-gray-500">
                        {/* {isNepaliLanguage
                        ? `${getTithiNepali(selectedDayData.AD_date.tithi)},
                ${getChandramaNepali(selectedDayData.AD_date.chandrama)} •
                ${selectedDayData?.events
                  .map((event) => event?.jds?.ne)
                  .join(" | ")}`
                        : `${getTithiEnglish(selectedDayData?.AD_date?.tithi)},
                ${getChandramaEnglish(selectedDayData?.AD_date?.chandrama)} •
                ${selectedDayData?.events
                  .map((event) => event?.jds?.en)
                  .join(" | ")}`}  */}
                        {event.event}
                      </p>
                    </div>
                    <div className="ml-10 flex-col text-end">
                      <h1 className="mt-2 text-sm text-gray-500 ">
                        {relativeTimeFromDates(
                          selectedDay.toJsDate(),
                          isNepaliLanguage
                        )}
                      </h1>
                    </div>
                    </div>
                    <div className="flex items-center  justify-around my-1">
                      <button className="bg-indigo-600 text-white px-6 py-2 rounded-md ">Edit </button>
                      <button className="bg-red-600 text-white px-6 py-2 rounded-md " onClick={()=>{
                        eventDeleteHandler(event.id)
                      }} >delete </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* add event button  */}

        <div className=" bg-black rounded-full bottom-5 right-10 p-2 cursor-pointer  absolute">
          <PlusIcon
            className=" h-10 w-10 text-white"
            onClick={() => {
              setModelOpen(true);
            }}
          />
        </div>
      </div>
    </>
  );
}
