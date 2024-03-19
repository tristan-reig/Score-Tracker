import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {
  const [data, setData] = useState(null)

  axios.interceptors.request.use( x => {
    x.meta = x.meta || {}
    x.meta.requestStartedAt = new Date().getTime();
    return x;
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/rugby/top14/matches')
      setData(response.data)
    }
    fetchData();
  }, [])

  if (!data) {
    return (
      <div>Attente</div>
    )
  }

  console.log(data)

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

export default Test