// import React from 'react'
import { Card, Text, Metric } from "@tremor/react";
import CountUp from 'react-countup'

const cardDetails = [
  {
    title: "Total Events",
    metric: "30",
  },
  {
    title: "Events This Month",
    metric: "10",
  },
  {
    title: "Events Next Month",
    metric: "4",
  },
];

export default function EventCard() {
  return (
    <div className="mx-4 flex flex-col items-center gap-5 md:flex-row">
      {cardDetails?.map((card) => {
        return (
          <Card key={card.title}>
            <Text>{card.title}</Text>
            <Metric>
                <CountUp 
                end={+card.metric}
                start={0}
                // duration={}
                />
                {/* {card.metric} */}
                </Metric>
          </Card>
        );
      })}
    </div>
  );
}
