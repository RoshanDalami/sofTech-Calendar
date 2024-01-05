import { relativeTimeFromDates } from "../helper/dates";
import nepaliNumber from "../helper/nepaliNumber";
// import AddEventModal from "./AddEventModal";
import { Transition } from "@headlessui/react";
import useLanguage from "../helper/useLanguage";
import { DayData } from "../types/calendar.types";
import { useEffect, useMemo, useState } from "react";
import NepaliDate from "nepali-date-converter";
import { classNames } from "../helper/utils";
import { url } from "../service/apiHelper";
import Model from "./Model";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { nanoid } from "nanoid";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { userAtom } from "../recoil/userAtom";
import { useRecoilValue } from "recoil";
import { Event } from "../types";
import toast from "react-hot-toast";

const isSameMonth = (date1: NepaliDate, date2: NepaliDate) => {
  return (
    date1.getBS().year === date2.getBS().year &&
    date1.getBS().month === date2.getBS().month
  );
};

// console.log(new NepaliDate(), "nepali Date");

export default function MonthCalendar({ monthData }: { monthData: DayData[] }) {
  const [modelOpen, setModelOpen] = useState(false);
  const [EventList, setEventList] = useState<Event[]>([]);
  const [isSubmitting,setIsSubmitting] = useState(false)
  const user = useRecoilValue(userAtom)
  const { register, handleSubmit } = useForm();


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

  const onSubmitHandler = async (data: FieldValues) => {
    const selectedDateNepali = selectedDay.format("YYYY-M-D");

    const selectedDateEnglish = selectedDay
      .toJsDate()
      .toLocaleDateString("fr-CA");
    const bodyData = {
      eventId: nanoid(),
      eventTitle: data.eventTitle,
      eventDescription: data.eventDescription,
      eventStartTime: data.eventStartTime,
      eventEndTime: data.eventEndTime,
      eventDateNepali: selectedDateNepali,
      eventDateEnglish: selectedDateEnglish,
      userDetails: user.data._id,
    };
    try {
      setIsSubmitting(true)
      const response = await axios.post(`${url.postEvent}`, bodyData);
      if (!response.status) {
        console.log("error");
      }
      toast.success('Event Created Successfully')
      setIsSubmitting(false)
      setModelOpen(false);

    } catch (error) {
      toast.error('Event Creation Failed')
    }finally{
      setIsSubmitting(false)
    }
  };
  const getEvents = async () => {
    
    try {
      const response = await axios.get(url.getAllEvents);
      setEventList(response.data);
      // toast.success('Event Fetching Success')
    } catch (error) {
      toast.error('Event Fetching failed')
    }
  };
  useEffect(() => {
    getEvents();
  }, [EventList]);

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
      <Transition
        show={modelOpen}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="fixed inset-0 z-40 w-full md:absolute md:min-h-screen  "
      >
        <Model>
          <div className="relative rounded-md bg-white p-3">
            <XCircleIcon
              className="absolute right-5 h-10 w-10 cursor-pointer text-black"
              onClick={() => {
                setModelOpen(false);
              }}
            />
            <form
              action=""
              className="mx-5 mt-12 flex flex-col gap-4"
              onSubmit={handleSubmit((data) => onSubmitHandler(data))}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="event" className="text-2xl font-bold">
                  Event
                </label>
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-500 px-4 py-2"
                  placeholder="Events"
                  {...register("eventTitle")}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-2xl font-bold">
                  Description
                </label>
                <input
                  type="text"
                  className="rounded-md border-[1px] border-gray-500 px-4 py-2"
                  placeholder="Event Description"
                  {...register("eventDescription")}
                  required
                />
              </div>
              <div className="flex items-center gap-4   ">
                <div className="flex w-2/4 flex-col gap-2">
                  <label htmlFor="description" className="text-2xl font-bold">
                    Event Start Time
                  </label>
                  <input
                    type="time"
                    className="w-full rounded-md border-[1px] border-gray-500 px-4 py-2"
                    placeholder=" Event Time "
                    {...register("eventStartTime")}
                    required
                  />
                </div>
                <div className="flex w-2/4 flex-col gap-2">
                  <label htmlFor="description" className="text-2xl font-bold">
                    Event End Time
                  </label>
                  <input
                    type="time"
                    className="rounded-md border-[1px]  border-gray-500 px-4 py-2"
                    placeholder=" Event Time "
                    {...register("eventEndTime")}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mb-3 mt-2 rounded-md bg-blue-600 py-2 text-white"
              >
                {isSubmitting ? 'Submitting':'Add Event'}
              </button>
            </form>
          </div>
        </Model>
      </Transition>
      <div className=" flex w-[90vw] flex-col gap-3 md:w-[60.6vw] md:flex-row ">
        <div className=" ">
          <div className="mt-3  grid  grid-cols-7 text-xs leading-10 text-gray-900 dark:text-white ">
            <div className="text-center text-xl">{t("homepage.S")}</div>
            <div className="text-center text-xl">{t("homepage.M")}</div>
            <div className="text-center text-xl">{t("homepage.T")}</div>
            <div className="text-center text-xl">{t("homepage.W")}</div>
            <div className="text-center text-xl">{t("homepage.Th")}</div>
            <div className="text-center text-xl">{t("homepage.F")}</div>
            <div className="text-center text-xl text-red-600">
              {t("homepage.Sa")}
            </div>
          </div>
          <div className="isolate  mt-2 grid h-[50vh] w-[90vw] grid-cols-7 gap-px overflow-hidden rounded-md bg-gray-200 font-sans text-sm shadow ring-1 ring-gray-200  md:h-[78vh] md:w-[60.6vw] ">
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
                    "font-mukta  group relative rounded-md  p-1 leading-3 focus:z-10 ",
                    (isSelectedDay || isToday) && "font-semibold",
                    isToday && "bg-blue-600   font-semibold text-indigo-600",

                    !isSelectedDay && "bg-white",
                    isSelectedDay &&
                      " bg-blue-600  text-white  hover:bg-blue-700",
                    isSelectedDay && "bg-blue-600",
                    (day.events.find((event) => event.jds?.gh == "1") ||
                      day.week_day === 6) &&
                      !isSelectedDay &&
                      " text-rose-600  "
                  )}
                >
                  {EventList.map((event) => {
                    if (
                     ( event.eventDateNepali ===
                      `${bs_year}-${bs_month}-${bs_day}`) && event.userDetails === user.data._id
                    ) {
                      return (
                        <div key={event.eventId} className="">
                          <div className="  absolute right-3 top-3  h-2 w-2 rounded-full bg-red-600  "></div>
                          <div className="text-md my-1 hidden h-[2vh] rounded-lg bg-gray-300/40  px-2 py-1 group-hover:text-red-600 sm:block    ">
                            <p>{event.eventTitle.slice(0, 10)}</p>
                          </div>
                        </div>
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
                  <span className="md:text-md absolute bottom-1 right-1 mx-auto text-xs font-extralight md:bottom-2 md:right-2">
                    {dayInNepaliDate.getAD().date}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        {/* event  */}
        <div className=" ">
          <div className="absolute z-20 flex flex-col items-center md:top-[20px]">
            <div className="w-[32vh] ">
              <button
                type="button"
                className=" w-full items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white shadow  hover:bg-blue-700 focus:outline-none "
              >
                {/* {t("homepage.View_all_events")}  */}
                {" Events of " + selectedDay.getDate()}
              </button>

              {/* events card  */}
            </div>
            {EventList.map((event: any) => {
              if (
                event.eventDateNepali === selectedDay.format("YYYY-M-D") && event.userDetails === user.data._id
                // event.year === JSON.stringify(selectedDay.getBS().year) &&
                // event.month === JSON.stringify(selectedDay.getBS().month + 1) &&
                // event.date === JSON.stringify(selectedDay.getDate())
              ) {
                return (
                  <div
                    className="mx-2 mt-1 flex flex-col gap-2 rounded-md border  bg-white p-4 shadow-lg "
                    key={event.eventId}
                  >
                    <div className="flex">
                      <div className="flex-col">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50 font-semibold ">
                          <h1 className="text-xl">
                            {event.eventDateNepali.split("-")[2]}
                          </h1>
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
                          {event.eventTitle.slice(0, 10)}
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
                          {convertTo12HourFormat(event.eventStartTime)}
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

        <div className=" fixed bottom-20 right-5 z-50 cursor-pointer rounded-full bg-black p-2 md:absolute md:bottom-5   md:right-10">
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
