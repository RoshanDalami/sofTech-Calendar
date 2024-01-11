import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, IUser, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import { useEffect, useMemo } from "react";
import Model from "./Model";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { url } from "../service/apiHelper";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { nanoid } from "nanoid";
import { userAtom } from "../recoil/userAtom";
import { useRecoilValue } from "recoil";
interface Props {
  column: Column;
  // onSubmit: (data:FieldValues)=>void;
  id: Id;
  tasks: Task[];
  index: number;
  bgColor: string;
  taskDeleteHandler: (id: Id) => void;
}

export default function ColumnContainer(props: Props) {
  const { column, taskDeleteHandler, tasks, index, bgColor, id } = props;
  const { taskID } = useParams();
  const userDetails = useRecoilValue(userAtom);

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userList, setUserList] = useState([]);
  const tasksIds = useMemo(() => {
    return tasks?.map((task) => task.id);
  }, [tasks]);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        flex
        h-[500px]
        max-h-[500px]
        w-[350px]
        flex-col
        rounded-md
        bg-gray-200/50
        "
      ></div>
    );
  }
  const { register, handleSubmit, resetField } = useForm();

  const onSubmit = async (data: FieldValues) => {
    data = {
      ...data,
      columnId: "1",
      userDetails: userDetails,
      id: nanoid(),
    };

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${url.createTodo}/${taskID}`, data);

      if (response.status === 200) {
        toast.success("Todo Created Successfully");
        resetField("todoTitle");
        resetField("assignedTo");
        setIsSubmitting(false);
        setIsModelOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAllUser = async () => {
    try {
      const response = await axios.get(`${url.getAllUser}`);
      setUserList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUser();
  }, [userList]);

  return (
    <>
      {isModelOpen && (
        <Model>
          <div className="relative rounded-md bg-white p-5 ">
            <div className="absolute right-5 rounded-full bg-black/10 p-2 transition duration-300 hover:bg-black/20 ">
              <XMarkIcon
                className="h-7 w-7 cursor-pointer "
                onClick={() => setIsModelOpen(false)}
              />
            </div>
            <form
              action=""
              className="mt-5 flex flex-col gap-2"
              onSubmit={handleSubmit((data) => onSubmit(data))}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="title">Task Title</label>
                <input
                  type="text"
                  {...register("todoTitle")}
                  className="rounded-md border-2 border-slate-200 px-4 py-2 "
                  placeholder="Eg: Event Management"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="title">Assigned To</label>
                <select
                  id=""
                  {...register("assignedTo")}
                  className="rounded-md border-2 border-slate-200 py-2"
                >
                  <option value="" disabled selected>
                    --select person to assign--
                  </option>
                  {userList?.map((item: IUser) => {
                    const data = {
                      firstname: item.firstname,
                      lastname: item.lastname,
                      username: item.username,
                    };
                    return (
                      <option value={JSON.stringify(data)}>
                        {item?.username}
                      </option>
                    );
                  })}
                </select>
                {/* <input
                  type="text"
                  {...register("assignedTo")}
                  className="rounded-md border-2 border-slate-200 px-4 py-2 "
                  placeholder="Eg: roshan dalami"
                  required
                /> */}
              </div>

              <button
                type="submit"
                className="mt-3 rounded-md bg-indigo-600 py-2 font-bold text-white hover:bg-indigo-700"
              >
                {isSubmitting ? "Submitting ..." : "Add Task"}
              </button>
            </form>
          </div>
        </Model>
      )}

      <div
        ref={setNodeRef}
        style={style}
        className={`
    flex
    h-[85vh]
    w-[400px]
    flex-col
    overflow-hidden
    rounded-md
    ${
      (id === "1")
        ? "bg-red-300/40"
        : (id === "2")
        ? "bg-green-300/40"
        : (id === "3")
        ? "bg-blue-500/40"
        : (id === "4")
        ? "bg-yellow-300/40"
        : ""
    }
    `}
      >
        {/* column title  */}
        <div
          {...attributes}
          {...listeners}
          className={`flex items-center bg-gray-600/50  px-4 py-5 `}
        >
          <div
            className={`text-bold text-md ${bgColor} h-5 w-5 rounded-full  `}
          ></div>
          <div className="px-3 text-lg font-bold text-white">
            {column.title}
          </div>
        </div>

        {/* column task container  */}
        <div className="scrollbar-width-thincrollbar-thumb-black scrollbar-track-gray-100 flex flex-grow flex-col gap-2 overflow-y-auto py-3">
          <SortableContext items={tasksIds}>
            {tasks?.map((task: Task) => {
              console.log(task)
              return (
                <TaskCard
                  task={task}
                  key={task.id}
                  taskDeleteHandler={taskDeleteHandler}
                />
              );
            })}
          </SortableContext>
        </div>

        {/* column footer  */}
        {index === 0 && (
          <button
            className="rounded-b-md bg-indigo-600 py-2 text-lg font-bold text-white"
            onClick={() => {
              // createTask(column.id)

              setIsModelOpen(true);
            }}
          >
            Add Task
          </button>
        )}
      </div>
    </>
  );
}
