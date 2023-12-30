import { useRef, useCallback } from "react";
import { LuSwords } from "react-icons/lu";
import { MdViewTimeline } from "react-icons/md";
import { GiCrestedHelmet } from "react-icons/gi";
import { Link } from "react-router-dom";
import BoxInput from "./BoxInput";

const Hero = () => {
  const ref = useRef();
  const handleShow = useCallback(() => {
    ref.current?.showModal()
  }, [ref])
  return (
  <section className="bg-gray-800 2xl:h-[35vh]">
      <div className="py-16 px-4 mx-auto max-w-screen-xl text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white">Tout le sport et l&apos;esport réunis dans un endroit</h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
          <div className="flex flex-row space-y-0 justify-center">
            <Link to="/planning" className="btn btn-accent inline-flex justify-center items-center mx-3 py-3 px-5 text-base font-medium text-center text-white rounded-lg">
                <span>Planning</span>
                <MdViewTimeline size={20}/>
            </Link>
            <button onClick={handleShow} className="btn btn-secondary inline-flex justify-center items-center mx-3 py-3 px-5 text-base font-medium text-center text-white rounded-lg">
                <span>Match</span>
                <LuSwords size={20}/>
            </button>
            <Link to="/draft" className="btn btn-primary inline-flex justify-center items-center mx-3 py-3 px-5 text-base font-medium text-center text-white rounded-lg">
                <span>Draft</span>
                <GiCrestedHelmet size={24}/>
            </Link>
            <dialog className="modal focus:outline-none" ref={ref}>
              <div className="modal-box max-w-3xl">
                <h3 className="font-bold text-3xl">Sélécteur de match</h3>
                <div className="indicator m-5">
                  <BoxInput placeholder="Equipe 1" />
                  <div className="m-5 divider divider-horizontal">VS</div> 
                  <BoxInput placeholder="Equipe 2" />
                </div>
              </div>
              <form method="dialog" className="modal-backdrop focus:outline-none">
                <button>close</button>
              </form>
            </dialog>
          </div>
      </div>
  </section>

  )
}

export default Hero