import { API_URL } from '../api';
import axios from "axios";
import { useEffect, useRef, useState } from "react"
import TeamCard from "../components/TeamCard";
import Select from "../components/Select"
import SkeletonTeamCard from "../components/SkeletonTeamCard";
import Pagination from "../components/Pagination";
import StandingsContainer from "../components/StandingsContainer";
import { useLocation } from "react-router-dom";
import RugbyModal from "../components/RugbyModal";

const Rugby = () => {
  const [currentTab, setCurrentTab] = useState("Teams");
  const [dataTeams, setDataTeams] = useState(null);
  const [dataStandings, setDataStandings] = useState(null);
  const [dataMatches, setDataMatches] = useState(null);
  const [week, setWeek] = useState(0);
  const [modalButtonId, setModalButtonId] = useState(0);
  const modalRef = useRef(null);
  var route = useLocation();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await axios.get(`${API_URL}/rugby/${route.pathname.split('/')[2]}/teams`);
        setDataTeams(response.data);
        response = await axios.get(`${API_URL}/rugby/${route.pathname.split('/')[2]}/${route.pathname.includes('cup') ? 'groups' : 'standings'}`);
        setDataStandings(response.data);
        response = await axios.get(`${API_URL}/rugby/${route.pathname.split('/')[2]}/matches`);
        setDataMatches(response.data);
        setWeek(Object.keys(response.data)[0])
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[route, setWeek]);

  if (!dataTeams || !dataStandings || !dataMatches) {
    return <div>
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} disabled={true} />
      <SkeletonTeamCard length={14} column={5} />
    </div>
  }
  
  const openModal = (buttonId) => {
    setModalButtonId(buttonId);
    modalRef.current.showModal();
  };

  return (
    <div>
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
          <div className="w-full">
            {!Object.keys(dataStandings)[0].includes('Groupe') ? (
              <div className="flex flex-col relative w-full">
                <StandingsContainer comp={route.pathname.split('/')[2]} type="g" title="Saison Régulière">
                  <tbody>
                    {Object.keys(dataStandings).map((team, index) => (
                      <tr key={index} className='text-xl hover:bg-base-300'>
                        <td className={`border-r ${index < 6 ? 'bg-blue-900 text-white' : ''} 
                          ${index < 2 ? 'bg-blue-950' : ''} 
                          ${index === Object.keys(dataStandings).length - 2 ? 'bg-red-900' : ''} 
                          ${index === Object.keys(dataStandings).length - 1 ? 'bg-red-950' : ''}`}>{index + 1}</td>
                        <td className={`text-left flex flex-row relative pl-2 items-center ${route.pathname.split('/')[2] === "top14" ? "" : "border-r"}`}>
                          <img className="w-10 p-1" src={dataStandings[team][0]} alt="" />
                          <span className="hover:cursor-pointer hover:underline">{team}</span>
                        </td>
                        {route.pathname.split('/')[2] === 'top14' && (
                          <td className="border-r border-l">
                            <img 
                              className="w-10 flex mx-auto" 
                              src={dataStandings[team][7].includes("Challenge") ? "https://upload.wikimedia.org/wikipedia/fr/6/69/Logo_Challenge_Cup_2021.png" : "https://upload.wikimedia.org/wikipedia/fr/9/9a/Logo_Champions_Cup_2018.png"} 
                              alt="" 
                              title={dataStandings[team][7]}
                            />
                          </td>
                        )}
                        <td className="border-r">{dataStandings[team][2]}</td>
                        <td className="border-r">{dataStandings[team][3]} - {dataStandings[team][4]} - {dataStandings[team][5]}</td>
                        <td className="border-r">{dataStandings[team][6]}</td>
                        <td>{dataStandings[team][1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </StandingsContainer>
              </div>
            ) : (
              <div className="grid grid-cols-4">
                {Object.keys(dataStandings).map((group, indexG) => (
                  <table className={`w-5/6 border text-white m-5 table-auto mx-auto col-span-2 ${Object.keys(dataStandings).length === 3 && indexG === 2 ? "col-start-2" : ""}`} key={indexG}>
                    <colgroup span='3'></colgroup>
                    <thead className="bg-black">
                      <tr>
                        <th colSpan="4" scope='colgroup' className='text-xl p-2'>Groupe {['A', 'B', 'C', 'D'][indexG]}</th>
                      </tr>
                      <tr>
                        <th className="border">#</th>
                        <th className="border border-b-0">Equipe</th>
                        <th className="border">V-D</th>
                        <th className="border">Points</th>
                      </tr>
                    </thead>
                    <tbody className='bg-gray-700'>
                      {dataStandings[group].map((team, indexT) => (
                       <tr key={indexT} className="hover:bg-gray-800">
                          <th className={`border p-2 ${indexT < 4 ? 'bg-green-700' : `${indexT == 4 && route.pathname.includes('champions') ? 'bg-amber-500' : 'bg-red-700'}`}`}>{indexT + 1}</th>
                          <th className={`border-t p-2 flex items-center`}>
                            <img className='w-lg h-10 mx-3' alt="img" src={team[5]}/>
                            <span>{team[0]}</span>
                          </th>
                          <th className='border p-2'>{team[2]} - {team[3]}</th>
                          <th className='border'>{team[4]}</th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ))}
              </div>
            )}
          </div>
        )}
        {currentTab === "Matches" && (
          <div>
            {Array.from({length : Object.keys(dataMatches[week]["home"]).length}).map((_, index) => (
            <div key={index}>
              <div className="container mx-auto flex flex-row justify-center items-center relative p-2 border-b">
                <div className="absolute bottom-50 left-0 pr-2 pb-1">
                  <div>Semaine {week}</div>
                  <div>{dataMatches[week]["infos"][index][0].charAt(0).toUpperCase() + dataMatches[week]["infos"][index][0].slice(1)}</div>
                  <div>{dataMatches[week]["infos"][index][1].includes('h') && dataMatches[week]["infos"][index][1]}</div>
                </div>
                <div className="absolute bottom-50 right-0 pr-2 pb-1">
                  {dataMatches[week]["infos"][index][2] && <button className="btn bg-amber-600 hover:bg-amber-500 text-black" onClick={() => openModal(index)}>Détails</button>}
                </div>
                <div className="home flex flex-row items-center px-6">
                  <div className="items-center flex flex-col">
                    <img className="h-28 mt-3" src={dataMatches[week]["home"][index][1]} alt="Image Equipe 1" />
                    <h2>{dataMatches[week]["home"][index][0]}</h2>
                  </div>
                  <span className="text-2xl px-5">{!dataMatches[week]["infos"][index][1].includes('h') ? dataMatches[week]["infos"][index][1].split('-')[0] : 0}</span>
                </div>
                <span className="text-2xl my-auto">-</span>
                <div className="away flex flex-row items-center px-6">
                  <span className="text-2xl px-5">{!dataMatches[week]["infos"][index][1].includes('h') ? dataMatches[week]["infos"][index][1].split('-')[1] : 0}</span>
                  <div className="items-center flex flex-col">
                    <img className="h-28 mt-3" src={dataMatches[week]["away"][index][1]} alt="Image Equipe 2" />
                    <h2>{dataMatches[week]["away"][index][0]}</h2>
                  </div>
                </div>
              </div>
              {index === Object.keys(dataMatches[week]["home"]).length - 1 && (
                <Pagination length={(Object.keys(dataTeams).length - 1) * 2} setWeek={setWeek} week={week} setDataMatches={setDataMatches} />)
              }
            </div>
            ))}
            {dataMatches[week]["infos"][modalButtonId][2] && (
              <RugbyModal teams={dataMatches[week]} ref={modalRef} matchIndex={modalButtonId} id={dataMatches[week]["infos"][modalButtonId][2]} week={week} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Rugby  