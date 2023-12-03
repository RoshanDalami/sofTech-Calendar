

import Home from "./pages/Home.tsx";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";


import Landing from "./pages/Landing.tsx";
import Events from "./pages/Events.tsx";


const Body = () => {

  return (
    <div className={" flex min-h-screen flex-col font-mono"}>
      <div className=" sticky top-0 z-10" >

      <Navbar />
      </div>
      
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/calendar/:BSYear?/:BSMonth?" element={<Home />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Body;
