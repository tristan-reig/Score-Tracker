import Hero from '../components/Hero'
import Lec from "../assets/lec-2019.avif"
import Lfl from "../assets/lfl.svg"
import Lck from "../assets/LCK.svg"
import Top from "../assets/Top_14.png"
import ProD2 from "../assets/ProD2.jfif"
import Div2 from "../assets/Div2.webp"
import Ligue1 from "../assets/Ligue1.png"
import SixNations from "../assets/Six_Nations.jpg"
import { Link } from 'react-router-dom'
import Banner from '../components/Banner'

export default function Home() {
  sessionStorage.clear()
  return (
    <>
      <Hero/>
      <div className="grid grid-cols-4 p-5 gap-10">
          <Link to="/league/lec?id=4197" className="mx-auto">
              <img className="h-72 w-72 2xl:h-96 2xl:w-96 p-5 rounded-lg cursor-pointer bg-gradient-to-r from-cyan-500 to-lime-300 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-150" src={Lec} alt=""/>
          </Link>
          <Link to="/league/lfl?id=4292" className="mx-auto">
              <img className="h-72 w-72 2xl:h-96 2xl:w-96 p-5 rounded-lg cursor-pointer bg-gradient-to-r from-amber-700 to-gray-400 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-150" src={Lfl} alt=""/>
          </Link>
          <Link to="/rugby/sixnations?id1=1266&id2=51" className='mx-auto'>
            <img className="h-72 w-72 2xl:h-96 2xl:w-96 p-5 rounded-lg cursor-pointer bg-black transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-150" src={SixNations} alt=""></img>
          </Link>
          <Link to="/rugby/top14?id1=1230&id2=16" className='mx-auto'>
            <img className="h-72 w-72 2xl:h-96 2xl:w-96 p-5 rounded-lg cursor-pointer bg-black transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-150" src={Top} alt=""></img>
          </Link>
          <Link to="/ligue1" className='mx-auto'>
            <img className="h-72 w-72 2xl:h-96 2xl:w-96 p-2 rounded-lg cursor-pointer bg-blue-950 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-150" src={Ligue1} alt=""></img>
          </Link>
          <Link to="/league/lck?id=293" className="mx-auto">
              <img className="h-72 w-72 2xl:h-96 2xl:w-96 p-5 rounded-lg cursor-pointer bg-gradient-to-r from-gray-500 to-purple-500 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-150" src={Lck} alt=""/>
          </Link>
          <Link to="/rugby/prod2?id1=1278&id2=17" className="mx-auto">
              <img className="h-72 w-72 2xl:h-96 2xl:w-96 rounded-lg cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-150" src={ProD2} alt=""/>
          </Link>
          <Link to="/league/div2?id=4743" className="mx-auto">
              <img className="h-72 w-72 2xl:h-96 2xl:w-96 p-5 rounded-lg cursor-pointer bg-gradient-to-r from-white to-pink-500 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-150" src={Div2} alt=""/>
          </Link>
      </div>
    </>
  )
}