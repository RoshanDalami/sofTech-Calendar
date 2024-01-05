import React,{useState} from 'react'
import EventReportCard from '../components/EventReportCard';
import TaskReportCard from '../components/TaskReportCard';

export default function Reports() {
  const [isEventSelected,setIsEventSelected]=useState(false);
  const [isTaskSelected,setIsTaskSelected] = useState(false);


  const eventHandler = ()=>{
    setIsEventSelected(true);
    setIsTaskSelected(false);
  }
  const taskHandler = ()=>{
    setIsEventSelected(false);
    setIsTaskSelected(true);
  }
  

  return (
    <div className="">
      <div className="mx-5 mt-5 flex gap-8">
        <button
          className={`text-md rounded-md bg-indigo-600 px-10 py-3 font-bold text-white shadow-md hover:bg-indigo-700 ${isEventSelected=== true ? `bg-lime-600 hover:bg-lime-700 `:''} `}
          onClick={eventHandler}
        >
          Events Report
        </button>
        <button
          className={`text-md rounded-md bg-indigo-600 px-10 py-3 font-bold text-white shadow-md hover:bg-indigo-700 ${isTaskSelected=== true ?"bg-lime-600 hover:bg-lime-700":''}`}
          onClick={taskHandler}
        >
          Task Report
        </button>
      </div>
      <div>
        {
          isEventSelected ? (<React.Fragment>
            <div className='my-3'>
              <EventReportCard/>
            </div>
          </React.Fragment>):  ( isTaskSelected? <React.Fragment>
            <div className='my-10' >
             <TaskReportCard/>
            </div>
          </React.Fragment>:  
          
        <div className=" flex h-[90vh] items-center justify-center">
          <div>
            <img src="/select.svg" alt="" />
            <h1
              className={`-mt-32 text-3xl font-bold dark:text-white md:absolute `}
            >
              Select Option to get Report
            </h1>
          </div>
        </div>
          )
        }
      </div>
    </div>
  );
}
