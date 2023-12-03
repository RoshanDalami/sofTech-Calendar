import { useEffect, useMemo, useState } from "react";
import MonthCalendar from "../components/MonthCalendar";
import { fetchYearlyData } from "../helper/api";

import YearMonthPicker from "../components/YearMonthPicker";
import { useParams } from "react-router-dom";
import NepaliDate from "nepali-date-converter";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { CalendarData, Months } from "../types/calendar.types";





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


    // previous code for without reloading 
  useEffect(() => {

    // set params in url withour reloading
    history.pushState(
      null,
      "",
      `/calendar/${currentNepaliDate.getYear()}/${currentNepaliDate.getMonth() + 1
      }`
    );    
  }, [currentNepaliDate, pageType]);

  //new code for reload problem
 
  
  
  



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
  

  return (
    <>
   
      <div className=" grid grid-cols-4 px-5 mt-5  ">
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
