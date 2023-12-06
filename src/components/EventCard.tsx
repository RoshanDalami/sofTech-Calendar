// import React from 'react'
import { Card , Text ,Metric } from "@tremor/react";

const cardDetails = [
    {
        title:'Total Events',
        metric:'30'
    },
    {
        title:'Events This Month',
        metric:'10'
    },
    {
        title:'Events Next Month',
        metric:'4'
    },
]

export default function EventCard() {
  return (
    <div className="flex items-center gap-5 mx-4 md:flex-row flex-col" >
        {
            cardDetails?.map((card)=>{
                return(

        <Card key={card.title} >
            

            <Text>{card.title}</Text>
            <Metric>
                {card.metric}
            </Metric>
        </Card>
                )
            })
        }
        
      
    </div>
  )
}
