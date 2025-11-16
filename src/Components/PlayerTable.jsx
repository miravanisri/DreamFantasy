const PlayerTable = ({ players, selectedPlayers, handlePick }) => {
  return (
    <div className="w-full">
    <div className="grid grid-cols-4 bg-gray-200 py-2 px-4 font-semibold text-gray-600 text-sm sticky top-0 z-20">
        <p>Player</p>
        <p className="text-center">Points</p>
        <p className="text-center">Credits</p>
        <p className="text-center">Pick</p>
      </div>
      {players.map((p) => (
        <div
          key={p.id}
          className="grid grid-cols-4 items-center py-3 px-4 border-b"
        >
          <div className="flex items-center gap-3">
            <img
              src={p.team_logo}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-xs sm:text-sm">{p.short_name}</p>
              <p className="text-xs text-gray-500">
                {p.team_short_name} - {p.role}
              </p>
            </div>
          </div>
          <p className="text-center text-sm sm:text-base">{p.event_total_points}</p>
          <p className="text-center text-sm sm:text-base">{p.event_player_credit}</p>
          <div className="flex justify-center ">
            <input type="checkbox"  checked={selectedPlayers.includes(p.id)}
  onChange={() => handlePick(p)} className="w-5 h-5 accent-red-600  scale-75 sm:scale-100 " />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerTable;
