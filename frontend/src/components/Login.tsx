import { CalendarDaysIcon,EyeIcon,EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../recoil/userAtom";
import { baseurl } from "../service/apiHelper";
import toast from "react-hot-toast";



export default function Login() {

  const navigate = useNavigate()
  const [ _,setUser] = useRecoilState(userAtom)


  const { register, handleSubmit } = useForm();
  const [loading,setLoading] = useState(false);
  const [showPassword,setShowPassword] = useState(false)

  const submitHandler = async (data:FieldValues) =>{

    try {
      setLoading(true);
      const response = await fetch(`${baseurl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data)
      })
      console.log(data)
      const userData = await response.json()
      console.log(userData,'userData')
      
      
      if(userData.status === 200){
        setUser(userData)
        localStorage.setItem('user',JSON.stringify(userData))
        setLoading(false)
        navigate('/dashboard')
        toast.success("Login Successful")
      }else{

        toast.error("Invalid Credentials ")
      }
    } catch (error) {
      setLoading(false);

    } finally {
      setLoading(false);
    }

  }
  
 


  return (
    <div className="item-center flex min-h-screen w-full  justify-between ">
      <div className="hidden md:block">
        <img src="/login.svg" alt="" className="px-6 py-10" />
      </div>
      <div className=" flex flex-col    bg-zinc-200 py-20 md:w-2/4">
        <div className="mb-14 flex flex-col items-center gap-10 ">
          <CalendarDaysIcon className="h-24 w-24 text-blue-600 " />
          <h1 className="text-center  text-4xl font-bold text-blue-600 ">
            Calendar Management System
          </h1>
        </div>

        <form
          action=""
          onSubmit={handleSubmit((data) => submitHandler(data))}
          className="flex flex-col gap-8 px-4 py-4 md:px-24  "
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="rounded-md px-4 py-2"
              {...register("email")}
              placeholder="example@example.com"
            />
            {/* {errors.email?.message && (
              <p className="text-red-600">{errors.email?.message}</p>
            )} */}
          </div>
          <div className="flex flex-col gap-2 relative ">
            <label htmlFor="email" className="text-lg">
              Password
            </label>
            <input
              type={showPassword?'text':'password'}
              id="password"
              className="rounded-md px-4 py-2"
              {...register("password")}
              placeholder="********"
            />
            <div className=" absolute bottom-1.5 right-3 md:bottom-2 md:right-5 cursor-pointer " onClick={()=>setShowPassword((prevState)=> !prevState)}>
              {
                showPassword ? <EyeSlashIcon className="h-5 w-5 font-bold"/> : <EyeIcon className="h-5 w-5 font-bold"/>
              }
            </div>
            {/* {errors.password?.message && (
              <p className="text-red-600">{errors.password?.message}</p>
            )} */}
          </div>

          <button
            type="submit"
            className="my-3 w-full rounded-md bg-indigo-600 py-2 text-white "
          >
            {loading ? "Submitting..." : "Log in"}
          </button>
        </form>
        <div className="px-4 md:px-24">
          <p className="text-md text-center font-bold">
            Don't have an account?
          </p>
          <button
            className="my-3 w-full rounded-md border-2 border-gray-600 py-2 text-black"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
