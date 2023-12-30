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
        const response = await axios.request(props.options);
        setData(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[props.options]);

  if (!data) {
    return <div className='loading loading-ring loading-lg'></div>;
  }

  function setUpRugbyData () {
    for (let i = 0; i < data.results.length; i++) {
      if (data.results[i].game_week === 11) {
        res.push(data.results[i])
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
  }

  if (props.options.url.includes('rugby')) {setUpRugbyData()}

  console.log(data)

  return (
    <div className="p-5 relative">
      {props.options.url.includes('rugby') ? res.map((match, index) => (
        <div key={index} className="container mx-auto flex flex-row justify-center relative border-b p-2">
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
            {match.date.split('T')[0].split('-')[2] + " " + format(new Date(2023, match.date.split('T')[0].split('-')[1] - 1, 1), 'MMMM', {locale: fr})}
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
      )) : (
        Array.from({length : 5}).map((_, index) => (
          <div key={index} className="container mx-auto flex flex-row justify-center relative border-b p-2">
            <div className="absolute top-0 left-0 pl-2 pt-1">
                {data[index].league.name} - {data[index].tournament.name === "Regular Season" ? "Saison Régulière" : "Playoffs"} - BO{data[index].number_of_games}
              </div>
            <div className="absolute top-0 right-0 pr-2 pt-1">
              {data[index].status === "not_started" ? "Prochainement" : "En cours"}
            </div>
            <div className="absolute bottom-0 left-0 pl-2 pb-1">
              {parseInt(data[index].scheduled_at.split('T')[1].split('+')[0].split(':')[0]) + 1 + ":00"}
            </div>
            <div className="absolute bottom-0 right-0 pr-2 pb-1">
              {data[index].scheduled_at.split('T')[0].split('-')[2] + " " + format(new Date(2023, data[index].scheduled_at.split('T')[0].split('-')[1] - 1, 1), 'MMMM', {locale: fr})}
            </div>
            <div className="home flex flex-row items-center">
              <div className="items-center flex flex-row">
                <img className="w-lg h-24 mt-3" src={data[index].opponents[0].opponent.image_url} title={data[index].opponents[0].opponent.name} alt="" />
              </div>
              <span className="text-2xl px-5">{data[index].results[0].score}</span>
            </div>
            <span className="text-2xl my-auto">-</span>
            <div className="away flex flex-row items-center">
              <span className="text-2xl px-5">{data[index].results[0].score}</span>
              <div className="items-center flex flex-col">
                <img className="w-lg h-24 mt-3" src={data[index].opponents[1].opponent.image_url} title={data[index].opponents[1].opponent.name} alt="" />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Matches