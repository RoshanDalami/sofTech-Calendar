import axios from "axios";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { url } from "../service/apiHelper";


export default function TaskEditForm({setIsModelOpen,taskTitle,taskDescription,taskId,_id}:{
  setIsModelOpen:any;
  taskTitle:string;
  taskDescription:string;
  _id:string;
  taskId:string;
}) {
 
  const [isLoading, setIsLoading] = useState(false);
  const { register, resetField, handleSubmit } = useForm({
    defaultValues:{
      taskTitle:taskTitle,
      taskDescription:taskDescription,
      taskId:taskId
    }
  });

  const onSubmitHandler = async (data: FieldValues) => {
    try {
      setIsLoading(true);
      const response = await axios.post(url.updateTask, data);

      console.log(response);
      if (response.status === 200) {
        setIsLoading(false);
        resetField("taskTitle");
        resetField("taskDescription");
        setIsModelOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      action=""
      className="mt-5 flex flex-col gap-2"
      onSubmit={handleSubmit((data) => onSubmitHandler(data))}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Task Title</label>
        <input
          type="text"
          {...register("taskTitle")}
          className="rounded-md border-2 border-slate-200 px-4 py-2 "
          placeholder="Eg: Event Management"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="title">Description</label>
        <input
          type="text"
          {...register("taskDescription")}
          className="rounded-md border-2 border-slate-200 px-4 py-2 "
          placeholder="Eg: Should be ended at 3:00 PM"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-3 rounded-md bg-indigo-600 py-2 font-bold text-white hover:bg-indigo-700"
      >
        {isLoading ? "submitting..." : "Update Task"}
      </button>
    </form>
  );
}
