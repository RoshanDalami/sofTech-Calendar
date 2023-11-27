import { useEffect, useMemo, useState } from "react";
import MonthCalendar from "../components/MonthCalendar";
import { fetchYearlyData } from "../helper/api";
// import { fetchUserEvents, fetchYearlyData } from "../helper/api";
import YearMonthPicker from "../components/YearMonthPicker";
import { useParams } from "react-router-dom";
import NepaliDate from "nepali-date-converter";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { CalendarData, Months } from "../types/calendar.types";
// import { CalendarEventsResult } from "../types/events.types";
// import UpcomingEvents from "./UpcomingEvents";



export const eventList: { event: string; description: string; year: string|number | undefined; month:string|number|undefined;  date: string|number | undefined; }[] = []

function Home() {
  const { BSYear, BSMonth, pageType = "calendar" } = useParams();
 
  const validYearAndMonth = useMemo(() => {
    if (!BSYear || !BSMonth) return new NepaliDate();
    const year = parseInt(BSYear);
    const month = parseInt(BSMonth);
    const isValid = year >= 2075 && year <= 2082 && month >= 1 && month <= 12;
    if (isValid) return new NepaliDate(year, month - 1, 1);
    return new NepaliDate();
  }, [BSYear, BSMonth]);

  ///
  const [currentNepaliDate, setCurrentNepaliDate] =
    useState<NepaliDate>(validYearAndMonth);

  useEffect(() => {
    const fixedPageType =  "calendar";
    // set params in url withour reloading
    history.replaceState(
      null,
      "",
      `/${fixedPageType}/${currentNepaliDate.getYear()}/${currentNepaliDate.getMonth() + 1
      }`
    );
  }, [currentNepaliDate, pageType]);
  const { data: calendarData, isLoading } = useQuery<CalendarData>({
    queryKey: ["calendar", currentNepaliDate.getYear()],
    queryFn: () => fetchYearlyData(currentNepaliDate.getYear()),
    networkMode: "offlineFirst",
  });

  const currentMonthInHumanForm = (currentNepaliDate.getBS().month + 1)
    .toString()
    .padStart(2, "0") as Months;

  const monthData = useMemo(() => {
    if (!calendarData) return [];
    return calendarData[currentMonthInHumanForm];
  }, [calendarData, currentMonthInHumanForm]);
  
  ///
  // const { data: userEvents } = useQuery<CalendarEventsResult>({
  //   queryKey: ["events", currentNepaliDate.getYear(), currentNepaliDate.getMonth()],
  //   queryFn: () => fetchUserEvents(monthData[0].AD_date.ad, monthData[monthData.length - 1].AD_date.ad),
  //   enabled: !!calendarData && !!monthData.length,
  //   networkMode: "offlineFirst",
  // });

  return (
    <>
   
      <div className=" grid grid-cols-4 px-5   ">
        <div className=" col-span-3  bg-gray-300 rounded-md   ">
          <YearMonthPicker
            currentNepaliDate={currentNepaliDate}
            setCurrentNepaliDate={setCurrentNepaliDate}
          />
          {isLoading ? (
            <Spinner className="h-5 w-5 " />
          ) : (
            <MonthCalendar monthData={monthData} />
          )}
        </div>
      </div>
     
    </>
  );
}

export default Home;
