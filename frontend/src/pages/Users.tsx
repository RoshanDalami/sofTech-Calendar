import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../service/apiHelper";
import { IUser } from "../types";
import { TrashIcon } from "@heroicons/react/24/outline";
import TableHeader from "../components/TableHeader";
import { TablePagination } from "@mui/material";
import Model from "../components/Model";
import { Transition } from "@headlessui/react";
import { FieldValues, useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { baseurl } from "../service/apiHelper";
// import { useNavigate } from "react-router-dom";
export default function Users() {
  const [userList, setUserList] = useState<IUser[]>([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [showPw, setShowPw] = useState(false);
  const { register, resetField, handleSubmit } = useForm();
//   const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await fetch(`${baseurl}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      resetField("firstname");
      resetField("lastname");
      resetField("username");
      resetField("email");
      resetField("password");
      const userData = await response.json();
      console.log(userData.data);

      if (userData.status === 200) {
        // addUser(userData)
        setIsAddingUser(false);

        try {
          const response = await axios.get(url.getAllUser);
          setUserList(response.data);
        } catch (error) {
          console.log(error);
        }

        // navigate("/users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (_e: any, newpage: number) => {
    setPage(newpage);
  };
  function handlePerPage(e: any) {
    setRowPerPage(+e.target.value);
    setPage(0);
  }
  const getUser = async () => {
    try {
      const response = await axios.get(url.getAllUser);
      setUserList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  async function deleteUser (_id:string){
    try {
       const response =  await axios.delete(`${url.deleteUser}/${_id}`)
       console.log(`${url.deleteUser}/${_id}`)
       console.log(response)
       if(response.status === 200){
        try {
            const response = await axios.get(url.getAllUser);
            setUserList(response.data);

          } catch (error) {
            console.log(error);
          }
       }
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <React.Fragment>
      {
        <Transition
          show={isAddingUser}
          enter="transition ease-in-out duration-400 transform"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-400 transform"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 z-40 w-full  md:min-h-screen  "
        >
          <Model>
            <div className="bg-white rounded-md shadow-md">
              <div className=" flex items-center justify-center py-4 relative">
                <p className="text-xl font-bold">Add New User</p>
                <button
                  className="bg-red-600 px-4 py-2 text-white font-bold rounded-md shadow-md absolute  right-3"
                  onClick={() => setIsAddingUser(false)}
                >
                  Cancel
                </button>
              </div>
              <form
                onSubmit={handleSubmit((data) => onSubmit(data))}
                className="flex  flex-col gap-3 mx-8  "
              >
                <div className="flex flex-col md:flex-row justify-between gap-2  ">
                  <div className="flex flex-col text-lg w-full">
                    <label>First Name</label>
                    <input
                      type="text"
                      placeholder="first name"
                      className="rounded-md px-4 py-1 border"
                      {...register("firstname", {
                        required: "lastname is required",
                      })}
                    />
                    {/* <p className=" text-sm text-red-600 ">
                {errors.username?.message }
              </p> */}
                  </div>
                  <div className="flex flex-col text-lg w-full">
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="second name"
                      className="rounded-md px-4 py-1 border"
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
                    className="rounded-md px-4 py-1 border"
                    {...register("username", {
                      required: "Username is required",
                    })}
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
                    className="rounded-md px-4 py-1 border"
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
                    className=" rounded-md px-4 py-1 border"
                    {...register("password", {
                      required: "Password is required",
                    })}
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
            </div>
          </Model>
        </Transition>
      }

      <div>
        <TableHeader title="Users" />
        <div className="flex justify-end mx-6 my-3">
          <button
            className="bg-green-600 rounded-md py-2 px-5 text-white font-bold"
            onClick={() => setIsAddingUser(true)}
          >
            Add User
          </button>
        </div>
        <div className="bg-white rounded-md overflow-auto">
          <table className="w-full border-2 text-center">
            <tr className="bg-gray-200">
              <th className="py-4  dark:text-black">Image</th>
              <th className=" dark:text-black">Name</th>
              <th className=" dark:text-black">Username</th>
              <th className=" dark:text-black">Role</th>
              <th className=" dark:text-black">Created Date</th>
              <th className=" dark:text-black">Action</th>
            </tr>

            {userList
              ?.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
              .map((item) => {
                return (
                  <tr className=" border-b bg-white " key={item._id}>
                    <td className="py-3 flex items-center justify-center ">
                      <div className="bg-gray-300 h-10 w-10 flex items-center justify-center rounded-full ">
                        <p className="text-black text-lg">
                          {`${item.firstname.charAt(0)}${item.lastname.charAt(
                            0
                          )}`}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="text-lg text-black capitalize">
                          {`${item.firstname} ${item.lastname}`}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="text-lg text-black capitalize">
                          {`${item.username} `}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="text-lg text-black capitalize">
                          {`${item.role} `}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="text-lg text-black">
                          {`${item.createdAt.slice(0, 10)} `}
                        </p>
                      </div>
                    </td>
                    <td className=" flex justify-center mt-2  ">
                        <p className="rounded-md p-2 bg-red-600 cursor-pointer" onClick={()=>deleteUser(item._id)} >
                          <TrashIcon className="h-6 w-6 text-white" />
                        </p>
                    </td>
                  </tr>
                );
              })}
          </table>
          <TablePagination
            rowsPerPageOptions={[7]}
            rowsPerPage={rowPerPage}
            page={page}
            count={userList.length}
            component={"div"}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handlePerPage}
          ></TablePagination>
        </div>
      </div>
    </React.Fragment>
  );
}
