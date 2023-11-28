import "./i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { EventProvider,  } from "./Context";
import { BrowserRouter } from "react-router-dom";
import Body from "./Body";
import { EventType } from "./Context/eventContext";
const queryClient = new QueryClient();
const App = () => {
  const [eventList,setEventList] = useState<EventType[]>([]);

  const addEvent = (event:EventType)=>{
    setEventList((preState)=> [...preState,{...event}] )
  }
  const removeEvent=(id:string)=>{
    const updatedEvents = eventList.filter((item)=> item.id !== id);
    setEventList(updatedEvents)
    return updatedEvents
  }

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <EventProvider value={{ eventList, addEvent , removeEvent }}>
          <Body />
          <Toaster position="bottom-center" />
        </EventProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
