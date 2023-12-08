import { useState, useEffect } from 'react'
import Table from '../components/Table'
import { useSearchParams } from 'react-router-dom'

const Mercato = () => {
  const leagues = ['LEC', 'LCK', 'LFL']
  const [data, setData] = useState(null)
  const [queryParameters] = useSearchParams()
  const query = queryParameters.get("query") || 'lec'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import(`../data/${query}/data.json`)
        setData(response)
      } catch {
        console.error('Erreur')
      }
    };

    fetchData()
  }, [query])

  if (!data) {
    return null
  }

  const color_array = data["colors"]
  const id_array = data["ids"]
  const team_array = data["teams"]

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">    
        <div className="grid grid-cols-3 p-5">
          {team_array.map((_, index) => (
            <Table league={query} key={index} index={index} team={team_array[index]} id={id_array[index]} bg_color={color_array[index]} />
          ))}
        </div>
      </div> 
      <div className="drawer-side">
        <label aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
          {leagues.map((league, index) => 
            <li key={index} className={`${query === league.toLocaleLowerCase() ? "bg-gray-600 outline-2 rounded-md" : ""}`}>
              <a href={`/mercato?query=${league.toLocaleLowerCase()}`}>{league}</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Mercato