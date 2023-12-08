import { useState, useEffect } from "react"
import 'flag-icon-css/css/flag-icons.min.css'

const Row = (props) => {
  const [player, setPlayer] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import(`../data/${props.league}/data.json`)
        setData(response)
      } catch {
        console.error('Erreur')
      }
    };

    fetchData()
  }, [props.league])

  
  useEffect(()=>{
    for (let i = 0; i < props.players.length; i++){
      if (props.players[i].role == props.position){
        setPlayer(props.players[i])
      }
    }
	}, [props.players, props.position])

  if (!data) {
    return null
  }
  
  const new_players = data["new_players"]
  const official_teams = data["official_teams"]
  const out_players = data["out_players"]
  const missing_players = data["missing_players"]

  if (!player) {
    return (
      <tr className={`text-xs text-center ${props.bg_color} text-gray-700 border-t border-t-4 border-black`}>
        <th scope="row" className="px-3 py-3 text-lg border-r-4 border-black">
            <img src={`../src/assets/${props.position}.png`} className='w-10 h-10 mx-auto' />
        </th>
        <td className={`px-3 py-3 text-lg border-r-4 border-black bg-red-300`}>
          {missing_players[props.index][props.position]}
        </td>
        <td className={`px-3 py-3 text-lg bg-blue-300 ${official_teams.includes(props.team) ? "bg-green-500" : "bg-blue-300"}`}>
          {new_players[props.index][props.position]}
        </td>
    </tr>
    );
  }
  
  return (
    <tr className={`text-xs text-center ${props.bg_color} text-gray-700 border-t border-t-4 border-black`}>
        <th scope="row" className="px-3 py-3 text-lg border-r-4 border-black">
            <img src={`../src/assets/${props.position}.png`} className='w-10 h-10 mx-auto' />
        </th>
        <td className={`px-3 py-3 text-lg border-r-4 border-black ${out_players.includes(player.name) ? "bg-red-300" : "bg-gray-300"}`}>
          {missing_players[props.index][props.position] ? (
            <span>{missing_players[props.index][props.position]}</span>
          ) : (
            <span>{props.id === 128268 ? "" : player.name}</span>
          )}
        </td>
        {new_players[props.index][props.position] ? (
          <td className={`px-3 py-3 text-lg bg-blue-500`}>
            {new_players[props.index][props.position]}
          </td>
        ) : (
          <td className={`px-3 py-3 text-lg ${official_teams.includes(props.team) ? "bg-green-500" : "bg-blue-300"}`}>
            {player.name}
          </td>
        )}
    </tr>
  )
}

export default Row