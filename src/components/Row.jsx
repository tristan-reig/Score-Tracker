import { useState, useEffect } from "react"
import new_players from '../data/new_players.json';
import missing_players from '../data/missing_players.json';

const Row = (props) => {
  const out_players = ["Trymbi", "Mersa", "Bo", "Perkz", "Upset", "Kaiser", "Markoon", "Sertuss", "Crownie"]
  const [player, setPlayer] = useState(null)
  useEffect(()=>{
    for (let i = 0; i < props.players.length; i++){
      if (props.players[i].role == props.position){
        setPlayer(props.players[i])
      }
    }
	}, [props.players, props.position])

  if (!player) {
    return (
      <tr className={`text-xs text-center ${props.bg_color} text-gray-700 border-t border-t-4 border-black`}>
        <th scope="row" className="px-3 py-3 text-lg border-r-4 border-black">
            <img src={`../src/assets/${props.position}.png`} className='w-10 h-10 mx-auto' />
        </th>
        <td className="px-3 py-3 text-lg border-r-4 border-black bg-gray-300">
          {missing_players[props.index][props.position]}
        </td>
        <td className={`px-3 py-3 text-lg bg-blue-300`}>
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
          {props.team === "Karmine Corp" ? 
            "" : player.name
          }
        </td>
        {new_players[props.index][props.position] ? (
          <td className={`px-3 py-3 text-lg bg-blue-500`}>
            {new_players[props.index][props.position]}
          </td>
        ) : (
          <td className={`px-3 py-3 text-lg bg-blue-300`}>
            {player.name}
          </td>
        )}
    </tr>
  )
}

export default Row