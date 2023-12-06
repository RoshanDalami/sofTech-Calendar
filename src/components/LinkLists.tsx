// import React from 'react'
import { HomeIcon ,CalendarDaysIcon, UserGroupIcon , BriefcaseIcon  } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { Link,useLocation } from 'react-router-dom';

const navLinks = [
    {
        icon:<HomeIcon className='w-8 h-8' />,
        title:'Dashboard' ,
        herf:'/dashboard',
    },
    {
        icon:<CalendarDaysIcon className='w-8 h-8'/>,
        title:'Calendar' ,
        herf:"/calendar/:BSYear?/:BSMonth?",
    },
    {
        icon:<UserGroupIcon className='w-8 h-8' />,
        title:'Events' ,
        herf:"/events",
    },
    {
        icon:<BriefcaseIcon className='w-8 h-8' />,
        title:'Tasks' ,
        herf:"/tasks",
    },
]

export default function LinkLists() {
        const location = useLocation()
       
  return (
    <div className='w-full py-4 px-5 flex gap-6 flex-col my-5  ' >
        {
            navLinks.map((link)=>{
                const isPath = location.pathname.split('/')[1] === link.herf.split('/')[1]
                
                return(
                    
                    <Link  key={link.title} to={link.herf} className={clsx('w-full ',{ 'bg-gray-300 px-2 py-2 rounded-md  ': isPath })} >
                        <div className={clsx('text-black  flex items-center gap-3  dark:text-white',{"text-black dark:text-black ": isPath}) } >
                            {link.icon }
                            <p className='text-lg' >{link.title}</p>
                        </div>
                    </Link>
                )
            })
        }
      
    </div>
  )
}
