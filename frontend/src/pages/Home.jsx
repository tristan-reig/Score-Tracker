import Hero from '../components/Hero'
import { homeData } from '../data/Home'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Hero/>
      <div className="grid xl:grid-cols-4 p-5 gap-10 md:grid-cols-3">
        {homeData.map((data, index) => (
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
    </>
  )
}