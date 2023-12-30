import axios from "axios";
import { useEffect, useState } from "react"
import Table from "../components/Table";
import Matches from "../components/Matches";
import TeamCard from "../components/TeamCard";

const Top14 = () => {
  const [currentTab, setCurrentTab] = useState("Teams")
  const [data, setData] = useState(null);
  const clubs = ["Clermont", "Bayonne", "Castres", "Lyon", "Montpellier", "Oyonnax", "Racing-92", "Toulon", "Pau", "Paris", "La-Rochelle", "Toulouse", "Bordeaux-begles", "Perpignan"]
  const options = {
    method: 'GET',
    url: 'https://rugby-live-data.p.rapidapi.com/fixtures/1230/2024',
    headers: {
      "X-RapidAPI-Key": "5b49c55b86msh81044d50006f92cp1421cfjsnc45ffb5ba491",
      "X-RapidAPI-Host": "rugby-live-data.p.rapidapi.com"
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://rugby-live-data.p.rapidapi.com/teams/1230/2024',
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

  return (
    <div className="mt-5">
      <div className="flex flex-row items-center text-center justify-around gap-4">
        <div className={`element border w-full p-5 text-xl border-b-0 cursor-pointer hover:bg-black ${currentTab === "Teams" ? "bg-black" : ""}`} onClick={() => setCurrentTab("Teams")}>Equipes</div>
        <div className={`element border w-full p-5 text-xl border-b-0 cursor-pointer hover:bg-black ${currentTab === "Standings" ? "bg-black" : ""}`} onClick={() => setCurrentTab("Standings")}>Classement</div>
        <div className={`element border w-full p-5 text-xl border-b-0 cursor-pointer hover:bg-black ${currentTab === "Matches" ? "bg-black" : ""}`} onClick={() => setCurrentTab("Matches")}>Prochains matchs</div>
      </div>
      <div className="w-full border">
        {currentTab === "Teams" && (
          <div className="grid grid-cols-5 gap-4 p-5">
            {clubs.map((club, index) => (
              <TeamCard key={index} name={data[index].name} index={index} image={`https://cdn.lnr.fr/club/${club}/photo/logo.bf3916f6c3950e6f8db29a8382a5f08159c542ad`} id={''} />
            ))}
          </div>
        )}
        {currentTab === "Standings" && (
          <Table teams={data} clubs={clubs} />
        )}
        {currentTab === "Matches" && (
          <Matches teams={data} clubs={clubs} options={options} />
        )}
      </div>
    </div>
  )
}

export default Top14