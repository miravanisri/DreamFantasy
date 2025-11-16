import React from 'react'
import { useNavigate } from 'react-router-dom'

const MatchCard = ({key,match}) => {
const Navigate=useNavigate();
  return (
    <div key={key} className='w-[280px] h-[180px] sm:w-[700px] md:w-[90vw] border-2 border-gray-200 rounded-md '>
      <div className='h-7 bg-slate-50'>
       <p className='text-[13px] tracking-tighter pl-3 pt-1 '>{match.event_name}</p>
      </div>
      <div className='cursor-pointer'>
  <div className='flex justify-between'>
          <div className='flex mt-4'>
                 <div className='w-[40px] h-[40px] bg-amber-100 rounded-full ml-1.5 '>
                    <img src={match.t1_image} className='w-fit h-fit object-cover p-2'></img>
                 </div>
                 <div>
                     <p className='font-semibold mt-1.5 ml-1.5'>{match.t1_short_name}</p>
                 </div>
          </div>
          
           <div className='flex mt-4'>
                <div>
                     <p className='font-semibold mt-1.5 mr-1.5'>{match.t2_short_name}</p>
                 </div>
                 <div className='w-[40px] h-[40px] bg-amber-100 rounded-full mr-1.5 '>
                   <img src={match.t2_image} className='w-fit h-fit object-cover p-2'></img>
                 </div>
                 
          </div>

          </div>
          <div className='flex justify-between'>
            <div className='ml-2.5 mt-3'>
            <p className='text-xs text-gray-500'>{match.t1_name}</p>
          </div>
          <div className='mt-3 mr-2.5'>
            <p className='text-xs text-gray-500'>{match.t2_name}</p>
          </div>
          </div>
          <div className='ml-3.5 mt-5'>
                <button className='text-sm w-26  sm:w-52 h-8 bg-[#212A7E] tracking-wide cursor-pointer p-1 rounded-md text-white'  onClick={() =>
    Navigate("/pickplayer", {
      state: {
        team1Image: match.t1_image,
        team2Image: match.t2_image,
        team1Short: match.t1_short_name,
        team2Short: match.t2_short_name
      }
    })
  }><p className='mb-0.5'>Build Team</p></button>
          </div>
      </div>
    
    </div>
  )
}

export default MatchCard
