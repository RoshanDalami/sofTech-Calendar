import {useEffect, useState} from 'react'
import { url } from '../service/apiHelper';
import axios from 'axios';
import { useParams } from 'react-router-dom';
interface IndividualEvent{
    _id:string,
    eventId:string,
    eventDateEnglish:string,
    eventDateNepali:string,
    eventDescription:string,
    eventEndTime:string,
    eventStartTime:string,
    eventTitle:string,
    userDetails:string
}
export default function IndividualEvent() {
    const {eventId} = useParams();
    const [apiData,setApiData]= useState<IndividualEvent>({
        _id:'',
    eventId:'',
    eventDateEnglish:'',
    eventDateNepali:'',
    eventDescription:'',
    eventEndTime:'',
    eventStartTime:'',
    eventTitle:'',
    userDetails:''
    });

    useEffect(()=>{
        async function fetchData(){
            const {data} = await axios.get(`${url.getEventByEventId}/${eventId}`)
                if(data){
                    setApiData(data)
                }
        }
        fetchData()
    },[])

  return (
    <div>
        <div>
            <h1 className='text-3xl dark:text-white text-gray-800 font-bold '>{apiData.eventTitle}</h1>
        </div>
    </div>
  )
}
