// import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Task, Comment } from "../types";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { url } from "../service/apiHelper";
import axios from "axios";
interface Props {
  setComment: (boolean: boolean) => void;
  task: Task;
}

export default function IndividualTodo({ setComment, task }: Props) {
  const nameObj = JSON.parse(task.assignedTo);
  const userDetails = JSON.parse(localStorage.getItem("user")!);
  const firstNameLetter = nameObj?.firstname?.charAt(0).toUpperCase();
  const lastNameLetter = nameObj?.lastname?.charAt(0).toUpperCase();
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [commentByTodoId, setCommentByTodoId] = useState<Comment[]>([]);

  const { register, handleSubmit , resetField } = useForm();

  const getCommentByTodoId = async () => {
    try {
      const response = await axios.get(`${url.getCommentByTodoId}/${task._id}`);
      setCommentByTodoId(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCommentByTodoId();
  }, []);

  const onSubmit = async (data: FieldValues) => {
    data = {
      ...data,
      userDetails: userDetails,
      todoId: task._id,
    };

    try {
      setIsSubmitting(true)
      const response = await axios.post(url.createComment, data);
      if(response.status === 200){

        resetField('content')
        setIsSubmitting(false)
        const response = await axios.get(`${url.getCommentByTodoId}/${task._id}`);
        setCommentByTodoId(response.data);
      }
    } catch (error) {
      setIsSubmitting(false)
      console.log(error);
    }
  };
  return (
    <div className="">
      <div
        className="absolute inset-0 z-40 min-h-screen w-[100vw] bg-black/30"
        onClick={() => setComment(false)}
      ></div>
      <div className="absolute bottom-0 right-0 top-0 z-50  h-[100vh]   md:w-[50%] rounded-bl-lg rounded-tl-lg bg-slate-700 ">
        <div className="mx-6 my-4 text-xl font-bold capitalize text-white">
          {task.todoTitle}
        </div>
        <div className=" mx-6 my-4 flex  items-center gap-3 text-xl  text-white">
          <p className=" flex h-8 w-8  items-center capitalize justify-center rounded-full bg-gray-100">
            <p className="text-md font-bold text-black">
              {firstNameLetter}
              {lastNameLetter}
            </p>
          </p>
          {/* Assigned to {" "} */}
          {/* {JSON.parse(task.assignedTo)?.firstname + ' ' +  JSON.parse(task.assignedTo)?.lastname } */}
          <span className="capitalize">

          {JSON.parse(task.assignedTo)?.username} 
          </span>
          <span className="text-sm font-extralight">is assigned to this task</span>
        </div>
        <div className="absolute right-10 top-3 rounded-md shadow-md">
          <XMarkIcon
            className="h-10 w-10 text-white "
            onClick={() => setComment(false)}
          />
        </div>
        <div>
          {commentByTodoId?.map((item) => {
            return (
              <div key={item._id} className="mx-10 my-5">
                {/* user detail  */}
                <div className="flex items-center  gap-10">

                    <p className=" flex h-8 w-8  items-center justify-center rounded-full bg-gray-100">
                      <p className="text-md font-bold text-black">
                        {item?.userDetails?.data?.firstname.charAt(0)}
                        {item?.userDetails?.data?.lastname.charAt(0)}
                      </p>
                    </p>
                    <h1 className="text-xl font-semibold text-white">{item?.userDetails?.data?.username}</h1>

                </div>
{/* comment  */}
                <div className="text-lg font-medium text-white mx-5 my-3">
                {item.content}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end my-2 mx-10">
          <button className="bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md px-8 py-2 font-bold text-white">Upload Image</button>
        </div>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="mx-10">
            <textarea
              className="w-full rounded-md px-4 py-3 text-lg focus:outline-none"
              cols={100}
              {...register("content")}
              required
              placeholder="Comment about todo..."
            />
          </div>
          <div className="mr-10 flex justify-end">
            <button
              className="text-md rounded-md bg-green-600 px-5 py-2 font-bold text-white shadow-md "
              type="submit"
            >
              {
                isSubmitting ? "Submitting":"Comment"
              }
              
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
