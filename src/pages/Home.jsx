import Hero from '../components/Hero'
import Lec from "../assets/lec-2019.avif"
import Lfl from "../assets/lfl.svg"
import Top from "../assets/Top_14.svg.png"
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Hero/>
      <div className="grid grid-cols-3 p-5 2xl:h-[45vh]">
          <Link to="/league/lec?id=4197" className="mx-auto border-r">
              <img className="h-80 w-80 2xl:h-96 2xl:w-96 p-5 rounded-lg cursor-pointer mx-auto bg-gradient-to-r from-cyan-500 to-lime-300 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-150" src={Lec} alt=""/>
          </Link>
          <Link to="/league/lfl?id=4292" className="mx-auto border-r">
              <img className="h-80 w-80 2xl:h-96 2xl:w-96 p-5 rounded-lg cursor-pointer mx-auto bg-gradient-to-r from-gray-200 to-gray-400 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-150" src={Lfl} alt=""/>
          </Link>
          <Link to="/top14" className='mx-auto'>
            <img className="h-80 w-80 2xl:h-96 2xl:w-96 p-5 rounded-lg cursor-pointer bg-black transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-150" src={Top} alt=""></img>
          </Link>
      </div>
    </>
  )
}