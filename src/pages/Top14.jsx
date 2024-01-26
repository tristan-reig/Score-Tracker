import format from "date-fns/format";
import axios from "axios";
import { useEffect, useState } from "react"
import TeamCard from "../components/TeamCard";
import Select from "../components/Select"
import { fr } from "date-fns/locale";
import Skeleton from "../components/Skeleton";

const Top14 = () => {
  const [currentTab, setCurrentTab] = useState("Teams")
  const [dataTeams, setDataTeams] = useState(null);
  const [dataStandings, setDataStandings] = useState(null)
  const [dataMatches, setDataMatches] = useState(null)
  const clubs = ["Clermont", "Bayonne", "Castres", "Lyon", "Montpellier", "Oyonnax", "Racing-92", "Toulon", "Pau", "Paris", "La-Rochelle", "Toulouse", "Bordeaux-begles", "Perpignan"]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            "X-RapidAPI-Key": "797c316aefmsh80372ed50154d10p19e699jsn685444fbeca0",
            "X-RapidAPI-Host": "rugby-live-data.p.rapidapi.com"
          }
        };
        options['url'] = 'https://rugby-live-data.p.rapidapi.com/teams/1230/2024'
        var response = await axios.request(options);
        setDataTeams(response.data.results);
        options['url'] = 'https://rugby-live-data.p.rapidapi.com/standings/1230/2024'
        response = await axios.request(options);
        setDataStandings(response.data.results);
        options['url'] = 'https://rugby-live-data.p.rapidapi.com/fixtures/1230/2024'
        response = await axios.request(options);
        setDataMatches(response.data.results);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[]);

  if (!dataTeams || !dataStandings ||!dataMatches) {
    return <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} disabled={true} />
      <Skeleton length={14} column={5} />
    </div>
  }

  function setUpStandings() {  
    const standings = []
    const ind = []
    for (let i = 0; i < dataTeams.length; i++) {
      for (let j = 0; j < dataTeams.length; j++) {
        if (dataStandings.standings[0].teams[i].name == dataTeams[j].name) {
          ind.push(j)
        }
      }
    }
    for (let i of ind) {
      standings.push(clubs[i])
    }
    return standings
  }

  function setUpMatches() {
    const home = []
    const away = []
    const matches = []
    for (let i = 0; i < dataMatches.length; i++) {
      if (dataMatches[i].game_week === 13) {
        matches.push(dataMatches[i])
      }
    }
    for (let i = 0; i < matches.length; i++) {
      for (let j = 0; j < dataTeams.length; j++) {
        if (matches[i].home === dataTeams[j].name) {
          home.push(clubs[j])
        } else if (matches[i].away === dataTeams[j].name) {
          away.push(clubs[j])
        }
      }
    }
    return [matches, home, away]
  }

  if (currentTab === "Standings") {setUpStandings()}
  if (currentTab === "Matches") {var res = setUpMatches()}
  
  return (
    <div className="mt-5">
      <Select currentTab={currentTab} setCurrentTab={setCurrentTab} disabled={false} />
      <div className="w-full border-t relative">
        {currentTab === "Teams" && (
          <div className="grid grid-cols-5 gap-4 p-5">
            {clubs.map((club, index) => (
              <TeamCard key={index} name={dataTeams[index].name} index={index} image={`https://cdn.lnr.fr/club/${club}/photo/logo.bf3916f6c3950e6f8db29a8382a5f08159c542ad`} id={''} />
            ))}
          </div>
        )}
        {currentTab === "Standings" && (
          <div className="flex flex-col overflow-x-hidden p-5">
            <div className="2xl:mx-8">
              <div className="inline-block min-w-full py-2 2xl:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-center text-sm font-light">
                    <thead className="border-b font-medium">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-lg border-r">Equipe</th>
                        <th scope="col" className="px-6 py-4 text-lg border-r">Matchs Joués</th>
                        <th scope="col" className="px-6 py-4 text-lg border-r">Victoires - Défaites - Egalités</th>
                        <th scope="col" className="px-6 py-4 text-lg border-r">Bonus</th>
                        <th scope="col" className="px-6 py-4 text-lg">Points</th>
                      </tr>
                    </thead>
                    {dataStandings.standings[0].teams.map((team, index) => (
                      <tbody key={index}>
                        <tr className="text-xl hover:bg-base-300">
                          <td className="text-left flex flex-row border-r relative pl-2 items-center">
                            <span>{team.position}&nbsp;</span>
                            <img className="w-10 h-10 p-1" src={`https://cdn.lnr.fr/club/${setUpStandings()[index]}/photo/logo.bf3916f6c3950e6f8db29a8382a5f08159c542ad`} alt="" />
                            <span className="hover:cursor-pointer hover:underline">{team.name}</span>
                          </td>
                          <td className="border-r">{team.played}</td>
                          <td className="border-r">{team.won} - {team.lost} - {team.drawn}</td>
                          <td className="border-r">{team.losing_bonus + team.try_bonus}</td>
                          <td>{team.points}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentTab === "Matches" && (
          res[0].map((match, index) => (
            <div key={index} className="container mx-auto flex flex-row justify-center items-center relative border-b p-2">
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
                  <img className="w-lg h-28 mt-3" src={`https://cdn.lnr.fr/club/${res[1][index]}/photo/logo-thumbnail-1x.b2c9984e11b81c4960a2d7763f7e73e7855a7511`} alt="" />
                  <h2>{match.home}</h2>
                </div>
                <span className="text-2xl px-5">{match.home_score}</span>
              </div>
              <span className="text-2xl my-auto">-</span>
              <div className="away flex flex-row items-center">
                <span className="text-2xl px-5">{match.away_score}</span>
                <div className="items-center flex flex-col">
                  <img className="w-lg h-28 mt-3" src={`https://cdn.lnr.fr/club/${res[2][index]}/photo/logo-thumbnail-1x.b2c9984e11b81c4960a2d7763f7e73e7855a7511`} alt="" />
                  <h2>{match.away}</h2>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Top14