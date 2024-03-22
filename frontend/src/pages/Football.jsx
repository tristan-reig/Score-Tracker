import axios from "axios";
import { useEffect, useState } from "react"
import Select from "../components/Select"
import TeamCard from "../components/TeamCard";
import SkeletonTeamCard from "../components/SkeletonTeamCard";
import StandingsContainer from "../components/StandingsContainer";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";

const Ligue1 = () => {
  const [currentTab, setCurrentTab] = useState("Teams")
  const [dataTeams, setDataTeams] = useState(null)
  const [dataStandings, setDataStandings] = useState(null)
  const [dataMatches, setDataMatches] = useState(null)
  const [week, setWeek] = useState(0)
  const route = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await axios.request(`http://localhost:3001/football/${route.pathname.split('/')[2]}/teams`);
        setDataTeams(response.data);
        response = await axios.request(`http://localhost:3001/football/${route.pathname.split('/')[2]}/standings`);
        setDataStandings(response.data);
        response = await axios.request(`http://localhost:3001/football/${route.pathname.split('/')[2]}/matches`);
        setDataMatches(response.data);
        setWeek(Object.keys(response.data)[0])
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[]);

  console.log(dataMatches)

  if (!dataTeams) {
    return <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} disabled={true} />
      <SkeletonTeamCard length={20} column={5} />
    </div>
  }
  
  return (
    <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} disabled={false} />
      <div className="w-full border-t relative">
        {currentTab === "Teams" && (
          <div className={`grid grid-cols-5 gap-4 p-5`}>
            {Object.keys(dataTeams).map((team, index) => (
              <TeamCard
                key={index}
                name={team.replace(/\b\d+\b|\b(?:Fc|Sc|Rc)\b/g, '').trim()}
                index={index}
                image={dataTeams[team][0]}
                color={dataTeams[team][1]}
              />
            ))}
          </div>
        )}
        {currentTab === "Standings" && (
          <div className="flex flex-col overflow-x-hidden p-5">
            <StandingsContainer>
            <tbody>
              {Object.keys(dataStandings).map((team, index) => (
                <tr key={index} className='text-xl hover:bg-base-300'>
                  <td className={`border-r`}>{index + 1}</td>
                  <td className={`text-left flex flex-row relative pl-2 items-center border-r`}>
                    <img className="w-10 p-1" src={dataStandings[team][0]} alt="" />
                    <span className="hover:cursor-pointer hover:underline">{team.split(' ').map(word => isNaN(word) && word[0] + word.slice(1).toLowerCase().trim() + ' ')}</span>
                  </td>
                  <td className="border-r">{dataStandings[team][2]}</td>
                  <td className="border-r">{`${dataStandings[team][3]} - ${dataStandings[team][4]} - ${dataStandings[team][5]}`}</td>
                  <td>{dataStandings[team][1]}</td>
                </tr>
              ))}
            </tbody>
            </StandingsContainer>            
          </div>
        )}
        {currentTab === "Matches" && (
          Array.from({length : Object.keys(dataMatches[week]["home"]).length}).map((_, index) => (
            <div key={index}>
              <div className="container mx-auto flex flex-row justify-center items-center relative p-2 border-b">
                <div className="absolute bottom-50 left-0 pr-2 pb-1">
                  <div>Semaine {week}</div>
                  <div>{dataMatches[week]["infos"][index][0].charAt(0) + dataMatches[week]["infos"][index][0].slice(1).toLowerCase()}</div>
                  <div>{dataMatches[week]["infos"][index][1].includes(':') && dataMatches[week]["infos"][index][1]}</div>
                </div>
                <div className="home flex flex-row items-center px-6">
                  <div className="items-center flex flex-col">
                    <img className="h-28 mt-3" src={dataMatches[week]["home"][index][1]} alt="Image Equipe 1" />
                    <h2>{dataMatches[week]["home"][index][0].split(' ').map(word => isNaN(word) && word[0] + word.slice(1).toLowerCase() + ' ')}</h2>
                  </div>
                  <span className="text-2xl px-5">{!dataMatches[week]["infos"][index][1].includes(':') ? dataMatches[week]["infos"][index][1].split('-')[0] : 0}</span>
                </div>
                <span className="text-2xl my-auto">-</span>
                <div className="away flex flex-row items-center px-6">
                  <span className="text-2xl px-5">{!dataMatches[week]["infos"][index][1].includes(':') ? dataMatches[week]["infos"][index][1].split('-')[1] : 0}</span>
                  <div className="items-center flex flex-col">
                    <img className="h-28 mt-3" src={dataMatches[week]["away"][index][1]} alt="Image Equipe 2" />
                    <h2>{dataMatches[week]["away"][index][0].split(' ').map(word => isNaN(word) && word[0] + word.slice(1).toLowerCase() + ' ')}</h2>
                  </div>
                </div>
              </div>
              {index === Object.keys(dataMatches[week]["home"]).length - 1 && (
                <Pagination 
                  length={(Object.keys(dataTeams).length - 1) * 2} 
                  setWeek={setWeek}
                  week={week}
                  setDataMatches={setDataMatches} 
                />
              )}
            </div>
          ))
        )}
        </div>
    </div>
  )
}

export default Ligue1