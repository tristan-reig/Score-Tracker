import { MdViewTimeline } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { FaC, FaCoins } from "react-icons/fa6";

const Hero = () => {
  return (
  <section className="bg-gray-800 flex 2xl:h-[30vh]">
    <div className="py-14 px-4 text-center">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white">Tout le sport et l&apos;esport réunis dans un endroit</h1>
      <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, consectetur soluta. Obcaecati quasi cumque quos omnis, animi id at nesciunt iusto accusantium.</p>
      <div className="flex flex-row space-y-0 justify-center">
        <Link to="/planning" className="btn btn-accent justify-center items-center mx-3 py-3 px-5 text-base font-medium text-center text-white rounded-lg">
          <span>Voir le planning</span>
          <MdViewTimeline size={20}/>
        </Link>
        <Link to="/planning" className="btn btn-primary justify-center items-center mx-3 py-3 px-5 text-base font-medium text-center text-white rounded-lg">
          <span>Equipes suivies</span>
          <IoIosStar size={20}/>
        </Link>
        <Link to="/planning" className="btn btn-secondary justify-center items-center mx-3 py-3 px-5 text-base font-medium text-center text-white rounded-lg">
          <span>Commencer à parier</span>
          <FaCoins size={20}/>
        </Link>
      </div>
    </div>
  </section>

  )
}

export default Hero