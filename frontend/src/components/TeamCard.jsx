import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const TeamCard = (props) => {
  const [imageDimensions, setImageDimensions] = useState({});

  useEffect(() => {
    const img = new Image();
    img.src = props.image;
    img.onload = () => {
      setImageDimensions({
        height: img.height,
        width: img.width
      });
    };
  }, [props])

  return (
    props.name ?
      <Link to={props.id ? `/search?query=${props.id}` : ""} className="h-44 container border cursor-pointer flex flex-col justify-center items-center p-3 bg-gray-700 hover:bg-gray-800">
        <img className={`${imageDimensions.width >= imageDimensions.height ? 'w-24 mb-3' : 'w-20'}`} src={props.image}/>
        <span className="text-center">{props.name}</span>
      </Link> : 
      <div className="h-44 container border cursor-pointer flex flex-col justify-center items-center p-3 bg-gray-700 animate-pulse">
        <span className="loading loading-dots loading-lg m-auto"></span>
      </div>
  )
}

export default TeamCard