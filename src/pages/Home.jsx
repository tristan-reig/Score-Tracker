import Hero from '../components/Hero'
import Lec from "../assets/lec-2019.avif"
import Lfl from "../assets/lfl.svg"
import Lck from "../assets/LCK_Logo.svg"

export default function Home() {
  return (
    <>
      <Hero/>
      <div className="grid grid-cols-3 p-5">
          <div className="container mx-auto flex my-auto">
              <img className="h-80 p-5 w-80 rounded-lg cursor-pointer mx-auto bg-gradient-to-r from-cyan-500 to-lime-300 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-200" src={Lec} alt=""/>
              <div className="divider divider-horizontal"></div>
          </div>
          <div className="container mx-auto flex my-auto">
              <img className="h-80 w-80 p-5 rounded-lg cursor-pointer mx-auto bg-gradient-to-r from-gray-200 to-gray-400 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-200" src={Lfl} alt=""/>
              <div className="divider divider-horizontal"></div>
          </div>
          <div className="container mx-auto flex my-auto">
              <img className="h-80 w-80 p-5 rounded-lg cursor-pointer mx-auto bg-gradient-to-r from-violet-300 to-violet-800 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-200" src={Lck} alt=""/>
          </div>
      </div>
    </>
  )
}