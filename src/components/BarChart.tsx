import { BarChart, Card, Title ,Subtitle } from "@tremor/react";

  const chartdata = [
    {
      name: "Baisakh",
      "Number of Events": 5,
    },
    {
      name: "Jestha",
      "Number of Events": 6,
    },
    {
      name: "Ashad",
      "Number of Events": 2,
    },
    {
      name: "Shrawn",
      "Number of Events": 10,
    },
    {
      name: "Bhadra",
      "Number of Events": 1,
    },
    {
      name: "Ashoj ",
      "Number of Events": 3,
    },
    {
      name: "Kartik",
      "Number of Events": 11,
    },
    {
      name: "Mangshir",
      "Number of Events": 7,
    },
    {
      name: "Paush",
      "Number of Events": 15,
    },
    {
      name: "Magh",
      "Number of Events": 2,
    },
    {
      name: "Falgun",
      "Number of Events": 18,
    },
    {
      name: "Chaitra",
      "Number of Events": 8,
    },
  ];

const valueFormatter = (number:number) => ` ${new Intl.NumberFormat("us").format(number).toString()}`;

export default function BarChartComp (){
    return(
        <Card>
        <Title>Number of Events </Title>
        <Subtitle>
          Details about number of events per month
        </Subtitle>
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
    )

}

