import { LoL } from '../assets'
import logo from '../assets/logo.png'
import { IoIosFootball } from "react-icons/io";
import { CiFootball } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { useState } from 'react';

const Navbar = (props) => {
  return (
    <div className="navbar bg-gray-900">
      <div className="navbar-start">
        <a className="p-4 text-xl 2xl:text-2xl font-bold" href='/'>ScoreTracker</a>
        <a href="/" className="w-10 2xl:w-12">
          <img src={logo} alt=""/>
        </a>
      </div>
      <div className="navbar-center gap-4">
        <button className='btn-outline flex border p-2 rounded-xl gap-2 items-center cursor-pointer' onClick={() => props.setCategory("league")}>
          <img className='w-8' src={LoL} alt=""/>
          <p>League of Legends</p>
        </button>
        <button className='btn-outline flex border p-2 rounded-xl gap-2 items-center cursor-pointer' onClick={() => props.setCategory("football")}>
          <IoIosFootball size={30} />
          <p>Football</p>
        </button>
        <button className='btn-outline flex border p-2 rounded-xl gap-2 items-center cursor-pointer' onClick={() => props.setCategory("rugby")}>
          <CiFootball size={30} color='brown' />
          <p>Rugby</p>
        </button>
      </div>
      <div className="navbar-end">
        <FaBell size={25} />
      </div>
    </div>
  )
}

export default Navbar