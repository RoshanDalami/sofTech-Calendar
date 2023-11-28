import React from "react";
 export interface EventType {
    event: string
    description: string
    year:string | undefined
    month:string | undefined
    date:string | undefined
    id:string
    
}

 export interface EventContextProps {
   eventList: EventType[];
   addEvent: (event: EventType) => void;
   removeEvent: (id: string) => void;
 }
 

 export const EventContext = React.createContext<EventContextProps>({
    eventList :[],
    addEvent:(_event:EventType)=>{},
    removeEvent:(_id:string)=>{},
 })

 export const useEvent = () =>{
    return React.useContext(EventContext)
 }

 export const EventProvider = EventContext.Provider
