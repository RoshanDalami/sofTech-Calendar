// import React from "react";

import { useEvent } from "../Context";

export default function Events() {
  const { eventList , removeEvent } = useEvent();
  return (
    <div className="  min-h-screen   ">
      <p className="text-5xl font-bold text-center my-3">Events</p>

      <div className="flex items-center flex-wrap justify-center gap-3 mx-3 my-4" >
        {eventList.map((event: any) => {
          return (
            <div
              className="mx-2 mt-1 flex flex-col gap-2 rounded-md border  bg-white p-4 shadow-lg "
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
                    {/* day  */}
                    {/* {selectedDay
                          .toJsDate()
                          .toLocaleDateString(
                            isNepaliLanguage ? "ne-NP" : "en-US",
                            {
                              weekday: "long",
                            }
                          )} */}
                    {event.day}
                  </p>
                </div>

                <div className="ml-4 grow text-left">
                  {/* international  */}
                  <h2 className="font-semibold">
                    {/* {new Intl.DateTimeFormat(
                          isNepaliLanguage ? "ne-NP" : "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        ).format(selectedDay.toJsDate())} */}
                    {event.internationalDate}
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
                {/* <div className="ml-10 flex-col text-end">
                      <h1 className="mt-2 text-sm text-gray-500 ">
                        {relativeTimeFromDates(
                          selectedDay.toJsDate(),
                          isNepaliLanguage
                        )}
                      </h1>
                    </div> */}
              </div>
              <div className="my-1 flex  items-center justify-around">
                <button className="rounded-md bg-indigo-600 px-6 py-2 text-white ">
                  Edit{" "}
                </button>
                <button className="rounded-md bg-red-600 px-6 py-2 text-white" onClick={()=>{removeEvent(event.id)}} >
                  delete{" "}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
