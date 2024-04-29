import axios from "axios";
import { useEffect, useState } from "react";
import { RugbyField } from "../components";

const Test = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/valorant/7385/teams');
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
    <div>Fini</div>
  );
};

export default Test