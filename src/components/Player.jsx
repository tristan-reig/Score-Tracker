import Card from "./Card"

const Player = (props) => {
  console.log(props.data)

  return (
    <div className="p-5 container-fluid flex flex-col justify-between bg-gray-400">
      <h2 className="text-xl text-gray-700 font-mono">Joueur</h2>
      <div className="m-5 top-content flex flex-row justify-around items-center">
        <Card data={props.data} />
      </div>
    </div>
  )
}

export default Player