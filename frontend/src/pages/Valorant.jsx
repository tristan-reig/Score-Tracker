import axios from 'axios'
import { useState, useEffect } from 'react'
import TeamCard from '../components/TeamCard'
import { useSearchParams } from 'react-router-dom'
import Select from '../components/Select'
import SkeletonTeamCard from '../components/SkeletonTeamCard'

const Valorant = () => {
  const [currentTab, setCurrentTab] = useState("Teams")
  const [dataTeams, setDataTeams] = useState(null)
  const [queryParameters] = useSearchParams()
  const leagueId = queryParameters.get("id")

  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await axios.get(`http://localhost:3001/valorant/${leagueId}/teams`)
        setDataTeams(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [leagueId]);

  if (!dataTeams) {
    return <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} live={true} disabled={true} />
      <SkeletonTeamCard length={11} column={4} />
    </div>
  }

  console.log(dataTeams)

  return (
    <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} live={true} disabled={false} />
      <div className="w-full border-t">
        {currentTab === "Teams" && (
          <div className="grid grid-cols-4 gap-4 p-5">
            {dataTeams.map((team, index) => (
              <TeamCard key={index} name={team.name} index={index} image={team.image_url} id={team.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Valorant