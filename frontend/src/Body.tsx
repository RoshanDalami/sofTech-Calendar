import Home from "./pages/Home.tsx";
import { useLocation, useNavigate } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar.tsx";
import Landing from "./pages/Landing.tsx";
import Events from "./pages/Events.tsx";
import Tasks from "./pages/Tasks.tsx";
import IndividualTask from "./pages/IndividualTask.tsx";
import SideBar from "./components/SideBar.tsx";
import Dashboard from "./components/Dashboard.tsx";
import Login from "./components/Login.tsx";
import Reports from "./pages/Reports.tsx";
import { userAtom } from "./recoil/userAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import Register from "./components/Register.tsx";
import Users from "./pages/Users.tsx";


const Body = () => {
  const location = useLocation();
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    setUser(user);
  }, []);

  if (
    (user?.token && location.pathname === "/login") ||
    (user?.token && location.pathname === "/") ||
    (user?.token && location.pathname === "/register")
  ) {
    navigate("/dashboard");
  }

  if (
    (!user?.token && location.pathname === "/dashboard") ||
    (!user?.token && location.pathname === "/events") ||
    (!user?.token && location.pathname === "/tasks") ||
    (!user?.token && location.pathname === "/report")
  ) {
    navigate("/");
  }

  return (
    <div className={" flex min-h-screen flex-col font-mono dark:bg-gray-800 "}>
      <div className=" sticky top-0 z-10">
        {/* <ProgressBar value={100} showAnimation={true} /> */}

        {location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/register" ? (
          ""
        ) : (
          <SideBar />
        )}

        {/* <Navbar /> */}
      </div>

      <div
        className={`flex-grow  ${
          location.pathname === "/" ||
          location.pathname === "/login" ||
          location.pathname === "/register"
            ? ""
            : "mt-7 md:ml-60 md:mt-0"
        }  `}
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/calendar/:BSYear?/:BSMonth?" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:taskID" element={<IndividualTask />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Body;
