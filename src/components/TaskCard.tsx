export default function TaskCard({
  title,
  assignedTo,
  createdAt,
  description
}: {
  title: string;
  assignedTo: string;
  createdAt: string;
  description:string;
}) {
  return <div className="border hover:shadow-lg hover:-translate-y-3  border-black/50 rounded-md w-96 px-3 py-4 transition duration-300" >
    
    <h1 className="text-3xl font-bold my-2 pb-4 border-b " >{title}</h1>
    <p className=" py-5 border-b    " > 
    <span className="text-md font-bold">Assigned To {""} :</span>
    <span className="text-md capitalize">

    {' '}{assignedTo}
    </span>
    </p>
    <p className=" py-5 border-b   " > 
    <span className="text-md font-bold">Created At {""} :</span>
    <span className="text-md capitalize">

    {' '}{createdAt}
    </span>
    </p>
    <p className=" py-5 border-b   " > 
    <span className="text-md font-bold">Description {""} :</span>
    <span className="text-md capitalize">

    {' '}{description}
    </span>
    </p>




  </div>;
}
