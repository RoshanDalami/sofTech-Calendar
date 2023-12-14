import "./i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { EventProvider } from "./Context";
import { TaskProvider } from "./Context";
import { BrowserRouter } from "react-router-dom";
import Body from "./Body";
import { EventType } from "./Context/eventContext";
import { TaskType } from "./Context/taskContext";
import { RecoilRoot } from "recoil";
import { UserProvider } from "./Context";




const queryClient = new QueryClient();
const App = () => {
  const [eventList, setEventList] = useState<EventType[]>([]);
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  console.log(taskList,"helo task");
  
  const [user,setUser] = useState<any>({});
  console.log(user,"helo user");

  const addUser = (user:any)=>{
    setUser(user)
  }
  console.log(addUser,"addUser");
  
  const removeUser=()=>{
    setUser({})
  }


  const addEvent = (event: EventType) => {
    setEventList((preState) => [...preState, { ...event }]);
  };
  const removeEvent = (id: string) => {
    const updatedEvents = eventList.filter((item) => item.id !== id);
    setEventList(updatedEvents);
    return updatedEvents;
  };
  const addTask = (task: TaskType) => {
    setTaskList((prevState) => [...prevState, { ...task }]);
  };



  useEffect(() => {
    const events = JSON.parse(localStorage.getItem("Events")!);
    if (events && events.length) {
      setEventList(events);
    }
  }, []);
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("Tasks")!);
    if (tasks && tasks.length) {
      setTaskList(tasks);
    }
  }, []);
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("User")!);
    if (users && users.length) {
      setUser(users);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Events", JSON.stringify(eventList));
  }, [eventList]);
  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(taskList));
  }, [taskList]);
  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(user));
  }, [user]);



  return (
    <UserProvider value={{user,addUser,removeUser}}>

  <BrowserRouter>


    <RecoilRoot>

      <QueryClientProvider client={queryClient}>



        <EventProvider value={{ eventList, addEvent, removeEvent }}>
          <TaskProvider value={{ taskList, addTask }}>
            <Body />
          </TaskProvider>

          <Toaster position="bottom-center" />
        </EventProvider>




      </QueryClientProvider>
    </RecoilRoot>
    </BrowserRouter>
</UserProvider>
  );
};

export default App;
