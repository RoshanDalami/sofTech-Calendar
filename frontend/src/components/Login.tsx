import { CalendarDaysIcon } from "@heroicons/react/24/solid";
// import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
// import { useUser } from '../Context'
import Cookie from "js-cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function Login() {
  const navigate = useNavigate();
  // const {addUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  function handleRegisterModel() {
    setOpenRegister(true);
  }
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

  const submitHandler = async (data: FieldValues) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(data);
      const userData = await response.json();
      console.log(userData.data);

      if (userData.status === 200) {
        // addUser(userData)
        Cookie.set("token", userData.token, { expires: 1 });
        localStorage.setItem("user", JSON.stringify(userData.data));
        setLoading(false);

        navigate("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
            {errors.email?.message && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="rounded-md px-4 py-2"
              {...register("password")}
              placeholder="********"
            />
            {errors.password?.message && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
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
