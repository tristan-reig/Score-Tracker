import axios from "axios";
import { useEffect, useState } from "react"
import TeamCard from "../components/TeamCard";
import Select from "../components/Select"
import SkeletonTeamCard from "../components/SkeletonTeamCard";
import Pagination from "../components/Pagination";
import StandingsContainer from "../components/StandingsContainer";
import { useLocation } from "react-router-dom";

const Top14 = () => {
  const [currentTab, setCurrentTab] = useState("Teams")
  const [dataTeams, setDataTeams] = useState(null);
  const [dataStandings, setDataStandings] = useState(null)
  const [dataMatches, setDataMatches] = useState(null)
  const [week, setWeek] = useState(0)
  var route = useLocation()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await axios.request(`http://localhost:3001/rugby/teams`);
        setDataTeams(response.data);
        response = await axios.request(`http://localhost:3001/rugby/standings`);
        setDataStandings(response.data);
        response = await axios.get(`http://localhost:3001/rugby/matches`);
        setDataMatches(response.data);
        setWeek(Object.keys(response.data)[0])
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[]);

  if (!dataTeams || !dataStandings || !dataMatches) {
    return <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} disabled={true} />
      <SkeletonTeamCard length={14} column={5} />
    </div>
  }
  
  return (
    <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} disabled={false} />
      <div className="w-full border-t relative">
        {currentTab === "Teams" && (
          <div className={`grid grid-cols-${Math.floor(Object.keys(dataTeams).length / 3) + 1} gap-4 p-5`}>
            {Object.keys(dataTeams).map((club, index) => (
              <TeamCard 
                key={index} 
                name={club} 
                index={index} 
                image={dataTeams[club]}
                id={''} 
              />
            ))}
          </div>
        )}
        {currentTab === "Standings" && (
          <div className="w-full carousel">
            <div id='classementG' className="flex flex-col carousel-item relative w-full">
              <StandingsContainer>
                <tbody>
                  {Object.keys(dataStandings).map((team, index) => (
                    <tr key={index} className={`text-xl hover:bg-base-300 ${index === 0 ? "bg-gradient-to-r from-gold1 via-gold2 to-gold3 text-black" : `bg-base-100`} ${index === 1 ? "bg-gradient-to-r from-silver1 to-silver2 text-black" : `bg-base-100`} ${index === 2 ? "bg-gradient-to-r from-bronze1 to-bronze2 text-black" : `bg-base-100`}`}>
                      <td className="text-left flex flex-row border-r relative pl-2 items-center">
                        <span>{index + 1}&nbsp;</span>
                        <img className="w-10 p-1" src={dataStandings[team][0]} alt="" />
                        <span className="hover:cursor-pointer hover:underline">{team}</span>
                      </td>
                      <td className="border-r">{dataStandings[team][2]}</td>
                      <td className="border-r">{dataStandings[team][3]} - {dataStandings[team][4]} - {dataStandings[team][5]}</td>
                      <td className="border-r">{dataStandings[team][6]}</td>
                      <td>{dataStandings[team][1]}</td>
                    </tr>
                  ))}
                </tbody>
              </StandingsContainer>
              {route.pathname.split('/')[2] === "top14" && route.pathname && <div className="absolute flex justify-between right-10 top-1/2">
                <a href="#classementB" className="btn btn-circle">{">"}</a>
              </div>}
            </div>
            {route.pathname.split('/')[2] === "top14" && <div id='classementB' className="flex flex-col overflow-x-hidden p-5 carousel-item relative w-full">
              <StandingsContainer>

              </StandingsContainer>
              <div className="absolute flex justify-between left-5 top-1/2">
                <a href="#classementG" className="btn btn-circle">{"<"}</a>
              </div>
            </div>}
          </div>
        )}
        {currentTab === "Matches" && (
          Array.from({length : 7}).map((_, index) => (
            <div key={index}>
              <div className="container mx-auto flex flex-row justify-center items-center relative p-2 border-b">
                <div className="absolute bottom-50 left-0 pr-2 pb-1">
                  <div>Semaine {week}</div>
                  <div>{dataMatches[week]["infos"][index][0].charAt(0).toUpperCase() + dataMatches[week]["infos"][index][0].slice(1)}</div>
                </div>
                <div className="absolute bottom-50 right-0 pr-2 pb-1">
                  Résumé
                </div>
                <div className="home flex flex-row items-center px-6">
                  <div className="items-center flex flex-col">
                    <img className="h-28 mt-3" src={dataMatches[week]["home"][index][1]} alt="Image Equipe 1" />
                    <h2>{dataMatches[week]["home"][index][0]}</h2>
                  </div>
                  <span className="text-2xl px-5">{dataMatches[week]["infos"][index][1].split('-')[0]}</span>
                </div>
                <span className="text-2xl my-auto">-</span>
                <div className="away flex flex-row items-center px-6">
                  <span className="text-2xl px-5">{dataMatches[week]["infos"][index][1].split('-')[1]}</span>
                  <div className="items-center flex flex-col">
                    <img className="h-28 mt-3" src={dataMatches[week]["away"][index][1]} alt="Image Equipe 2" />
                    <h2>{dataMatches[week]["away"][index][0]}</h2>
                  </div>
                </div>
              </div>
              {index === 6 && <Pagination length={26} setWeek={setWeek} week={week} />}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Top14  