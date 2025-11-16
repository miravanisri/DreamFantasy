import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import TeamCard from "../Components/TeamCard";
import { useState } from "react";

const Myteam = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { 
    teamName, 
    contestJoined, 
    captain, 
    viceCaptain, 
    playersCount,
    selectedPlayersList   
  } = location.state || {};

  const [showPreview, setShowPreview] = useState(false);

  if (!teamName) {
    return <p className="text-center mt-10 text-gray-500">No team data found.</p>;
  }

  return (
    <div>
      <Navbar navigate={"/"} name={"Contest"} />

      <div className="text-sm text-gray-500 ml-3.5 mt-3.5">
        <p>Select a team to register</p>
      </div>

      <TeamCard
        teamName={teamName}
        contestJoined={contestJoined}
        captain={captain}
        viceCaptain={viceCaptain}
        playersCount={playersCount}
        onPreview={() => setShowPreview(true)}
        onEdit={() => navigate("/pickplayer", { state: location.state })}
      />

      {showPreview && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg p-5 relative">

            <button 
              className="absolute top-2 right-3 text-xl font-bold"
              onClick={() => setShowPreview(false)}
            >
              ✖
            </button>

            <h2 className="text-xl font-semibold mb-3">Team Preview</h2>

            <div className="max-h-64 overflow-y-auto">
              {selectedPlayersList?.map(p => (
                <div key={p.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-gray-500">{p.role}</p>
                  </div>

                  <div className="flex gap-2">
                    {captain?.id === p.id && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">C</span>
                    )}
                    {viceCaptain?.id === p.id && (
                      <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded-full">VC</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Myteam;
