import { useState, useEffect } from "react"
import axios from "axios";

const MatchRow = (props) => {
  const [dataMatch, setDataMatch] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://api.pandascore.co/matches/past',
          params: {
            'filter[opponent_id]' : props.id,
            page: props.index + 1,
            per_page: '1'
          },
          headers: {
            accept: 'application/json',
            authorization: 'Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes'
          }
        };
        const response = await axios.request(options);
        setDataMatch(response.data[0]);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[props.id, props.index]);

  if (!dataMatch) {
    return <div className='loading loading-ring loading-lg loading-black'></div>;
  }
  
  return (
    <div className="h-[90px] w-100 flex flex-row border-black border mx-64">
      <div className="infos flex w-[100px] items-center justify-center text-black font-bold text-md border-r border-black">
        <img src={dataMatch.league.image_url} className="w-lg h-lg" alt="" />
      </div>
      <div className="match flex flex-row items-center justify-center text-black text-center mx-auto">
        <div className="team-row flex flex-row justify-center align-items">
          <div className="team1 my-4 text-lg">{dataMatch.opponents[0].opponent.acronym}</div>
          <img className="m-2 w-12 h-12" src={dataMatch.opponents[0].opponent.image_url} alt="" />
        </div>
        <div className="result-score flex flex-row text-xl">
          <div className="p-1">{dataMatch.results[0].score}</div>
          <div className="p-1">-</div>
          <div className="p-1">{dataMatch.results[1].score}</div>
        </div>
        <div className="team-row flex flex-row justify-center align-items">
          <img className="m-2 w-12 h-12" src={dataMatch.opponents[1].opponent.image_url} alt="" />
          <div className="team2 my-4 text-lg">{dataMatch.opponents[1].opponent.acronym}</div>
        </div>
      </div>
    </div>
  )
}

export default MatchRow