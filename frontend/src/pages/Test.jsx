import axios from "axios";
import { useEffect, useState } from "react";
import { RugbyField } from "../components";

const Test = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/rugby/top14/matches?week=19');
      setData(response.data);
    }
    fetchData();
  }, []);
  
  if (!data) {
    return (
      <div>Attente</div>
    )
  }

  console.log(data)

  return (
    <div className="bg-green-700 m-5 mx-20">
      {/* <RugbyField player1={data.slice(0, 15)} team1={"Perpignan"} player2={data.slice(15, 30)} team2={"Toulouse"} /> */}
    </div>
  );
};

export default Test