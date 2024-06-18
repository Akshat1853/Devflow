import { GlobalSearchFilters } from '@/constants/filters'
import { formUrlQuery } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
// 1. Build out the entire UI/UX ->frontend
// 2. Build out the backend


// Build out some features of the fron
const GlobalFilters = () => {
    const router =useRouter();
    const searchParams=useSearchParams();
    const typeParams=searchParams.get('type');

    const [active,setActive]=useState(typeParams || '');

    const handleTypeClick=(item:string)=>{
        if(active === item){
         setActive('');
         const newUrl=formUrlQuery({
           params:searchParams.toString(),
           key:'type',
           value:''
         })
         router.push(newUrl,{scroll:false});
     
         
        }else{
         setActive(item);
        
         const newUrl=formUrlQuery({
           params:searchParams.toString(),
           key:'type',
           value:item.toLowerCase()
         })
         router.push(newUrl,{scroll:false});
        }
         
       }

  return (
    <div className='flex items-center gap-5 px-5 '>
        <p className='text-dark400_light900 body-medium '>Type:</p>
        <div className='flex gap-3'>
           {GlobalSearchFilters.map((item)=>(
            <button
            type="button"
            key={item.value}
            className={`light-border-2 samall-medium   dark:text-light-800 rounded-2xl px-5 py-2 capitalize dark:hover:text-primary-500  ${active === item.value ? "bg-primary-500 text-light-900 ":"bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500"}`}
            onClick={()=>handleTypeClick(item.value)}
            >
                {item.name}
            </button>
           ))}
        </div>
    </div>
  )
}

export default GlobalFilters