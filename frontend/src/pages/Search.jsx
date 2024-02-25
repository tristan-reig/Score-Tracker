import { useState, useEffect } from "react";
import Team from "../components/Team"
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom'
import SkeletonTeamPage from "../components/SkeletonTeamPage";

const Search = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams()
  const query = queryParameters.get("query").toLowerCase()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/search/${query}`);
        setData(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[query, navigate]);

  if (!data) {
    return <SkeletonTeamPage />
  }

  return (
    <div>
      <Team data={data.message} />
    </div>
  )
}

export default Search