import axios from "axios";
import { format } from "date-fns";
import { fr } from 'date-fns/locale';
import { useEffect, useState } from "react"

const Matches = (props) => {
  const [data, setData] = useState(null)
  const res = []
  const home = []
  const away = []

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://rugby-live-data.p.rapidapi.com/fixtures/1230/2024',
          headers: {
            "X-RapidAPI-Key": "5b49c55b86msh81044d50006f92cp1421cfjsnc45ffb5ba491",
            "X-RapidAPI-Host": "rugby-live-data.p.rapidapi.com"
          }
        };
        const response = await axios.request(options);
        setData(response.data.results);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[]);

  if (!data) {
    return <div className='loading loading-ring loading-lg'></div>;
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].game_week === 10) {
      res.push(data[i])
    }
  }

  for (let i = 0; i < res.length; i++) {
    for (let j = 0; j < props.teams.length; j++) {
      if (res[i].home === props.teams[j].name) {
        home.push(props.clubs[j])
      } else if (res[i].away === props.teams[j].name) {
        away.push(props.clubs[j])
      }
    }
  }

  return (
    <div className="m-5">
      {res.map((match, index) => (
        <div key={index} className={`container mx-auto flex flex-row justify-center relative border-b p-2`}>
          <div className="absolute top-0 left-0 pl-2 pt-1">
            {match.comp_name} - Semaine {match.game_week} - {match.venue}
          </div>
          <div className="absolute top-0 right-0 pr-2 pt-1">
            {match.status === "Result" && "Terminé"}
            {match.status.includes("half") && "En cours"}
            {match.status === "Not Started" && "A venir"}
          </div>
          <div className="absolute bottom-0 left-0 pl-2 pb-1">
            {parseInt(match.date.split('T')[1].split('+')[0].split(':')[0]) + 1 + ":00"}
          </div>
          <div className="absolute bottom-0 right-0 pr-2 pb-1">
            {match.date.split('T')[0].split('-')[2] + " " + format(new Date(2023, 12 - 1, 1), 'MMMM', {locale: fr})}
          </div>
          <div className="home flex flex-row items-center">
            <div className="items-center flex flex-col">
              <img className="w-lg h-28 mt-3" src={`https://cdn.lnr.fr/club/${home[index]}/photo/logo-thumbnail-1x.b2c9984e11b81c4960a2d7763f7e73e7855a7511`} alt="" />
              <h2>{match.home} - {match.home_tries}E</h2>
            </div>
            <span className="text-2xl px-5">{match.home_score}</span>
          </div>
          <span className="text-2xl my-auto">-</span>
          <div className="away flex flex-row items-center">
            <span className="text-2xl px-5">{match.away_score}</span>
            <div className="items-center flex flex-col">
              <img className="w-28 h-28 mt-3" src={`https://cdn.lnr.fr/club/${away[index]}/photo/logo-thumbnail-1x.b2c9984e11b81c4960a2d7763f7e73e7855a7511`} alt="" />
              <h2>{match.away} - {match.away_tries}E</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Matches