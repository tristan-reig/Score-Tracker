import { Link } from "react-router-dom"

const TeamCard = (props) => {
  return (
    <Link to={`/search?query=${props.id}`} className="h-44 container border cursor-pointer flex flex-col justify-center items-center p-3 bg-gray-700 hover:bg-gray-800">
      <img className="w-24 h-lg" src={props.image}/>
      <span>{props.name}</span>
    </Link>
  )
}

export default TeamCard