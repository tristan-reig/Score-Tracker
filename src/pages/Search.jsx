import { useState, useEffect } from "react";
import Team from "../components/Team"
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom'

const Search = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams()
  const query = queryParameters.get("query").toLowerCase()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://api.pandascore.co/teams/' + query,
          params: {
            'filter[videogame_id]': '1',
            sort: 'acronym',
            page: '1',
            per_page: '50'
          },
          headers: {
            accept: 'application/json',
            authorization: 'Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes'
          }
        };
        const response = await axios.request(options);
        setData(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[query, navigate]);

  if (!data) {
    return <div className='loading loading-ring loading-lg'></div>;
  }

  return (
    <div>
      <Team data={data} />
    </div>
  )
}

export default Search