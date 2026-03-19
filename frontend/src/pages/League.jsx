import { API_URL } from '../api';
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import TeamCard from '../components/TeamCard'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import Select from '../components/Select'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import SkeletonTeamCard from '../components/SkeletonTeamCard'
import Bracket from '../components/Bracket'
import Carousel from '../components/Carousel'
import LeagueModal from '../components/LeagueModal'

const League = () => {
  const [currentTab, setCurrentTab] = useState("Teams")
  const [tournament, setTournament] = useState(null);
  const [bracketId, setBracketId] = useState(null);
  const [dataTeams, setDataTeams] = useState(null);
  const [dataStandings, setDataStandings] = useState(null);
  const [dataMatches, setDataMatches] = useState(null);
  const [week, setWeek] = useState(0);
  const [modalButtonId, setModalButtonId] = useState(1);
  const [queryParameters] = useSearchParams();
  const leagueId = queryParameters.get("id");
  const modalRef = useRef(null);
  var route = useLocation();
  let selectedTournament

  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await axios.get(`${API_URL}/league/${leagueId}/teams`)
        if (response.data[0].name === "Playoffs") {
          selectedTournament = response.data[1]
          setBracketId(response.data[0].id)
        } else {
          selectedTournament = response.data[0]
        }
        setTournament(selectedTournament);
        setDataTeams(selectedTournament.teams)
        response = await axios.get(`${API_URL}/league/${selectedTournament.id}/standings`)
        setDataStandings(response.data)
        response = await axios.get(`${API_URL}/league/${selectedTournament.id}/matches`)
        setDataMatches(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [leagueId]);

  const openModal = (buttonId) => {
    setModalButtonId(buttonId);
    modalRef.current.showModal();
  };

  if (!dataTeams || !dataStandings || !dataMatches) {
    return (
      <div className="mt-5">
        <Select currentTab={currentTab} setCurrentTab={setCurrentTab} live={false} disabled={true} />
        <SkeletonTeamCard length={10} column={4} />
      </div>
    )
  }

  return (
    <div className="pt-1 bg-gray-900">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} live={false} disabled={false} />
      <div className="border-t bg-base-100">
        {currentTab === "Teams" && (
          <div className="grid grid-cols-4 gap-4 p-5">
            {dataTeams.map((team, index) => (
              <TeamCard key={index} name={team.name} index={index} image={team.image_url} id={team.id} />
            ))}
          </div>
        )}
        {currentTab === "Standings" && (
          <Carousel>
            <div className="flex-col flex overflow-x-hidden p-5">
              <table className="w-full text-center text-sm font-light">
                <thead className="border-b font-medium">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-lg border-r">#</th>
                    <th scope="col" className="px-6 py-4 text-lg border-r">Equipe</th>
                    <th scope="col" className="px-6 py-4 text-lg border-r">Matchs Joués</th>
                    <th scope="col" className="px-6 py-4 text-lg border-r">Victoires - Défaites</th>
                    <th scope="col" className="px-6 py-4 text-lg">Points</th>
                  </tr>
                </thead>
                {dataStandings.map((team, index) => (
                  <tbody key={index} className={`${index === 0 && ""}`}>
                    <tr className="text-xl hover:bg-base-300 w-full">
                      <td className={`border-r ${index < 6 ? 'bg-blue-900 text-white' : `${route.pathname.split('/')[2] === "lec" && index < 8 ? "bg-blue-900" : ""}`}`}>
                        <span className={`px-2`}>{index + 1 === team.rank ? team.rank : "-"}&nbsp;</span>
                      </td>
                      <td className="text-left flex flex-row border-r relative pl-2 items-center">
                        <img className="w-lg h-10 m-1 p-1" src={team.team.image_url} alt="" />
                        <Link to={`/search?query=${team.team.id}`} className="hover:cursor-pointer hover:underline">{team.team.name}</Link>
                      </td>
                      <td className="border-r">{team.total}</td>
                      <td className="border-r">{team.wins} - {team.losses}</td>
                      <td className="">{team.wins}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
            {bracketId && (
              <div className='h-full'>
                <Bracket length={6} bracketId={bracketId}/>
              </div>
            )}
          </Carousel>
        )}
        {currentTab === "Matches" &&  (
          <div>
            {Array.from({length : 5 }).map((_, index) => (
              <div key={index}>
                <div className={`container mx-auto flex flex-row justify-center relative border-b p-2`}>
                  <div className="absolute top-0 left-0 pl-2 pt-1">
                    Jour {week + 1} - {dataMatches[week * 5 + index].league.name} - BO{dataMatches[week * 5 + index].number_of_games}
                  </div>
                  {dataMatches[week * 5 + index].status === "finished" && <div className="absolute inset-y-14 left-0">
                    <Link target='_blank' className="rounded-lg bg-cyan-400 hover:bg-cyan-500 text-black px-5 py-1.5">
                      VOD
                    </Link>
                  </div>}
                  <div className="absolute top-0 right-0 pr-2 pt-1">
                    {dataMatches[week * 5 + index].status === "not_started" && "Prochainement"}
                    {dataMatches[week * 5 + index].status === "running" && "En cours"}
                    {dataMatches[week * 5 + index].status === "finished" && "Terminé"}
                  </div>
                  <div className="absolute bottom-0 left-0 pl-2 pb-1">
                    {format(new Date(dataMatches[week * 5 + index].scheduled_at), 'HH:mm')}
                  </div>
                  {dataMatches[week * 5 + index].status === "finished" && <div className="absolute inset-y-14 right-0">
                    <button className="rounded-lg bg-amber-500 hover:bg-amber-600 text-black px-5 py-1.5" onClick={() => openModal(index+1)}>Détails</button>
                  </div>}
                  <div className="absolute bottom-0 right-0 pr-2 pb-1">
                    {dataMatches[week * 5 + index].scheduled_at.split('T')[0].split('-')[2] + " " + format(new Date(2023, dataMatches[week * 5 + index].scheduled_at.split('T')[0].split('-')[1] - 1, 1), 'MMMM', {locale: fr})}
                  </div>
                  <div className="home flex flex-row items-center">
                    <div className="items-center flex flex-col">
                      <img className={`w-24 h-lg mt-3 ${dataMatches[week * 5 + index].status === "finished" && dataMatches[week * 5 + index].results[0].score === 0 ? "brightness-50" : ""}`} src={dataMatches[week * 5 + index].opponents[0].opponent.image_url} title={dataMatches[week * 5 + index].opponents[0].opponent.name} alt="" />
                      <h2>{dataMatches[week * 5 + index].opponents[0].opponent.name}</h2>
                    </div>
                    <span className="text-2xl px-5">{dataMatches[week * 5 + index].results[0].score}</span>
                  </div>
                  <span className="text-2xl my-auto">-</span>
                  <div className="away flex flex-row items-center">
                    <span className="text-2xl px-5">{dataMatches[week * 5 + index].results[1].score}</span>
                    <div className="items-center flex flex-col">
                      <img className={`w-24 h-lg mt-3 ${dataMatches[week * 5 + index].status === "finished" && dataMatches[week * 5 + index].results[1].score === 0 ? "brightness-50" : ""}`} src={dataMatches[week * 5 + index].opponents[1].opponent.image_url} title={dataMatches[week * 5 + index].opponents[1].opponent.name} alt="" />
                      <h2>{dataMatches[week * 5 + index].opponents[1].opponent.name}</h2>
                    </div>
                  </div>
                </div>
                {index === 4 && (
                    <div className="flex items-center justify-center join py-5 pr-3">
                    {Array.from({length: dataMatches.length / 5}).map((_, index) => (
                      <button key={index} onClick={() => setWeek(index)} className={`join-item btn ${week === index && "btn-active"}`}>{index + 1}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {dataMatches[week * 5].status === "finished" &&
              <LeagueModal
                ref={modalRef}
                compName={tournament.league.name.split(' ').join('_') == "LVP_SL" ? "LVP_SuperLiga" : tournament.league.name.split(' ').join('_')}
                day={week + 1}
                matchIndex={modalButtonId}
                data={dataMatches[5 * week + modalButtonId - 1]}
                season={tournament.serie.season}
              />
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default League