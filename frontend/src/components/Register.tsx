import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const Register = ({}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await fetch("http://localhost:8000/api/user/register", {
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
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [showPw, setShowPw] = useState(false);
  return (
    <>
      <div className=" flex min-h-screen items-center justify-between ">
        <div className="hidden md:block">
          <img src="/register.svg" alt="" className=" ml-10 mt-10 px-6 py-10" />
        </div>
        <div className="flex  min-h-screen flex-col items-center bg-zinc-200 py-20 md:w-2/4">
          <div className="mb-14 flex flex-col items-center gap-10 ">
            <CalendarDaysIcon className="h-24 w-24 text-blue-600 " />
            <h1 className="text-center  text-4xl font-bold text-blue-600 ">
              Calendar Management System
            </h1>
          </div>
          <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className="flex w-[38vh] flex-col gap-3 md:w-[60vh]  "
          >
            <div className="flex justify-between gap-3">
              <div className="flex flex-col text-lg">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="first name"
                  className="rounded-md px-4 py-1"
                  {...register("firstname", {
                    required: "lastname is required",
                  })}
                />
                {/* <p className=" text-sm text-red-600 ">
                {errors.username?.message }
              </p> */}
              </div>
              <div className="flex flex-col text-lg">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="second name"
                  className="rounded-md px-4 py-1"
                  {...register("lastname", {
                    required: "lastname is required",
                  })}
                />
                {/* <p className=" text-sm text-red-600 ">
                {errors.username?.message }
              </p> */}
              </div>
            </div>
            <div className="flex flex-col text-lg">
              <label>Username</label>
              <input
                type="text"
                placeholder="user name"
                className="rounded-md px-4 py-1"
                {...register("username", { required: "Username is required" })}
              />
              {/* <p className=" text-sm text-red-600 ">
                {errors.username?.message }
              </p> */}
            </div>

            <div className="flex flex-col text-lg">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                className="rounded-md px-4 py-1"
                {...register("email", {
                  required: "Email Address is required",
                })}
              />
              {/* <p className=" text-sm text-red-600 "> {errors.email?.message}</p> */}
            </div>
            <div className="relative flex flex-col text-lg">
              <label>Password</label>
              <input
                type={showPw ? "text" : "password"}
                placeholder="*****"
                className=" rounded-md px-4 py-1"
                {...register("password", { required: "Password is required" })}
              />
              <p className=" text-sm text-red-600 ">
                {/* {errors.password?.message} */}
              </p>

              {showPw ? (
                <FaRegEyeSlash
                  className="absolute right-2 top-9"
                  onClick={() => setShowPw(false)}
                />
              ) : (
                <FaRegEye
                  className="absolute right-2 top-9"
                  onClick={() => setShowPw(true)}
                />
              )}
            </div>
            <input
              type="Submit"
              className="my-2 rounded-md bg-indigo-600  py-2 text-lg text-white"
            />
          </form>
          <div className="flex gap-2">
            <p className="text-gray-700 text-lg">

            already have an account ?
            </p>
            <Link to={"/login"}>
              <span className="text-blue-600 font-bold text-xl">login</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
