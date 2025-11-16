import React from 'react'
import back from "../assets/back.png"
import { useNavigate } from 'react-router-dom'
const Navbar = ({navigate, name}) => {
  const Navigate=useNavigate();
  return (
    <div className='bg-[#212A7E] w-screen h-[12vh] sm:h-[22vh] md:h-[11vh] lg:h-[18vh] flex items-center gap-5 ' >
      <div className='w-[20px] h-[20px] sm:w-[25px] sm:h-[25px] ml-4 cursor-pointer' onClick={()=>Navigate(navigate)}>
        <img src={back} className='w-fit h-fit'></img>
      </div>
      <div>
        <p className='text-white text-base' >{name}</p>
      </div>

    </div>
  )
}

export default Navbar
