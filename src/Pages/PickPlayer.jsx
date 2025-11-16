import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Scoreboard from "../Components/Scoreboard";
import PlayerTable from "../Components/PlayerTable";
import { useLocation, useNavigate } from "react-router-dom";

const PickPlayer = () => {
   const location = useLocation();
   const navigate= useNavigate();
  const { 
    team1Image,
    team2Image,
    team1Short,
    team2Short
  } = location.state || {};

  const [Activeicon, setActiveIcon] = useState("WK");
  const [playersData, setPlayersData] = useState([]);
  const roleMap = {
    WK: "Wicket-Keeper",
    Batsman: "Batsman",
    AR: "All-Rounder",
    Bowler: "Bowler"
  };
 useEffect(() => {
    fetch("https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_Players_of_match.json")
      .then((res) => res.json())
      .then((data) => setPlayersData(data));
  }, []);

  const filteredPlayers = playersData.filter(
    (p) => p.role === roleMap[Activeicon]
  );

  const tabContent = {
    WK: "Select 1–5 Wicket Keepers",
    Batsman: "Select 3–7 Batsmen",
    AR: "Select 0–4 All Rounders",
    Bowler: "Select 3–7 Bowlers"
  };

  const tabs = [
    { id: 1, playername: "WK" },
    { id: 2, playername: "Batsman" },
    { id: 3, playername: "AR" },
    { id: 4, playername: "Bowler" }
  ];
const [selectedPlayers, setSelectedPlayers] = useState([]);
const [playerCount, setPlayerCount] = useState(0);
const [creditsLeft, setCreditsLeft] = useState(100);
const [error, setError] = useState("");
const [showPreview, setShowPreview] = useState(false);

const roleLimits = {
  "Wicket-Keeper": { min: 1, max: 5 },
  "Batsman": { min: 3, max: 7 },
  "All-Rounder": { min: 0, max: 4 },
  "Bowler": { min: 3, max: 7 }
};
const getTeamCounts = () => {
  const selected = playersData.filter(p => selectedPlayers.includes(p.id));
  const teamCount = {};

  selected.forEach(p => {
    teamCount[p.team_short_name] = (teamCount[p.team_short_name] || 0) + 1;
  });

  return teamCount;
};
const getRoleCounts = () => {
  const counts = {
    "Wicket-Keeper": 0,
    "Batsman": 0,
    "All-Rounder": 0,
    "Bowler": 0
  };

  selectedPlayers.forEach(id => {
    const player = playersData.find(p => p.id === id);
    if (player) counts[player.role]++;
  });

  return counts;
};

const getRoleCount = (role) => {
  return playersData.filter(
    (p) => selectedPlayers.includes(p.id) && p.role === role
  ).length;
};

const handlePick = (player) => {
  const isSelected = selectedPlayers.includes(player.id);

  if (isSelected) {
    setSelectedPlayers(selectedPlayers.filter(id => id !== player.id));
    setPlayerCount(playerCount - 1);
    setCreditsLeft(creditsLeft + player.event_player_credit);
    setError("");
    return;
  }

  if (playerCount >= 11) {
    setError("❗ You can pick only 11 players.");
    return;
  }

  if (creditsLeft < player.event_player_credit) {
    setError("❗ Not enough credits.");
    return;
  }

  const teamCounts = getTeamCounts();
  if ((teamCounts[player.team_short_name] || 0) >= 7) {
    setError(`❗ You can pick max 7 players from ${player.team_short_name}.`);
    return;
  }

  const limit = roleLimits[player.role];
  const currentRoleCount = getRoleCount(player.role);

  if (currentRoleCount >= limit.max) {
    setError(`❗ You can pick max ${limit.max} ${player.role}s.`);
    return;
  }

  setSelectedPlayers([...selectedPlayers, player.id]);
  setPlayerCount(playerCount + 1);
  setCreditsLeft(creditsLeft - player.event_player_credit);
  setError("");
};
const handleSaveTeam = () => {
  const roleCounts = getRoleCounts();
  const teamCounts = getTeamCounts();

  if (playerCount !== 11) {
    setError("❗ Your team must have exactly 11 players.");
    return;
  }

  for (const role in roleLimits) {
    const count = roleCounts[role];

    if (count < roleLimits[role].min) {
      setError(`❗ You need at least ${roleLimits[role].min} ${role}(s).`);
      return;
    }

    if (count > roleLimits[role].max) {
      setError(`❗ You can pick max ${roleLimits[role].max} ${role}(s).`);
      return;
    }
  }

  for (const team in teamCounts) {
    if (teamCounts[team] > 7) {
      setError(`❗ You can pick max 7 players from ${team}.`);
      return;
    }
  }
  setError("");
 navigate("/pickcaptain", {
  state: {
    team1Image,
    team2Image,
    team1Short,
    team2Short,
    selectedPlayers,
    playersData
  }
});

};


  return (
    <div>
      <Navbar navigate={"/"} name={"Select Players"} />
      <Scoreboard 
  team1Image={team1Image}
  team2Image={team2Image}
  team1Short={team1Short}
  team2Short={team2Short}
  playerCount={playerCount}
  creditsLeft={creditsLeft}
/>

      <div className="w-screen h-12 bg-gray-200 flex justify-between items-center px-5">
        {tabs.map((t) => (
          <p
            key={t.id}
            className={`text-sm cursor-pointer ${
              Activeicon === t.playername
                ? "text-black border-b-2 border-red-700"
                : "text-gray-500"
            }`}
            onClick={() => setActiveIcon(t.playername)}
          >
            {t.playername}
          </p>
        ))}
      </div>
      <div className="h-12">
        <p className="text-base font-semibold text-center p-2">
          {tabContent[Activeicon]}
        </p>
      </div>
      <PlayerTable players={filteredPlayers} selectedPlayers={selectedPlayers}
  handlePick={handlePick} />
 {error && (
  <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-red-100 border border-red-600 text-red-700 px-4 py-2 rounded-lg shadow-lg z-50">
    {error}
  </div>
)}

<div className="bg-white sticky bottom-0 w-full z-20 border-t shadow-md py-4">
  <div className="max-w-[500px] mx-auto flex justify-between items-center px-4">
    
    <button className="border border-red-500 text-red-500 py-2 rounded-lg w-40 hover:bg-red-50 transition"  onClick={() => setShowPreview(true)}>
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
                className="flex justify-between py-2 border-b"
              >
                <p>{p.name}</p>
                <p className="text-sm text-gray-500">{p.role}</p>
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

export default PickPlayer;
