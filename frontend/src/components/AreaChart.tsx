import { AreaChart, Card, Title } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,

  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,

  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,

  },
  {
    date: "Apr 22",
    SemiAnalysis: 340,

  },
  {
    date: "May 22",
    SemiAnalysis: 3475,

  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,

  },
];

const valueFormatter = function(number:number) {
  return   new Intl.NumberFormat("us").format(number).toString();
};


export default function AreaChartComp (){
    return(
        <Card>
        <Title>Task Progress Map</Title>
        <AreaChart
          className="h-44 mt-3"
          data={chartdata}
          index="date"
          categories={["SemiAnalysis"]}
          colors={["indigo"]}
          valueFormatter={valueFormatter}
        />
      </Card>
    )
}



