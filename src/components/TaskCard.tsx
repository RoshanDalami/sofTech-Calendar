export default function TaskCard({
  title,
  assignedTo,
  createdAt,
  description,
}: {
  title: string;
  assignedTo: string;
  createdAt: string;
  description: string;
}) {
  return (
    <div className="w-96 h-96 rounded-md border  border-black/50 px-3 py-4 transition duration-300 hover:-translate-y-3 hover:shadow-lg">
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
    </div>
  );
}
