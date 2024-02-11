import format from "date-fns/format";
import axios from "axios";
import { useEffect, useMemo, useState } from "react"
import TeamCard from "../components/TeamCard";
import Select from "../components/Select"
import { fr } from "date-fns/locale";
import SkeletonTeamCard from "../components/SkeletonTeamCard";
import { useLocation, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";

const Top14 = () => {
  const [currentTab, setCurrentTab] = useState("Teams")
  const [dataTeams, setDataTeams] = useState(null);
  const [dataStandings, setDataStandings] = useState(null)
  const [dataMatches, setDataMatches] = useState(null)
  const [week, setWeek] = useState(0)
  const [leagueId, setLeagueId] = useState(0)
  const [queryParameters] = useSearchParams()

  // eslint-disable-next-line no-unused-vars
  const updateLeagueId = useMemo(() => setLeagueId(queryParameters.get("id")), [queryParameters])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await axios.request(`http://localhost:3001/rugby/${leagueId}/teams`);
        setDataTeams(response.data.message);
        response = await axios.request(`http://localhost:3001/rugby/${leagueId}/standings`);
        setDataStandings(response.data.message);
        response = await axios.request(`http://localhost:3001/rugby/${leagueId}/matches`);
        setDataMatches(response.data.message);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[leagueId]);

  if (!dataTeams || !dataStandings) {
    return <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} disabled={true} />
      <SkeletonTeamCard length={14} column={5} />
    </div>
  }

  console.log(dataMatches)
  
  return (
    <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} disabled={false} />
      <div className="w-full border-t relative">
        {currentTab === "Teams" && (
          <div className={`grid grid-cols-${Math.floor(dataTeams.length / 3) + 1} gap-4 p-5`}>
            {dataTeams.map((club, index) => (
              <TeamCard 
                key={index} 
                name={club.name} 
                index={index} 
                image={club.logo}
                id={''} 
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
                        <th scope="col" className="px-6 py-4 text-lg border-r">Points</th>
                        <th scope="col" className="px-6 py-4 text-lg">DP</th>
                      </tr>
                    </thead>
                    {dataStandings.map((team, index) => (
                      <tbody key={index}>
                        <tr className="text-xl hover:bg-base-300">
                          <td className="text-left flex flex-row border-r relative pl-2 items-center">
                            <span>{team.position}&nbsp;</span>
                            <img className="w-10 h-lg p-1" src={team.team.logo.includes("/0.png") ? team.team.logo.replace("/0.png", "/100.png") : team.team.logo} alt="" />
                            <span className="hover:cursor-pointer hover:underline">{team.team.name}</span>
                          </td>
                          <td className="border-r">{team.games.played}</td>
                          <td className="border-r">{team.games.win.total} - {team.games.lose.total} - {team.games.draw.total}</td>
                          <td className="border-r">{team.points}</td>
                          <td>{team.goals.for - team.goals.against}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* {currentTab === "Matches" && (
          res[0].map((match, index) => (
            <div key={match.id}>
              <div className="container mx-auto flex flex-row justify-center items-center relative border-b p-2">
                <div className="absolute top-0 left-0 pl-2 pt-1">
                  {match.comp_name} - Semaine {match.game_week} - {match.venue}
                </div>
                <div className="absolute top-0 right-0 pr-2 pt-1">
                  {match.status === "Result" && "Terminé"}
                  {match.status.toLowerCase().includes("half") && "En cours"}
                  {match.status === "Not Started" && "A venir"}
                </div>
                <div className="absolute bottom-0 left-0 pl-2 pb-1">
                  {parseInt(match.date.split('T')[1].split('+')[0].split(':')[0]) + 1 + ":00"}
                </div>
                <div className="absolute bottom-0 right-0 pr-2 pb-1">
                  {match.date.split('T')[0].split('-')[2] + " " + format(new Date(2023, match.date.split('T')[0].split('-')[1] - 1, 1), 'MMMM', {locale: fr})}
                </div>
                <div className="home flex flex-row items-center">
                  <div className="items-center flex flex-col">
                    <img className="w-lg h-28 mt-3" src={route.pathname.split('/')[2]  === "sixnations" ? `../src/assets/${match.home}.png` : `https://cdn.lnr.fr/club/${res[1][index]}/photo/logo-thumbnail-1x.b2c9984e11b81c4960a2d7763f7e73e7855a7511`} alt="" />
                    <h2>{route.pathname.split('/')[2] === "sixnations" ? res[1][index] :  match.home}</h2>
                  </div>
                  <span className="text-2xl px-5">{match.home_score}</span>
                </div>
                <span className="text-2xl my-auto">-</span>
                <div className="away flex flex-row items-center">
                  <span className="text-2xl px-5">{match.away_score}</span>
                  <div className="items-center flex flex-col">
                    <img className="w-lg h-28 mt-3" src={route.pathname.split('/')[2]  === "sixnations" ? `../src/assets/${match.away}.png` : `https://cdn.lnr.fr/club/${res[2][index]}/photo/logo-thumbnail-1x.b2c9984e11b81c4960a2d7763f7e73e7855a7511`} alt="" />
                    <h2>{route.pathname.split('/')[2] === "sixnations" ? res[2][index] :  match.away}</h2>
                  </div>
                </div>
              </div>
              {index === res[0].length - 1 && <Pagination length={dataMatches.length / res[0].length - 1} setWeek={setWeek} week={week} />}
            </div>
          ))
        )} */}
      </div>
    </div>
  )
}

export default Top14  