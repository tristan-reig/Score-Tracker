import { useState, useEffect } from "react";
import axios from "axios";
import Roster from "./Roster"
import MatchRow from "./MatchRow";

const Team = (props) => {
  const [data, setData] = useState(null);
  var current_leagues = []

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://scoretracker-9txj.onrender.com/search/team/${props.data.id}`);
        setData(response.data.message);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[props.data.id]);

  if (!data) {
      return <div className='loading loading-ring loading-lg'></div>;
  }

  if (props.data.players.length > 5) {
    const midIndex = Math.floor(props.data.players.length / 2);
    var firstPart = props.data.players.slice(0, midIndex);
    var secondPart = props.data.players.slice(midIndex);
  }


  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].series.length; j++) {
      if (data[i].series[j].end_at?.split('-')[0] == "2023" && !current_leagues.includes(data[i].image_url)) {
        current_leagues.push(data[i].image_url)
      }
    }
  }

  return (
    <div className="bg-gray-400 p-5">
      <div className='container-fluid'>
        <h2 className="text-xl text-gray-700 font-mono">Equipe</h2>
        <div className="p-5 top-content flex flex-col justify-center items-center">
          <div className="my-16 flex flex-row items-center">
            <img src={props.data.image_url} className="mx-8 w-lg h-40"></img>
            <h1 className="text-4xl font-['title'] uppercase text-gray-900 mx-8 tracking-[.15em]">{props.data.name}</h1>
          </div>
        </div>
        <div className="bg-gray-700 py-2 text-xl items-center justify-evenly flex flex-row">
          {current_leagues.map((league, index) => 
            <img key={index} className="w-lg h-16" src={league} alt="" />
          )}
        </div>
      </div>
      <h2 className="title text-xl text-gray-700 font-mono mt-10">Roster</h2>
      {props.data.players.length <= 6 ? 
        <div className="main-roster flex flex-row items-center justify-center">
        {props.data.players.map((_, index) => (
            <Roster key={index} index={index} items={props.data.players.length} players={props.data.players} position_array={["top", "jun", "mid", "adc", "sup"]} />
        ))}
      </div> : 
        <>
          <div className="main-roster flex flex-row items-center justify-center">
          {firstPart.map((_, index) => (
              <Roster key={index} items={props.data.players.length} index={index} players={firstPart} />
          ))}
          </div>
          <div className="main-roster flex flex-row items-center justify-center">
          {secondPart.map((_, index) => (
              <Roster key={index} items={props.data.players.length} index={index} players={secondPart} />
          ))}
          </div>
        </>
      }
      <div className="matches flex flex-col mt-10 container-sm">
        <h2 className="title text-xl text-gray-700 font-mono">Derniers matchs</h2>
        <div className="p-5">
          {[...Array(4).keys()].map((_, index) => (
            <MatchRow key={index} id={props.data.id} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Team