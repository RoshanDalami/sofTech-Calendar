import React, { FormEvent } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export interface formDataType {}

export default function Login() {
  const [formData, setFormData] = React.useState({
    email:'superadmin@gmail.com',
    password:'Softech@123'
  });
  const onSubmitHandler = (e:FormEvent)=>{
    e.preventDefault();
    console.log('submited')
    console.log(formData)
  } 
  return (
    <div className="min-h-screen flex w-full justify-between  item-center">
      <div className="hidden md:block">
        <img src="/login.svg" alt=""  className="px-6 py-10" />
      </div>
      <div className=" md:w-2/4 flex bg-zinc-200  flex-col py-20 gap-20">
        <div className="flex flex-col items-center gap-10 ">
          <CalendarDaysIcon className="h-10 w-10" />
          <h1 className="text-4xl  font-bold text-center ">Calendar Management System</h1>
        </div>

        <form action="" onSubmit={onSubmitHandler}  className="flex flex-col gap-5 px-4 md:px-24 py-4 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="py-2 px-4 rounded-md"
              onChange={(e)=>setFormData({...formData,email:e.target.value})}
              value={formData.email}
              placeholder="example@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="py-2 px-4 rounded-md"
              onChange={(e)=>setFormData({...formData,password:e.target.value})}
              value={formData.password}
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 rounded-md py-2 text-white my-3 "
          >
          <Link to={'/dashboard'} >
            
            Log in
          </Link>
          </button>
        </form>
      </div>
    </div>
  );
}
