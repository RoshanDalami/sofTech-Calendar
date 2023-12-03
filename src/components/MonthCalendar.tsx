import { relativeTimeFromDates } from "../helper/dates";
import nepaliNumber from "../helper/nepaliNumber";
// import AddEventModal from "./AddEventModal";

import useLanguage from "../helper/useLanguage";
import { DayData } from "../types/calendar.types";
import { useEffect, useMemo, useState } from "react";
import NepaliDate from "nepali-date-converter";
import { classNames } from "../helper/utils";
import { useParams } from "react-router-dom";
import Model from "./Model";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { nanoid } from "nanoid";

import { useEvent } from "../Context";

const isSameMonth = (date1: NepaliDate, date2: NepaliDate) => {
  return (
    date1.getBS().year === date2.getBS().year &&
    date1.getBS().month === date2.getBS().month
  );
};

console.log(new NepaliDate());

export default function MonthCalendar({ monthData }: { monthData: DayData[] }) {
  const { BSYear, BSMonth } = useParams();

  console.log(BSYear, BSMonth, "test");

  const [modelOpen, setModelOpen] = useState(false);

  if (BSMonth === undefined || BSYear === undefined) {
    window.location.reload();
  }

  // const [eventList, setEventList] = useState<
  //   {
  //     event: string;
  //     description: string;
  //     year: string | undefined;
  //     month: string | undefined;
  //     date: string | undefined;
  //     id:string;
  //   }[]
  // >([]);

  const { addEvent, eventList } = useEvent();

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
  useEffect(() => {
    setSelectedDay(isSameMonth(today, firstDay) ? today : firstDay);
  }, [monthData]);

  const [formData, setFormData] = useState({
    event: "",
    description: "",
    time: "",
    year: "",
    month: "",

    date: selectedDay.getDate(),
  });
  // console.log(formData,"hello")

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    try {
      const formattedDate = selectedDay.format("DD");
      // const formattedMonth = selectedDay.format("MM");
      // const formattedYear = selectedDay.format("YYY");

      // Update eventList using setEventList
      // setEventList((prevEventList) => [
      //   ...prevEventList,
      //   {
      //     ...formData,
      //     date: formattedDate,
      //     id:nanoid()
      //   },
      // ]);
      // ,month:formattedMonth, year:formattedYear
      addEvent({ ...formData, date: formattedDate, id: nanoid() });
      console.log(formData, "data");
      setModelOpen(false);
      setFormData({
        event: "",
        description: "",
        time: "",
        year: "",
        month: "",
        date: 0,
      });
    } catch (error) {
      console.log(error);
    }
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
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-2xl font-bold">
                  Time of Event
                </label>
                <input
                  type="time"
                  className="py-2 border-[1px] border-gray-500 rounded-md px-4"
                  placeholder=" Event Time "
                  onChange={(e) => {
                    setFormData({ ...formData, time: e.target.value });
                  }}
                  value={formData.time}
                  required
                />
              </div>
              <div className="flex items-center gap-2 ">
                <div>
                  <label htmlFor="">Year</label>
                  <input
                    type="number"
                    className="py-2 border-[1px] border-gray-500 rounded-md px-4"
                    placeholder={JSON.stringify(selectedDay.getYear())}
                    onChange={(e) => {
                      setFormData({ ...formData, year: e.target.value });
                    }}
                    value={formData.year}
                    // value={BSYear}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="">Month</label>
                  <input
                    type="number"
                    className="py-2 border-[1px] border-gray-500 rounded-md px-4"
                    placeholder={JSON.stringify(selectedDay.getMonth() + 1)}
                    onChange={(e) => {
                      setFormData({ ...formData, month: e.target.value });
                    }}
                    value={formData.month}
                    // value={BSMonth}
                    required
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
                    "p-1 font-mukta leading-3  focus:z-10 relative rounded-md ",
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
                  {eventList.map((event) => {
                    if (
                      event.year === JSON.stringify(bs_year) &&
                      event.month === JSON.stringify(bs_month) &&
                      event.date === JSON.stringify(bs_day)
                    ) {
                      return (
                        <>
                          <div
                            key={event.id}
                            className=" bg-red-600 h-2 w-2 rounded-full absolute top-3 right-3  "
                          ></div>
                          {/* <h1 className="bg-gray-300/40 px-2 py-1 rounded-lg absolute top-2 right-6 text-[8px] hidden sm:block ">
                            {event.event}
                          </h1> */}
                        </>
                      );
                    }
                  })}

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
          <div className="absolute top-[90px] z-50">
            <div className="w-[38vh] ">
              <button
                type="button"
                className=" w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none  items-center text-center "
              >
                {/* {t("homepage.View_all_events")}  */}
                {" Events of " + selectedDay.getDate()}
              </button>

              {/* events card  */}
            </div>
            {eventList.map((event: any) => {
              if (
                event.year === JSON.stringify(selectedDay.getBS().year) &&
                event.month === JSON.stringify(selectedDay.getBS().month + 1) &&
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
                          <h1>{event.date}</h1>
                        </div>
                        <p className="mt-2 text-sm text-gray-500 ">
                          {/* day  */}
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
                        <p className="mt-2 text-sm font-semibold ">
                          {event.event}
                        </p>
                      </div>
                      <div className="ml-5 flex-col text-end">
                        <h1 className="mt-2 text-sm text-gray-500 ">
                          {relativeTimeFromDates(
                            selectedDay.toJsDate(),
                            isNepaliLanguage
                          )}
                        </h1>
                        <h1 className="mt-2 text-sm text-gray-500 ">
                          {convertTo12HourFormat(event.time)}
                        </h1>
                      </div>
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
