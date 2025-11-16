import React from 'react'

const Scoreboard = ({team1Image, team2Image, team1Short, team2Short, playerCount, creditsLeft, assign=true}) => {
  return (
    <div className='bg-black w-screen h-[150px] flex justify-between'>
      <div className='flex gap-5 sm:gap-9 pt-6 ml-4 sm:ml-11 '>
        <div>
           <div className='w-[50px] h-[50px] bg-white  rounded-full'><img src={team1Image} className='w-fit h-fit object-cover p-2'></img></div>
           <p className='text-white ml-2 font-semibold'>{team1Short}</p>

        </div>
   <div>
  <div className='w-[50px] h-[50px] bg-white rounded-full'><img src={team2Image} className='w-fit h-fit object-cover p-2'></img></div>
  <p className='text-white ml-4 font-semibold'>{team2Short}</p>
  </div>      
      </div>
      {assign && (
      <div className='mt-6 mr-12 sm:mr-40'>
        <p className='text-white text-sm sm:text-base'>Max 7 players from a team</p>
        <div className='flex gap-6'>
          <div className='text-white mt-2.5'>
         <p className='text-sm'><span className='text-lg sm:text-xl'>{playerCount}</span>/11</p>
         <p className='text-gray-400 text-sm'>Players</p>
          </div>
          <div className='text-white mt-2.5'>
          <p className='text-lg sm:text-xl'>{creditsLeft}</p>
          <p className='text-gray-400 text-sm'>Credits Left</p>
          </div>
        </div>

      </div>
      )}
    </div>
  )
}

export default Scoreboard
