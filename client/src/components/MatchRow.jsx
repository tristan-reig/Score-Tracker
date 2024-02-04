import { useState, useEffect } from "react"
import axios from "axios";

const MatchRow = (props) => {
  const [dataMatch, setDataMatch] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://scoretracker-c2xt.onrender.com/pastMaches?id=${props.id}&index=${props.index + 1}`);
        setDataMatch(response.data.message[0]);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[props.id, props.index]);

  if (!dataMatch) {
    return (
      <div className="h-[90px] w-100 flex flex-row border-black border mx-64">
        <div className="infos flex w-[100px] items-center justify-center text-black font-bold text-md border-r border-black">
          <div className="loading loading-dots"></div>
        </div>
        <div className="match flex flex-row items-center justify-center text-black text-center mx-auto">
          <div className="team-row flex flex-row justify-center align-items">
            <div className="team1 my-4 text-lg">TBD</div>
            <div className="loading loading-dots m-5"></div>
          </div>
          <div className="result-score flex flex-row text-xl">
            <div className="p-1">0</div>
            <div className="p-1">-</div>
            <div className="p-1">0</div>
          </div>
          <div className="team-row flex flex-row justify-center align-items">
            <div className="loading loading-dots m-5"></div>
            <div className="team2 my-4 text-lg">TBD</div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
      <div className="h-[90px] w-100 flex flex-row border-black border mx-64">
        <div className="infos flex w-[100px] items-center justify-center text-black font-bold text-md border-r border-black">
          <img src={dataMatch.league.image_url} className="px-5" alt="" />
        </div>
        <div className="match flex flex-row items-center justify-center text-black text-center mx-auto">
          <div className="team-row flex flex-row justify-center align-items">
            <div className="team1 my-4 text-lg">{dataMatch.opponents[0].opponent.acronym}</div>
            <img className="m-2 w-lg h-12" src={dataMatch.opponents[0].opponent.image_url} alt="" />
          </div>
          <div className="result-score flex flex-row text-xl">
            <div className="p-1">{dataMatch.results[0].score}</div>
            <div className="p-1">-</div>
            <div className="p-1">{dataMatch.results[1].score}</div>
          </div>
          <div className="team-row flex flex-row justify-center align-items">
            <img className="m-2 w-lg h-12" src={dataMatch.opponents[1].opponent.image_url} alt="" />
            <div className="team2 my-4 text-lg">{dataMatch.opponents[1].opponent.acronym}</div>
          </div>
        </div>
      </div>
  )
}

export default MatchRow