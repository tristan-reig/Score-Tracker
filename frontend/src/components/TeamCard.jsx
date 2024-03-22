import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const TeamCard = (props) => {
  const [imageDimensions, setImageDimensions] = useState({});
  const [isHovered, setIsHovered] = useState(false)

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

  console.log(props.color)

  return (
    props.name ?
      <Link
        onMouseOver={() => setIsHovered(true)}
        style={{backgroundColor: isHovered ? props.color : "#374151"}}
        to={props.id ? `/search?query=${props.id}` : ""}
        onMouseOut={() => setIsHovered(false)}
        className={`bg-left bg-[url('/src/assets/Transparent_Foot.png')] bg-cover bg-left h-44 container border cursor-pointer flex flex-col justify-center items-center p-3`}
      >
        <img className={`${imageDimensions.width >= imageDimensions.height ? 'w-24 mb-3' : 'w-20'}`} src={props.image}/>
        <span className="text-center">{props.name}</span>
      </Link> : 
      <div className="h-44 container border cursor-pointer flex flex-col justify-center items-center p-3 bg-gray-700 animate-pulse">
        <span className="loading loading-dots loading-lg m-auto"></span>
      </div>
  )
}

export default TeamCard