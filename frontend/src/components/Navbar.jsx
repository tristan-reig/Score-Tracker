import { useState } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const isLogged = localStorage.getItem('logged') || false

  return (
    <div className="navbar bg-gray-900">
      <div className="navbar-start">
        <a className="p-4 text-xl 2xl:text-2xl font-bold" href='/'>ScoreTracker</a>
        <a href="/" className="w-10 2xl:w-12">
          <img src={logo} alt=""/>
        </a>
      </div>
      <div className="navbar-center">
        <div className="join py-2 relative">
          {isLogged && (
            <>
              <button className="btn join-item text-xl pb-1 rounded-r-full">+</button>
              <input className="input w-full join-item w-24 text-red-500 pointer-events-none text-white text-center" readOnly="readonly" placeholder={0}/>
              <button className="btn join-item rounded-l-full">
                <img className='w-6 h-6' src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/60815/golden-dollar-coin-clipart-md.png" alt="" />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="navbar-end">
        {!isLogged ? 
          <Link to={"/login"}>
            <button className='btn btn-outline'>Connexion / Inscription</button>
          </Link> :
          <Link to={"/login"}>
            <button className='btn btn-error btn-outline' onClick={() => localStorage.removeItem('logged')}>Déconnexion</button>
          </Link>
        }
      </div>
    </div>
  )
}

export default Navbar