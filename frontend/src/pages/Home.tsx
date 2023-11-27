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
    const fixedPageType = pageType === "upcoming" ? "upcoming" : "calendar";
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

  //for date
  const isSameMonth = (date1: NepaliDate, date2: NepaliDate) => {
    return (
      date1.getBS().year === date2.getBS().year &&
      date1.getBS().month === date2.getBS().month
    );
  };
  const today = useMemo(() => new NepaliDate(), []);
  // // replace all dots with slash

  const firstDay = useMemo(() => {
    const firstDayData = monthData[0];
    if (firstDayData && firstDayData.AD_date) {
      const { bs_year, bs_month, bs_day } = firstDayData.AD_date;
      return new NepaliDate(`${bs_year}-${bs_month}-${bs_day}`);
    }
    // Handle the case where AD_date is not present.
    return new NepaliDate();
  }, []);
  
  const [selectedDay, setSelectedDay] = useState<NepaliDate>(
    isSameMonth(today, firstDay) ? today : firstDay
  );
  const selectedDayData = useMemo(() => {
    const selectedDayIndex = selectedDay.getBS().date - 1;
    return monthData[selectedDayIndex];
  }, [selectedDay]);
  // console.log('selected Date',  selectedDay)
  // console.log(  selectedDay.getDate())
  useEffect(() => {
    setSelectedDay(isSameMonth(today, firstDay) ? today : firstDay);
  }, []);




  return (
    <>
   
      <div className=" mt-1  grid grid-cols-4    ">
        <div className=" col-span-3  ">
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
