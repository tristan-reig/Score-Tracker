import axios from 'axios'
import { useState, useEffect } from 'react'
import TeamCard from '../components/TeamCard'
import { useSearchParams } from 'react-router-dom'
import Matches from '../components/Matches'

const League = () => {
  const [currentTab, setCurrentTab] = useState("Matches")
  const [data, setData] = useState(null)
  const [queryParameters] = useSearchParams()
  const id = queryParameters.get("id")
  var teams = ""
  const options = {
    method: 'GET',
    url: `https://api.pandascore.co/leagues/${id}/matches/upcoming`,
    headers: {
      accept: 'application/json',
      authorization: 'Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          url: `https://api.pandascore.co/leagues/${id}/tournaments`,
          headers: {
            accept: 'application/json',
            authorization: 'Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes'
          }
        };
        const response = await axios.request(options);
        setData(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[id]);

  if (!data) {
    return <div className='loading loading-ring loading-lg'></div>;
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].serie.year === 2024) {
      teams = data[i].teams
    }
  }

  return (
    <div className="mt-5">
      <div className="flex flex-row items-center text-center justify-around gap-4">
        <div className={`element border w-full p-5 text-xl border-b-0 cursor-pointer hover:bg-black ${currentTab === "Teams" ? "bg-black" : ""}`} onClick={() => setCurrentTab("Teams")}>Equipes</div>
        <div className={`element border w-full p-5 text-xl border-b-0 cursor-pointer hover:bg-black ${currentTab === "Standings" ? "bg-black" : ""}`} onClick={() => setCurrentTab("Standings")}>Classement</div>
        <div className={`element border w-full p-5 text-xl border-b-0 cursor-pointer hover:bg-black ${currentTab === "Matches" ? "bg-black" : ""}`} onClick={() => setCurrentTab("Matches")}>Prochains matchs</div>
      </div>
      <div className="w-full border">
        {currentTab === "Teams" && (
          <div className="grid grid-cols-4 gap-4 p-5">
            {teams.map((team, index) => (
              <TeamCard key={index} name={team.name} index={index} image={team.image_url} id={team.id} />
            ))}
          </div>
        )}
        {currentTab === "Standings" && (
          <div>Standings</div>
        )}
        {currentTab === "Matches" && (
          <Matches options={options} />
        )}
      </div>
    </div>
  )
}

export default League