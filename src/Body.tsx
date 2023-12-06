

import Home from "./pages/Home.tsx";
import { useLocation } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar.tsx";
import Landing from "./pages/Landing.tsx";
import Events from "./pages/Events.tsx";
import Tasks from "./pages/Tasks.tsx";
import IndividualTask from "./pages/IndividualTask.tsx";
import SideBar from "./components/SideBar.tsx";
import Dashboard from "./components/Dashboard.tsx";
import Login from "./components/Login.tsx";


const Body = () => {
const location = useLocation();
  return (
    <div className={" flex min-h-screen flex-col font-mono dark:bg-gray-800 "}>
      <div className=" sticky top-0 z-10" >
     {
      location.pathname === '/' || location.pathname === '/login' ? '' :   <SideBar/>
     }

    
      {/* <Navbar /> */}
      </div>
      
      <div className={`flex-grow  ${location.pathname === '/'||location.pathname==='/login' ? '':'ml-60'}  `}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/calendar/:BSYear?/:BSMonth?" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/tasks" element={ <Tasks/> } />
          <Route path="/tasks/:taskID" element={ <IndividualTask/> } />
          <Route path="/dashboard" element={ <Dashboard/> } />
          <Route path="/login" element={ <Login/> } />
        </Routes>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Body;
