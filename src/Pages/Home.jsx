import React, { useEffect, useState } from 'react'
import user from "../assets/user.png"
import plus from "../assets/plus.png"
import cricket from "../assets/cricket.png"
import football from "../assets/football.png"
import basketball from "../assets/basketball.png"
import rugby from "../assets/rugby-ball.png"
import hockey from "../assets/hockey.png"
import MatchCard from '../Components/MatchCard'


const Home = () => {
  const games=[
    {
      image:cricket,
      name:"Cricket"
    },
    {
      image:football,
      name:"Football"
    },
    {
      image:basketball,
      name:"Basketball"
    },
    {
      image:rugby,
      name:"Rugby"
    },
    {
      image:hockey,
      name:"Hockey"
    }
  ]
  const buttons=["Upcoming Matches", "Live", "Completed"]
  const [activeButton, setActiveButton] = useState('Upcoming Matches');
  const [selectedSport, setSelectedSport] = useState("cricket");
const [matchStatus, setMatchStatus] = useState("upcoming");
const [matches, setMatches] = useState([]);

useEffect(() => {
  const fetchMatches = async () => {
    try {
      const res = await fetch("https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_upcoming_Matches.json");
      const data = await res.json();

      const list = data.matches[selectedSport] || [];

      const filtered = list.filter(
        (m) => m.match_status.toLowerCase() === matchStatus
      );

      setMatches(filtered);
    } catch (error) {
      console.log("Error fetching matches:", error);
    }
  };

  fetchMatches();
}, [selectedSport, matchStatus]);

  return (
    <>
    <header>
        <nav className='bg-[#212A7E] w-screen h-[25vh] sm:h-[28vh] md:h-[19vh] lg:h-[29vh]'>
            <div className='flex justify-between'>
                <div className='flex ml-6 mt-6'>
                  <div className='w-[40px] h-[40px] rounded-full'>
                    <img src={user} className='w-fit h-fit'></img>
                  </div>
                  <div>
                    <p className='text-white text-sm font-normal mt-1 tracking-wider'>Bhupendar</p>
                  </div>
                </div>
                <div className='mt-6 mr-6 flex gap-5'>
                  <div>
                  <p className='text-white text-sm font-normal'>₹12,203.99</p>
                  <p className='text-gray-300 font-light text-xs ml-2.5'>BALANCE</p>  
                  </div> 
                   <div className='w-[25px] h-[25px] bg-green-500 rounded-full'>
                  <img src={plus} className='w-fit h-fit p-1'></img>
                </div>
                </div>
            </div>
            <div className='flex justify-evenly mt-7 sm:mt-3 md:mt-[22px] lg:mt-4'>
              {games.map((game)=>(
                  <div className='w-[50px] h-[50px] bg-blue-950 rounded-full cursor-pointer hover:bg-pink-700'  onClick={() => setSelectedSport(game.name.toLowerCase())}>
                  <img src={game.image} className='w-fit h-fit p-3 '></img>
                  <p className='text-white text-xs tracking-wider font-semibold text-center'>{game.name}</p>
              </div>
              ))
              }
            </div>

        </nav>
    </header>
    <main>
        <section>
<div className='flex justify-around mt-3.5'>
  {buttons.map((button)=>(
  <div>
    <button 
        onClick={() => {setActiveButton(button),setMatchStatus(button.split(" ")[0].toLowerCase())}}
        className={`cursor-pointer text-sm font-semibold sm:text-base transition-all duration-150
          ${activeButton === button 
            ? 'text-[#212A7E] border-b-2 border-[#212A7E]' 
            : 'text-gray-600 hover:text-[#212A7E]'
          }`}
      >
        {button}
      </button>
  </div>
  ))}
</div>
        </section>
        <section>
          <div className='flex flex-col mt-8 ml-8'>
               <div className='flex flex-col gap-2.5'>
                <p className='text-base tracking-tighter font-bold'>Create Your Fantasy Team</p>
                <p className='text-xs sm:text-base -tracking-tight text-gray-400'>Select a upcoming match to generate team</p>
               </div>
               <div className='mt-2.5 flex justify-center -ml-8 sm:justify-start sm:ml-0 '>
                {matches.length === 0 ? (
    <p className='text-gray-400 text-sm ml-2 relative left-[10px] top-[30px] sm:left-[320px] sm:top-[50px] lg:top-[50%] lg:left-[50%]  '>No matches available</p>
  ) : (
    matches.map((match) => (
      <MatchCard key={match.id} match={match} />
    ))
  )}
               </div>
          </div>
        </section>
    </main>
     
    </>
  )
}

export default Home
