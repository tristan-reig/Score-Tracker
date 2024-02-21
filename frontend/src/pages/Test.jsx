import axios from 'axios'
import { useState, useEffect } from 'react'

const Test = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await axios.get(`http://localhost:3001/rugby/bstandings`)
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, []);

  console.log(data)

  if (!data) {
    return (
      <div>Attente</div>
    )
  } else {
    return <div>Test</div>
  }
}

export default Test