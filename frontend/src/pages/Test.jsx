import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/rugby/challenge-cup/groups');
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
    <div className="flex">
      hello
      <img className="w-10 h-10" src="/src/assets/euro/Albanie.png" alt="" />
    </div>
  );
};

export default Test