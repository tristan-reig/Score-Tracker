import { useState } from 'react';
import { LoL } from '../assets';
import { homeData } from '../data/Home'
import { Link } from 'react-router-dom';

const Home = (props) => {
  return (
    <div>
      <section className="bg-gray-800 flex 2xl:h-[40vh]">
        <div className="flex w-full bg-center bg-cover items-center justify-center gap-10 h-full text-center bg-bottom bg-[url(https://s1.1zoom.me/b4939/653/Footbal_Stadium_Lawn_543801_1920x1080.jpg)]">
          <img className="w-40 h-40" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Football_%28soccer_ball%29.svg/1927px-Football_%28soccer_ball%29.svg.png" alt="" />
          <h1 className="flex font-bold text-black text-4xl">Football</h1>
        </div>
      </section>
      <div className="grid xl:grid-cols-4 p-5 gap-10 md:grid-cols-3">
        {homeData.filter(name => name.link.includes(`/${props.category}`)).map((data, index) => (
          <Link to={data.link} className="mx-auto" key={index}>
            <img 
              className={`h-72 w-72 2xl:h-96 2xl:w-96 ${index == 7 ? '' : 'p-5'} object-contain rounded-lg cursor-pointer bg-gradient-to-r transition
              ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-150
              ${data.colors.length > 1 ? `from-${data.colors[0]} ${data.colors[2] ? `via-${data.colors[1]}` : ""} 
              to-${data.colors[data.colors.length - 1]}` : `bg-${data.colors[0]}`}`} src={data.img} alt=""
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home