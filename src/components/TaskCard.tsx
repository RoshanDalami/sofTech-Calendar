import { ArrowSmallRightIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
export default function TaskCard({
  title,
  assignedTo,
  createdAt,
  description,
  id
}: {
  title: string;
  assignedTo: string;
  createdAt: string;
  description: string;
  id:string
}) {
  return (
    <div className="w-96 h-96 rounded-md border  border-black/50 px-3 py-4 transition duration-300 hover:-translate-y-3 hover:shadow-lg relative">
      <h1 className="my-2 border-b pb-4 text-3xl font-bold ">{title}</h1>
      <p className=" border-b py-5    ">
        <span className="text-md font-bold">Assigned To {""} :</span>
        <span className="text-md capitalize"> {assignedTo}</span>
      </p>
      <p className=" border-b py-5   ">
        <span className="text-md font-bold">Created At {""} :</span>
        <span className="text-md capitalize"> {createdAt}</span>
      </p>
      <p className=" border-b py-5   ">
        <span className="text-md font-bold">Description {""} :</span>
        <span className="text-md capitalize"> {description}</span>
      </p>
        <Link to={`/tasks/${id}`} className='' >
      <div className='bg-indigo-600 hover:bg-indigo-700 rounded-md flex items-center mt-12 '>
        <p className='flex items-center py-3 justify-center font-bold text-xl text-white w-full hover:scale-125 transition duration-200   '>
          Manage Task
        <ArrowSmallRightIcon className='h-6 w-6  mx-3'/>
        </p>
      </div>
        </Link>
    </div>
  );
}
