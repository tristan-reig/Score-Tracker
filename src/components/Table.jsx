import axios from "axios";
import { useEffect, useState } from "react";

const Table = (props) => {
  const [data, setData] = useState(null)
  const ind = []
  const res = []

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://rugby-live-data.p.rapidapi.com/standings/1230/2024',
          headers: {
            "X-RapidAPI-Key": "5b49c55b86msh81044d50006f92cp1421cfjsnc45ffb5ba491",
            "X-RapidAPI-Host": "rugby-live-data.p.rapidapi.com"
          }
        };
        const response = await axios.request(options);
        setData(response.data.results.standings[0].teams);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[]);

  if (!data) {
    return <div className='loading loading-ring loading-lg'></div>;
  }

  for (let i = 0; i < props.teams.length; i++) {
    for (let j = 0; j < props.teams.length; j++) {
      if (data[i].name == props.teams[j].name) {
        ind.push(j)
      }
    }
  }

  for (let i of ind) {
    res.push(props.clubs[i])
  }

  return (
    <div className="flex flex-col overflow-x-hidden p-5">
      <div className="2xl:mx-8">
        <div className="inline-block min-w-full py-2 2xl:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b font-medium">
                <tr>
                  <th scope="col" className="px-6 py-4 text-lg border-r">Equipe</th>
                  <th scope="col" className="px-6 py-4 text-lg border-r">Matchs Joués</th>
                  <th scope="col" className="px-6 py-4 text-lg border-r">Victoires - Défaites</th>
                  <th scope="col" className="px-6 py-4 text-lg">Points</th>
                </tr>
              </thead>
              {data.map((team, index) => (
                <tbody key={index} className="">
                  <tr className='text-xl hover:bg-base-300'>
                    <td className="text-left flex flex-row border-r">
                      <span>{team.position}&nbsp;</span>
                      <img className="w-10 h-lg p-1" src={`https://cdn.lnr.fr/club/${res[index]}/photo/logo.bf3916f6c3950e6f8db29a8382a5f08159c542ad`} alt="" />
                      <span className="hover:cursor-pointer">&nbsp;{team.name}</span>
                    </td>
                    <td className="border-r">{team.played}</td>
                    <td className="border-r">{team.won} - {team.lost}</td>
                    <td>{team.points}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table