import { useState } from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  const [points, setPoints] = useState(parseInt(localStorage.getItem('points')) || 0)

  function updatePoints() {
    setPoints(points + 5)
    localStorage.setItem('points', points + 5)
  }

  return (
    <div className="navbar bg-gray-900 2xl:h-[10vh]">
      <div className="navbar-start">
        <a className="p-3 text-xl 2xl:text-2xl font-bold" href='/'>ScoreTracker</a>
        <a href="/" className="w-10 2xl:w-12">
          <img src={logo} alt=""/>
        </a>
      </div>
      <div className="navbar-center">
        <form action="/search">
          <div className="join">
              <input autoComplete='off' name="query" type="text" placeholder="Chercher une équipe, un joueur..." className="input input-bordered block rounded-md w-96 focus:outline-none" />
          </div>
        </form>
      </div>
      <div className="navbar-end">
        <div className="join py-2 relative">
          <button className="btn join-item text-xl pb-1 rounded-r-full">+</button>
          <input className="input join-item w-24 text-red-500 pointer-events-none text-white text-center" readOnly="readonly" placeholder={points}/>
          <button onClick={() => updatePoints()} className="btn join-item rounded-l-full"><img className='w-6 h-6' src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/60815/golden-dollar-coin-clipart-md.png" alt="" /></button>
        </div>
      </div>
    </div>
  )
}

export default Navbar