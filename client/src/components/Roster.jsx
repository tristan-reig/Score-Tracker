import { useState } from 'react'
import 'flag-icon-css/css/flag-icons.min.css'
import { useEffect } from 'react'

const Roster = (props) => {
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    if (props.items > 6) {
      for (let i=0; i < props.players.length; i++) {
        setPlayer(props.players[props.index])
      }
    } else {
      for (let i=0; i < props.players.length; i++) {
        if (props.players[i].role == props.position_array[props.index]) {
          setPlayer(props.players[i])
        }
      }
    }
  }, [props.players, props.index, props.items, props.position_array])

  if (!player) {
    return <div className='loading loading-ring loading-lg'></div>;
  }

  return (
    <div className="player flex flex-col items-center justify-center">
      <img className={`photo ${player.image_url ? "w-60" : "w-52"} h-lg`} src={player.image_url ? player.image_url : "../../src/assets/load.png"} alt="" />
      <div className="infos flex flex-row mt-3">
        <span className={`flag-icon flag-icon-${player.nationality.toLowerCase()} m-3 mt-2`}></span>
        <h3 className="font-['pseudo'] text-2xl text-black">{player.name}</h3>
      </div>
    </div>
  )
}

export default Roster