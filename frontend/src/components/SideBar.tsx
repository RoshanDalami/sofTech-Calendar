import { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import LinkLists from "./LinkLists";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../recoil/userAtom";
import { Transition } from "@headlessui/react";
import toast from "react-hot-toast";


export default function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const mobileBreakpoint = 768; // Adjust the breakpoint as needed
const [logoutClicked,setLogoutClicked] = useState(false)
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= mobileBreakpoint);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({
      message: "",
      status: 0,
      data: {
        _id: "",
        username: "",
        email: "",
        role: "",
        createdAt: "",
        updatedAt: "",
        __v: 0,
      },
      token: "",
    });
    navigate("/");
    toast.success("Logout Sucessfull")
  };

  const renderSidebarContent = () => (
    <>
    
      <div className="mt-10 px-5 py-2 text-xl font-bold transition duration-200 hover:rounded-lg dark:text-white ">
        Softech
      </div>
      <div className="w-52 border border-gray-300"></div>
      <ProfileCard />
      <div className="w-52 border border-gray-300"></div>
      <LinkLists />
      <div className="absolute bottom-5">
        <button
          className="flex w-full items-center gap-3 rounded-md bg-red-600 px-4 py-1.5 text-lg text-white"
          onClick={()=>setLogoutClicked(true)}
        >
          Log Out
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
        </button>
      </div>
    </>
  );

  return (
    <>
    {
      <Transition
      show={logoutClicked}
      enter="transition ease-in-out duration-400 transform"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in-out duration-400 transform"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed inset-0 z-40 w-full  md:min-h-screen  "
    >

      <div className="bg-black/40 absolute z-50 w-[100vw] min-h-screen flex items-center justify-center" >
        <div className="bg-white  rounded-lg shadow-lg px-5 py-4 flex flex-col gap-8 justify-center items-center">

        <p className="text-xl font-bold ">Are you sure you want to logout ?</p>
        <div className="flex  gap-6">

        <button className="bg-red-600 hover:bg-red-700 font-bold text-white rounded-md shadow-md px-5 py-2" onClick={()=>handleLogout()} >
          Log Out
        </button>
        <button className="bg-gray-600/60 hover:bg-gray-600 text-white font-bold rounded-md shadow-md px-5 py-2" onClick={()=>setLogoutClicked(false)} >Cancel</button>
        </div>
        </div>
      </div>
    </Transition>

    }
    <div className="relative">
      {/* Render the Bars icon and mobile-specific styles only on screens smaller than the breakpoint */}
      {window.innerWidth < mobileBreakpoint && (
        <Bars3Icon
          className="fixed  left-5 top-5 z-10 h-6 w-6 cursor-pointer text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}

      {/* Render the sidebar content based on the state */}
      <div
        className={`fixed flex h-[100vh] w-60 flex-col items-center overflow-hidden bg-slate-200 transition-transform dark:bg-gray-900 md:rounded-r-3xl ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {renderSidebarContent()}
      </div>
    </div>
    </>
  );
}
