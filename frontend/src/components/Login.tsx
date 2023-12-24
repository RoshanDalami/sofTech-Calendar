
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
// import { useQuery } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
// import { useUser } from '../Context'
import Cookie from 'js-cookie'

export default function Login() {

  const navigate = useNavigate()
  // const {addUser } = useUser();

  const { register, handleSubmit } = useForm();
  const [loading,setLoading] = useState(false);

  
  // const onSubmitHandler =(data:any)=>{

    // const {  data  } = useQuery({
    //   queryKey: ['repoData'],
    //   queryFn: () =>
    //     fetch('http://calenderapi.meropalika.com/api/login',{
    //       method:'POST',
    //       headers:{
    //         'Content-Type':'application/json'
    //       },
    //       body:JSON.stringify(formData)
    //     }).then(
    //       (res) => {
    //         if(res.status === 200){
    //             navigate('/dashboard')
    //         }
    //       }

    //     ),
    // })
  //   // console.log(data)

  //   console.log(data)

  //   // if(detail?.status === true){
  //   //   navigate('/dashboard')
  //   // }
  //

  const submitHandler = async (data:FieldValues) =>{
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8000/api/user/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
      })
      console.log(data)
      const userData = await response.json()
      console.log(userData.data)
      
      if(userData.status === 200){
        // addUser(userData)
        Cookie.set('token',userData.token,{ expires: 1 })
        localStorage.setItem('user',JSON.stringify(userData.data))
        setLoading(false)
        navigate('/dashboard')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  

  return (
    <div className="min-h-screen flex w-full justify-between  item-center">
      <div className="hidden md:block">
        <img src="/login.svg" alt="" className="px-6 py-10" />
      </div>
      <div className=" md:w-2/4 flex bg-zinc-200  flex-col py-20 gap-20">
        <div className="flex flex-col items-center gap-10 ">
          <CalendarDaysIcon className="h-24 w-24 text-blue-600 " />
          <h1 className="text-4xl  font-bold text-center text-blue-600 ">
            Calendar Management System
          </h1>
        </div>

        <form
          action=""
          onSubmit={handleSubmit((data) => submitHandler(data) )}
          className="flex flex-col gap-5 px-4 md:px-24 py-4 "
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="py-2 px-4 rounded-md"
              {...register("email")}
              placeholder="example@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="py-2 px-4 rounded-md"
              {...register("password")}
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 rounded-md py-2 w-full text-white my-3 "
          >
            {
              loading ? 'Submitting...' :'Log in'
            }
            
          </button>
        </form>
      </div>
    </div>
  );
}
