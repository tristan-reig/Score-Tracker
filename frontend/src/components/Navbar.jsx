import { LoL } from '../assets'
import logo from '../assets/logo.png'
import { IoIosFootball } from "react-icons/io";
import { CiFootball } from "react-icons/ci";
import { FaBell } from "react-icons/fa";

const Navbar = (props) => {
  return (
    <div className="navbar bg-gray-900">
      <div className="navbar-start">
        <a className="p-4 text-xl 2xl:text-2xl font-bold" href='/'>ScoreTracker</a>
        <a href="/" className="w-10 2xl:w-12">
          <img src={logo} alt=""/>
        </a>
      </div>
      {props.homepage && (<div className="navbar-center gap-4">
        <button className={`btn-outline flex border p-2 rounded-xl gap-2 items-center cursor-pointer ${props.category === "league" && "border-yellow-100"}`} onClick={() => props.category == "league" ? props.setCategory("") : props.setCategory("league")}>
          <img className='w-8' src={LoL} alt=""/>
          <p>League of Legends</p>
        </button>
        <button className={`btn-outline flex border p-2 rounded-xl gap-2 items-center cursor-pointer ${props.category === "football" && "border-yellow-100"}`} onClick={() => props.category == "football" ? props.setCategory("") : props.setCategory("football")}>
          <IoIosFootball size={30} />
          <p>Football</p>
        </button>
        <button className={`btn-outline flex border p-2 rounded-xl gap-2 items-center cursor-pointer ${props.category === "rugby" && "border-yellow-100"}`} onClick={() => props.category == "rugby" ? props.setCategory("") : props.setCategory("rugby")}>
          <CiFootball size={30} color='brown' />
          <p>Rugby</p>
        </button>
      </div>)}
      <div className="navbar-end">
        <FaBell size={25} />
      </div>
    </div>
  )
}

export default Navbar