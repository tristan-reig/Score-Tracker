import axios from 'axios'
import { useState, useEffect } from 'react'
import TeamCard from '../components/TeamCard'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import Select from '../components/Select'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Skeleton from '../components/Skeleton'
import Bracket from '../components/Bracket'
import Pagination from '../components/Pagination'

const League = () => {
  const [currentTab, setCurrentTab] = useState("Teams")
  const [dataTeams, setDataTeams] = useState(null)
  const [dataStandings, setDataStandings] = useState(null)
  const [dataMatches, setDataMatches] = useState(null)
  const [week, setWeek] = useState(0)
  const [queryParameters] = useSearchParams()
  const leagueId = queryParameters.get("id")
  var route = useLocation()
  var teams = ""

  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await axios.get(`https://scoretracker-9txj.onrender.com/${leagueId}/teams`)
        setDataTeams(response.data.message)
        var tournamentId = response.data.message[0].id
        response = await axios.get(`https://scoretracker-9txj.onrender.com/${tournamentId}/standings`)
        setDataStandings(response.data.message)
        response = await axios.get(`https://scoretracker-9txj.onrender.com/${tournamentId}/matches`)
        setDataMatches(response.data.message)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [leagueId]);

  if (!dataTeams || !dataStandings) {
    return <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} live={true} disabled={true} />
      <Skeleton length={10} column={4} />
    </div>
  }


  for (let i = 0; i < dataTeams.length; i++) {
    if (dataTeams[i]["begin_at"].includes("2024")) {
      teams = dataTeams[i].teams
    }
  }

  return (
    <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} live={true} disabled={false} />
      <div className="w-full border-t">
        {currentTab === "Teams" && (
          <div className="grid grid-cols-4 gap-4 p-5">
            {teams.map((team, index) => (
              <TeamCard key={index} name={team.name} index={index} image={team.image_url} id={team.id} />
            ))}
          </div>
        )}
        {currentTab === "Standings" && (
          <div className="carousel w-full">
            <div id='slide1' className="flex flex-col overflow-x-hidden p-5 carousel-item relative w-full">
              <div className="2xl:mx-8">
                <div className="inline-block min-w-full py-2 2xl:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-center text-sm font-light">
                      <thead className="border-b font-medium">
                        <tr>
                          <th scope="col" className="px-6 py-4 text-lg border-r">#</th>
                          <th scope="col" className="px-6 py-4 text-lg border-r">Equipe</th>
                          <th scope="col" className="px-6 py-4 text-lg border-r">Matchs Joués</th>
                          <th scope="col" className="px-6 py-4 text-lg border-r">Victoires - Défaites</th>
                          <th scope="col" className="px-6 py-4 text-lg border-r">Points</th>
                        </tr>
                      </thead>
                      {dataStandings.map((team, index) => (
                        <tbody key={index} className={`${index === 0 && ""}`}>
                          <tr className="text-xl hover:bg-base-300 w-full">
                            <td className='border-r'>
                              {index + 1 === team.rank ? team.rank : "-"}&nbsp;
                            </td>
                            <td className="text-left flex flex-row border-r relative pl-2 items-center">
                              <img className="w-lg h-10 m-1 p-1" src={team.team.image_url} alt="" />
                              <Link to={`/search?query=${team.team.id}`} className="hover:cursor-pointer hover:underline">{team.team.name}</Link>
                            </td>
                            <td className="border-r">{team.total}</td>
                            <td className="border-r">{team.wins} - {team.losses}</td>
                            <td className="border-r">{team.wins}</td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
              {route.pathname.split('/')[2] === "lfl" && route.pathname && <div className="absolute flex justify-between right-10 top-1/2">
                <a href="#slide2" className="btn btn-circle">{">"}</a>
              </div>}
            </div>
            {route.pathname.split('/')[2] === "lfl" && <div id='slide2' className="flex flex-col overflow-x-hidden p-5 carousel-item relative w-full">
              <Bracket />
              <div className="absolute flex justify-between left-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">{"<"}</a>
              </div>
            </div>}
          </div>
        )}
        {currentTab === "Matches" && (
          Array.from({length : 5 }).map((_, index) => (
            <div key={index}>
              <div className={`container mx-auto flex flex-row justify-center relative border-b p-2`}>
                <div className="absolute top-0 left-0 pl-2 pt-1">
                    {dataMatches[week * 5 + index].league.name} - BO{dataMatches[week * 5 + index].number_of_games}
                  </div>
                <div className="absolute top-0 right-0 pr-2 pt-1">
                  {dataMatches[week * 5 + index].status === "not_started" && "Prochainement"}
                  {dataMatches[week * 5 + index].status === "running" && "En cours"}
                  {dataMatches[week * 5 + index].status === "finished" && "Terminé"}
                </div>
                <div className="absolute bottom-0 left-0 pl-2 pb-1">
                  {parseInt(dataMatches[week * 5 + index].scheduled_at.split('T')[1].split('+')[0].split(':')[0]) + 1 + ":00"}
                </div>
                <div className="absolute bottom-0 right-0 pr-2 pb-1">
                  {dataMatches[week * 5 + index].scheduled_at.split('T')[0].split('-')[2] + " " + format(new Date(2023, dataMatches[week * 5 + index].scheduled_at.split('T')[0].split('-')[1] - 1, 1), 'MMMM', {locale: fr})}
                </div>
                <div className="home flex flex-row items-center">
                  <div className="items-center flex flex-row">
                    <img className={`w-lg h-24 mt-3 ${dataMatches[week * 5 + index].status === "finished" && dataMatches[week * 5 + index].results[0].score === 0 ? "brightness-50" : ""}`} src={dataMatches[week * 5 + index].opponents[0].opponent.image_url} title={dataMatches[week * 5 + index].opponents[0].opponent.name} alt="" />
                  </div>
                  <span className="text-2xl px-5">{dataMatches[week * 5 + index].results[0].score}</span>
                </div>
                <span className="text-2xl my-auto">-</span>
                <div className="away flex flex-row items-center">
                  <span className="text-2xl px-5">{dataMatches[week * 5 + index].results[1].score}</span>
                  <div className="items-center flex flex-col">
                  <img className={`w-lg h-24 mt-3 ${dataMatches[week * 5 + index].status === "finished" && dataMatches[week * 5 + index].results[1].score === 0 ? "brightness-50" : ""}`} src={dataMatches[week * 5 + index].opponents[1].opponent.image_url} title={dataMatches[week * 5 + index].opponents[1].opponent.name} alt="" />
                  </div>
                </div>
              </div>
              {index === 4 && <Pagination length={dataMatches.length / 5} setWeek={setWeek} week={week} />}
            </div>
          ))
        )}
        {currentTab === "Live" && (
          <div className='flex flex-row'>
            <iframe src="https://player.twitch.tv/?channel=otplol_&parent=localhost" allowFullScreen={true} height={"650"} width={"1200"}></iframe>
            <iframe id="chat_embed" src="https://www.twitch.tv/embed/otplol_/chat?parent=localhost&darkpopout" height={"650"} width={window.screen.width - "1200"}></iframe>
          </div>
        )}
      </div>
    </div>
  )
}

export default League