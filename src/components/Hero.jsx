import { LuArrowLeftRight } from "react-icons/lu";
import { MdViewTimeline } from "react-icons/md";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
  <section className="dark:bg-gray-800">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white">Tout l&apos;esport dans un endroit</h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
          <div className="flex flex-row space-y-0 justify-center">
            <button className="btn btn-accent inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg">
                <span>Planning</span>
                <MdViewTimeline size={20}/>
            </button>
            <Link to="/mercato" className="btn m-5 btn-primary inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg">
                <span>Mercato</span>
                <LuArrowLeftRight size={20}/>
            </Link>
        </div>
      </div>
  </section>

  )
}

export default Hero