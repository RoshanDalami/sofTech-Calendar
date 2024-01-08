import { BarChart, Card, Title, Subtitle } from "@tremor/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../service/apiHelper";
import { Event } from "../types";
export default function BarChartComp() {
  const [events, setEvents] = useState<Event[]>([]);
  const getAllEvents = async () => {
    try {
      const respones = await axios.get(`${url.getAllEvents}`);
      setEvents(respones.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllEvents();
  }, []);

  const Baisakh = events?.filter(
    (item) => item.eventDateNepali.split("-")[1] === "1"
  ).length;
  const Jestha = events?.filter(
    (item) => item.eventDateNepali.split("-")[1] === "2"
  ).length;
  const Ashad = events?.filter(
    (item) => item.eventDateNepali.split("-")[1] === "3"
  ).length;
  const Shrawn = events?.filter(
    (item) => item.eventDateNepali.split("-")[1] === "4"
  ).length;
  const Bhadra = events?.filter(
    (item) => item.eventDateNepali.split("-")[1] === "5"
  ).length;
  const Ashoj = events?.filter(
    (item) => item.eventDateNepali.split("-")[1] === "6"
  ).length;
  const Kartik = events?.filter(
    (item) => item.eventDateNepali.split("-")[1] === "7"
  ).length;
  const Mangshir = events?.filter(
    (item) => item.eventDateNepali.split("-")[1] === "8"
  ).length;
  const Paush = events?.filter(
    (item) => item.eventDateNepali.split("-")[1] === "9"
  ).length;
  const Magh = events?.filter(
    (item) => item.eventDateNepali.split("-")[1] === "10"
  ).length;
  const Falgun = events?.filter(
    (item) => item.eventDateNepali.split("-")[1] === "11"
  ).length;
  const Chaitra = events?.filter(
    (item) => item.eventDateNepali.split("-")[1] === "12"
  ).length;

  const chartdata = [
    {
      name: "Baisakh",
      "Number of Events": Baisakh,
    },
    {
      name: "Jestha",
      "Number of Events": Jestha,
    },
    {
      name: "Ashad",
      "Number of Events": Ashad,
    },
    {
      name: "Shrawn",
      "Number of Events": Shrawn,
    },
    {
      name: "Bhadra",
      "Number of Events": Bhadra,
    },
    {
      name: "Ashoj ",
      "Number of Events": Ashoj,
    },
    {
      name: "Kartik",
      "Number of Events": Kartik,
    },
    {
      name: "Mangshir",
      "Number of Events": Mangshir,
    },
    {
      name: "Paush",
      "Number of Events": Paush,
    },
    {
      name: "Magh",
      "Number of Events": Magh,
    },
    {
      name: "Falgun",
      "Number of Events": Falgun,
    },
    {
      name: "Chaitra",
      "Number of Events": Chaitra,
    },
  ];

  const valueFormatter = (number: number) =>
    ` ${new Intl.NumberFormat("us").format(number).toString()}`;
  return (
    <Card>
      <Title>Number of Events </Title>
      <Subtitle>Details about number of events per month</Subtitle>
      <BarChart
        className="mt-6"
        data={chartdata}
        index="name"
        categories={["Number of Events"]}
        colors={["indigo"]}
        valueFormatter={valueFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
}
