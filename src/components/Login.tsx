import React, { FormEvent } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
// import { userData } from "../recoil/userAtom";
// import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

export interface formDataType {}

// interface ResponseType{
//   data: {},
//   message: string 
//   status : boolean
// }

export default function Login() {
  const [formData, setFormData] = React.useState({
    email:'superadmin@gmail.com',
    password:'Softech@123'
  });
  const navigate = useNavigate()



  // const [detail,setUserDetails] = useRecoilState(userData)
  const onSubmitHandler =(e:FormEvent)=>{
    e.preventDefault();

    const {  data  } = useQuery({
      queryKey: ['repoData'],
      queryFn: () =>
        fetch('http://calenderapi.meropalika.com/api/login',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        }).then(
          (res) => {
            if(res.status === 200){
                navigate('/dashboard')
            }
          }
          
        ),
    })
    console.log(data)


    // if(detail?.status === true){
    //   navigate('/dashboard')
    // }
  }

  

  return (
    <div className="min-h-screen flex w-full justify-between  item-center">
      <div className="hidden md:block">
        <img src="/login.svg" alt=""  className="px-6 py-10" />
      </div>
      <div className=" md:w-2/4 flex bg-zinc-200  flex-col py-20 gap-20">
        <div className="flex flex-col items-center gap-10 ">
          <CalendarDaysIcon className="h-24 w-24 text-blue-600 " />
          <h1 className="text-4xl  font-bold text-center text-blue-600 ">Calendar Management System</h1>
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
            className="bg-indigo-600 rounded-md py-2 w-full text-white my-3 "
          >
            
            Log in
          </button>
         
        </form>
      </div>
    </div>
  );
}
