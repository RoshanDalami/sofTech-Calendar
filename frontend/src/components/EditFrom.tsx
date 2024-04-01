import  { FormEvent, useState } from "react";
import { Event } from "../types";
import { url } from "../service/apiHelper";
import axios from "axios";

export default function EditFrom({ event , setIsEdit,setEvents}: { event: Event,setIsEdit:any,setEvents:any }) {
  const [formData, setFormData] = useState({
    event: event.eventTitle,
    description: event.eventDescription,
  });
  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    // console.log(response);
    try {
        const body = {...event,eventTitle:formData.event,eventDescription:formData.description}
        const response = await axios.post(url.postEvent, body);
        if(response?.status === 200){
          try {
            const response = await axios.get(url.getAllEvents);
             
              setEvents(response.data);
            
          } catch (error) {
            console.log(error);
          }
        }
        setIsEdit(false)
        
    } catch (error) {
        console.log(error,'error')
    }
  };

  return (
    <form
      action=""
      className="mx-5 mt-12 flex flex-col gap-4"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="event" className="text-2xl font-bold">
          Event
        </label>
        <input
          type="text"
          className="rounded-md border-[1px] border-gray-500 px-4 py-2"
          placeholder="Events"
          onChange={(e) => {
            setFormData({ ...formData, event: e.target.value });
          }}
          value={formData.event}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-2xl font-bold">
          Description
        </label>
        <input
          type="text"
          className="rounded-md border-[1px] border-gray-500 px-4 py-2"
          placeholder="Event Description"
          onChange={(e) => {
            setFormData({
              ...formData,
              description: e.target.value,
            });
          }}
          value={formData.description}
          required
        />
      </div>
      <button
        type="submit"
        className="mb-3 mt-2 rounded-md bg-blue-600 py-2 text-white"
      >
        Update Event
      </button>
    </form>
  );
}
