import axios from 'axios'
import { useState, useEffect } from 'react'
import TeamCard from '../components/TeamCard'
import { useSearchParams } from 'react-router-dom'
import Select from '../components/Select'
import SkeletonTeamCard from '../components/SkeletonTeamCard'
import StandingsContainer from "../components/StandingsContainer";

const Valorant = () => {
  const [currentTab, setCurrentTab] = useState("Teams")
  const [dataTeams, setDataTeams] = useState(null)
  const [dataGroups, setDataGroups] = useState(null)
  const [queryParameters] = useSearchParams()
  const leagueId = queryParameters.get("id")

  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await axios.get(`http://localhost:3001/valorant/${leagueId}/teams`)
        setDataTeams(response.data)
        response = await axios.get(`http://localhost:3001/valorant/${leagueId}/groups`)
        setDataGroups(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [leagueId]);

  if (!dataTeams || !dataGroups) {
    return <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} live={true} disabled={true} />
      <SkeletonTeamCard length={11} column={4} />
    </div>
  }

  console.log(dataGroups)

  return (
    <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} disabled={false} />
      <div className="w-full border-t">
        {currentTab === "Teams" && (
          <div className="grid grid-cols-4 gap-4 p-5">
            {dataTeams.map((team, index) => (
              <TeamCard key={index} name={team.name} index={index} image={team.image_url} id={team.id} />
            ))}
          </div>
        )}
        {currentTab === "Standings" && (
          <div className="carousel w-full">
            <div id='slide1' className="flex flex-col overflow-x-hidden p-5 carousel-item relative w-full border">
              <div className="flex flex-col text-2xl text-center mb-10">EMEA Kickoff /  Phases de groupes</div>
              <div className="grid grid-cols-1" style={{gridTemplateColumns: "1fr 1fr"}}>
                {Object.keys(dataGroups).map((group, indexG) => (
                  <table className='Groupe-A w-5/6 border text-white m-5' key={indexG}>
                    <colgroup span='3'></colgroup>
                    <thead>
                      <tr>
                        <th colSpan="3" scope='colgroup' className='text-xl p-2 bg-black'>Groupe {['A', 'B', 'C'][indexG]}</th>
                      </tr>
                    </thead>
                    <tbody className='border'>
                      {dataGroups[group].map((team, indexT) => (
                        <tr key={indexT} className={team.rank === 1 ? "bg-green-900" : `${team.rank === 2 ? "bg-yellow-900" : "bg-red-900"}`}>
                          <th className='border p-2'>{indexT + 1}</th>
                          <th className='border p-2 flex items-center'>
                            <img className='w-lg h-10 mx-3' 
                              src={indexT === 0 ? dataGroups[group][dataGroups[group].length - 1].team.image_url : dataGroups[group][indexT - 1].team.image_url} 
                            />
                            <span>
                              {indexT === 0 ?
                              dataGroups[group][dataGroups[group].length - 1].team.name :
                              dataGroups[group][indexT - 1].team.name
                              }
                            </span>
                          </th>
                          <th className='border p-2'>V - D</th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ))}
              </div>
            </div>
            <div className="absolute flex justify-between right-5 top-3/4">
              <a href="#slide2" className="btn btn-circle">{">"}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Valorant