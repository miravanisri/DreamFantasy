import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Scoreboard from "../Components/Scoreboard";

const PickCaptain = () => {
  const location = useLocation();
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState("");
  const navigate=useNavigate();
  const {
    team1Image,
    team2Image,
    team1Short,
    team2Short,
    selectedPlayers = [],
    playersData = []
  } = location.state || {};

  const [captain, setCaptain] = useState(null);
  const [viceCaptain, setViceCaptain] = useState(null);

  if (!playersData.length || !selectedPlayers.length) {
    return (
      <div>
        <Navbar navigate={"/pickplayer"} name={"Select Captain and Vice Captain"} />
        <p className="text-center mt-10 text-gray-500">
          No player data found. Please go back and select your team.
        </p>
      </div>
    );
  }

  const selectedPlayersList = playersData.filter(p =>
    selectedPlayers.includes(p.id)
  );

  const handleSaveTeam = () => {
    if (!captain || !viceCaptain) {
      setError("Please select both Captain and Vice Captain before saving.");
      return;
    }
    setError("");
    navigate("/myteam", {
  state: {
    teamName: "Team 1",
    contestJoined: 0,
    captain: selectedPlayersList.find(p => p.id === captain),
    viceCaptain: selectedPlayersList.find(p => p.id === viceCaptain),
    playersCount: {
  WK: selectedPlayersList.filter(p => p.role === "Wicket-Keeper").length,
  BAT: selectedPlayersList.filter(p => p.role === "Batsman").length,
  AR: selectedPlayersList.filter(p => p.role === "All-Rounder").length,
  BOWL: selectedPlayersList.filter(p => p.role === "Bowler").length,
},
 selectedPlayersList 

  }
});

  };

  return (
    <div>
      <Navbar navigate={"/pickplayer"} name={"Select Captain and Vice Captain"} />

      <Scoreboard
        team1Image={team1Image}
        team2Image={team2Image}
        team1Short={team1Short}
        team2Short={team2Short}
        assign={false}
      />

      <div className="p-4">
        {selectedPlayersList.map(player => (
          <div key={player.id} className="flex justify-between items-center py-3 border-b">

            <div className="">
              <img
                src={player.team_logo}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <p className="font-semibold text-xs sm:text-sm">{player.name}</p>
              <p className="text-xs sm:text-sm text-gray-500">
                {player.team_short_name} - {player.role}
              </p>
            </div>

            <div className="flex gap-3">
          
<button
  className={`w-8 h-6 text-xs sm:text-base sm:w-10 sm:h-8 rounded-full border ${
    captain === player.id
      ? "bg-red-500 text-white"
      : "bg-gray-100 text-gray-600"
  }`}
  onClick={() => {
    if (viceCaptain === player.id) {
      alert("This player is already selected as Vice Captain!");
      return;
    }
    setCaptain(player.id);
  }}
>
  C
</button>


<button
  className={`w-8 h-6 sm:w-10 sm:h-8 text-xs sm:text-base rounded-full border ${
    viceCaptain === player.id
      ? "bg-gray-800 text-white"
      : "bg-gray-100 text-gray-600"
  }`}
  onClick={() => {
    if (captain === player.id) {
      alert("This player is already selected as Captain!");
      return;
    }
    setViceCaptain(player.id);
  }}
>
  VC
</button>
 
</div>

          </div>
        ))}
      </div>
      {error && (
  <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-red-100 border border-red-600 text-red-700 px-4 py-2 rounded-lg shadow-lg z-50">
    {error}
  </div>
)}
      <div className="bg-white sticky bottom-0 w-full z-20 border-t shadow-md py-4">
        <div className="max-w-[500px] mx-auto flex justify-between items-center px-4">
          
          <button className="border border-red-500 text-red-500 py-2 rounded-lg w-40 hover:bg-red-50 transition" onClick={() => setShowPreview(true)}>
            Team Preview
          </button>

          <button className="bg-red-500 text-white py-2 rounded-lg w-40 hover:bg-red-600 transition" onClick={handleSaveTeam}>
            Save Team
          </button>

        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-lg p-5 relative">

            <button 
              className="absolute top-2 right-3 text-xl font-bold"
              onClick={() => setShowPreview(false)}
            >
              ✖
            </button>

            <h2 className="text-xl font-semibold mb-3">Team Preview</h2>

            <div className="max-h-64 overflow-y-auto">
              {selectedPlayers.length === 0 ? (
                <p className="text-gray-500">No players selected yet.</p>
              ) : (
                playersData
                  .filter(p => selectedPlayers.includes(p.id))
                  .map(p => (
                    <div 
                      key={p.id}
                      className="flex justify-between items-center py-2 border-b"
                    >
                      <div>
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-sm text-gray-500">{p.role}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        {captain === p.id && (
                          <span className="text-white bg-red-500 px-2 py-0.5 rounded-full text-xs font-semibold">
                            C
                          </span>
                        )}
                        {viceCaptain === p.id && (
                          <span className="text-white bg-gray-800 px-2 py-0.5 rounded-full text-xs font-semibold">
                            VC
                          </span>
                        )}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PickCaptain;
