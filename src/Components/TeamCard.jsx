import React from "react";
import edit from "../assets/edit.png"


const TeamCard = ({ 
  teamName, 
  contestJoined, 
  captain, 
  viceCaptain, 
  playersCount,
  onPreview,
  onEdit
}) => {

  return (
    <div className="w-[280px] h-[250px] sm:w-[700px] md:w-[90vw] border-2 border-gray-200 rounded-md ml-4 mt-6 p-4 bg-white shadow-sm">

      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold">
          {teamName} 
          <span className="text-gray-400 text-sm">({contestJoined} contest joined)</span>
        </p>

        <button className="w-8 h-6 p-1 cursor-pointer" onClick={onEdit}>
          <img className="w-fit h-fit object-cover" src={edit}/>
        </button>
      </div>

      <div className="flex justify-between gap-4 mb-4">
        {captain && (
          <div className="flex gap-1.5 items-center">
            <img src={captain.team_logo} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
            <div>
              <p className="text-xs sm:text-sm">{captain.name}</p>
              <p className="text-green-600 text-xs font-semibold">Captain</p>
            </div>
          </div>
        )}

        {viceCaptain && (
          <div className="flex gap-1.5 items-center">
            <div>
              <p className="text-xs sm:text-sm">{viceCaptain.name}</p>
              <p className="text-blue-600 text-xs font-semibold ">Vice Captain</p>
            </div>
            <img src={viceCaptain.team_logo} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <p>WK ({playersCount.WK})</p>
        <p>BAT ({playersCount.BAT})</p>
        <p>AR ({playersCount.AR})</p>
        <p>BOWL ({playersCount.BOWL})</p>
      </div>

      <button 
        className="bg-red-500 text-white w-56 py-2 rounded-lg hover:bg-red-600 transition mt-8 cursor-pointer"
        onClick={onPreview}
      >
        Team Preview
      </button>
    </div>
  );
};

export default TeamCard;
