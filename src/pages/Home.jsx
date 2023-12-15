import Hero from '../components/Hero'
import Lec from "../assets/lec-2019.avif"
import Lfl from "../assets/lfl.svg"
import Top from "../assets/Top_14.svg.png"

export default function Home() {
  return (
    <>
      <Hero/>
      <div className="grid grid-cols-3 p-5 mt-3">
          <div className="container mx-auto flex my-auto border-r">
              <img className="h-80 p-5 w-80 rounded-lg cursor-pointer mx-auto bg-gradient-to-r from-cyan-500 to-lime-300 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-200" src={Lec} alt=""/>
          </div>
          <div className="container mx-auto flex my-auto border-r">
              <img className="h-80 w-80 p-5 rounded-lg cursor-pointer mx-auto bg-gradient-to-r from-gray-200 to-gray-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-200" src={Lfl} alt=""/>
          </div>
          <div className="container mx-auto flex my-auto">
              <img className="h-80 w-80 p-5 rounded-lg cursor-pointer mx-auto bg-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200" src={Top} alt=""/>
          </div>
      </div>
    </>
  )
}