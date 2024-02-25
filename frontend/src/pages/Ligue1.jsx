import axios from "axios";
import { useEffect, useState } from "react"
import Select from "../components/Select"
import TeamCard from "../components/TeamCard";
import SkeletonTeamCard from "../components/SkeletonTeamCard";

const Ligue1 = () => {
  const [currentTab, setCurrentTab] = useState("Teams")
  const [dataTeams, setDataTeams] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await axios.request(`http://localhost:3001/football/teams`);
        setDataTeams(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[]);

  if (!dataTeams) {
    return <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} disabled={true} />
      <SkeletonTeamCard length={18} column={6} />
    </div>
  }

  console.log(dataTeams)
  
  return (
    <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} disabled={false} />
      <div className="w-full border-t relative">
        {currentTab === "Teams" && (
          <div className="grid grid-cols-6 gap-4 p-5">
            {Object.keys(dataTeams).map((team, index) => (
              <TeamCard 
                key={index}
                name={team} 
                index={index} 
                image={dataTeams[team]} 
              />
            ))}
          </div>
        )}
        {currentTab === "Standings" && (
          <div className="flex flex-col overflow-x-hidden p-5">
            <div className="2xl:mx-8">
              <div className="inline-block min-w-full py-2 2xl:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-center text-sm font-light">
                    <thead className="border-b font-medium">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-lg border-r">Equipe</th>
                        <th scope="col" className="px-6 py-4 text-lg border-r">Matchs Joués</th>
                        <th scope="col" className="px-6 py-4 text-lg border-r">Victoires - Défaites - Egalités</th>
                        <th scope="col" className="px-6 py-4 text-lg">Points</th>
                      </tr>
                    </thead>
                    {dataStandings.map((team, index) => (
                      <tbody key={index}>
                        <tr className='text-xl hover:bg-base-300'>
                          <td className="text-left flex flex-row border-r relative pl-2">
                            <span>{team.stats.rank}&nbsp;</span>
                            <img className="w-10 h-10 p-1" src={team.team.logo} alt="" />
                            <span className="hover:cursor-pointer hover:underline">{team.team.name}</span>
                          </td>
                          <td className="border-r">{team.stats.gamesPlayed}</td>
                          <td className="border-r">{team.stats.wins} - {team.stats.losses} - {team.stats.ties}</td>
                          <td>{team.stats.points}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
    </div>
  )
}

export default Ligue1