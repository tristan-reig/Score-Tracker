import { LoL, Foot, BgFoot, BgLoL, Rugby, BgRugby } from '../assets';
import { homeData } from '../data/Home'
import { Link } from 'react-router-dom';

const Home = (props) => {
  let categoryImage, categoryName, backgroundUrl;
  switch (props.category) {
    case 'football':
      categoryImage = Foot;
      categoryName = "Football";
      backgroundUrl = BgFoot;
      break;
    case 'rugby':
      categoryImage = Rugby;
      categoryName = "Rugby";
      backgroundUrl = BgRugby;
      break;
    case 'league':
      categoryImage = LoL;
      categoryName = "League of Legends";
      backgroundUrl = BgLoL
      break;
  }

  return (
    <div>
      <section className="bg-gray-800 flex 2xl:h-[40vh]">
        {props.category ? (
          <div className={`flex w-full bg-center bg-cover items-center justify-center gap-4 h-full text-center gap-14 ${props.category === "league" ? "bg-center" : "bg-bottom"}`} 
          style={{ backgroundImage: `url(${backgroundUrl})` }}>
            <img className="w-40" src={categoryImage} alt="" />
            <h1 className={`flex font-bold ${categoryName === "Rugby" ? "text-white" : "text-black"} text-4xl`}>{categoryName}</h1>
          </div>
        ) : (
          <div className={`flex flex flex-col w-full items-center justify-center gap-8 h-full text-center gap-14 bg-gradient-to-r from-[#6f91bd] to-[#850015]`}>
            <div className="flex items-center">
              <h1 className={`flex font-bold text-white text-4xl`}>ScoreTracker</h1>
            </div>
            <p className='text-gray-200 text-xl'>Retrouvez toutes les informations sur une ligue, un joueur ou un tournoi ici</p>
          </div>
        )}
      </section>
      <div className="grid xl:grid-cols-4 p-5 gap-10 md:grid-cols-3">
        {homeData.filter(name => name.link.includes(`/${props.category}`)).map((data, index) => (
          <Link to={data.link} className="mx-auto" key={index}>
            <img 
              className={`h-72 w-72 2xl:h-96 2xl:w-96 ${index == 7 ? '' : 'p-5'} object-contain rounded-lg cursor-pointer bg-gradient-to-r transition
              ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-150 ${data.colors.length == 0 && "bg-[#011846]"}
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