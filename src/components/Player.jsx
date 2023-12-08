import Card from "./Card"

const Player = (props) => {
  return (
    <div className="p-5 container-fluid flex flex-col justify-between bg-gray-400">
      <h2 className="text-xl text-gray-700 font-mono">Joueur</h2>
      <div className="p-5 top-content flex flex-col justify-center items-center">
        <Card data={props.data} />
        <div className="divider divider-horizontal"></div>
        <div className="team"></div>
      </div>
    </div>
  )
}

export default Player