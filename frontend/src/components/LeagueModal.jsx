import { API_URL } from '../api';
import { useEffect, useState, forwardRef } from 'react'
import { LuSwords } from 'react-icons/lu'
import { FaCoins } from 'react-icons/fa6'
import { TbTower } from "react-icons/tb";
import { GiSpikedDragonHead } from "react-icons/gi";
import { Nashor, Champ } from '../assets'
import axios from 'axios';

const Modal = forwardRef((props, ref) => {
  const [data, setData] = useState(null);
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/league/${props.compName}/${props.season}/details?day=${props.day}&match=${props.matchIndex}`)
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [props])

  function formatString(input) {
    let formattedString;
    if (input === "Renata Glasc") {
      return "Renata"
    } else if (input === "Wukong") {
      return 'MonkeyKing'
    } else if (input === "Bel'Veth") {
      return 'Belveth'
    }
    else if (!input.includes(' ')) {
      formattedString = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    } else {
      formattedString = input.replace(/\s|['"]/g, '');
    }
    return capitalizeAfterApostrophe(formattedString);
  }
  
  function capitalizeAfterApostrophe(word) {
    if (word === "Kai'sa") {
      return word.replace("'", "")
    } else {
      return word.replace(/'(.)?/g, (match, letter) => (letter ? letter.toUpperCase() : ''));
    }
  }

  function sommeKda(moitie) {
    return moitie.reduce((acc, val) => {
        const [val1, val2, val3] = val.split('/').map(Number);
        return [acc[0] + val1, acc[1] + val2, acc[2] + val3];
    }, [0, 0, 0]);
  }

  if (!data) {
    return <div>Attente</div>
  }

  return (
    <dialog ref={ref} id="modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="title py-2 text-center text-2xl ">Jour {props.day} | Match {props.matchIndex} : {props.data.name}</div>
        <div className='flex grid-cols-3'>
          <div className={`grid grid-rows-5 gap-4 mr-auto`}>
            {Array.from({length : 5}).map((_, index) => (
              <div key={index} className='flex flex-col'>
                <div className='relative flex w-[70px] h-[70px]' onMouseOut={() => setIsHovered(false)} onMouseOver={() => setIsHovered(true)}>
                  <img 
                    title={data["pick"][index]} 
                    src={`https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/${formatString(data["pick"][index])}.png`} 
                    className={`${isHovered && 'grayscale blur-xs'} absolute`}
                  />
                  {isHovered && (
                    <span className='z-5 flex m-auto text-lg text-blue-400 font-semibold bg-black'>{data["kda"][index]}</span>
                  )}
                </div>
                <span>{data["players"][index]}</span>
              </div>
            ))}
          </div>
          <div className='flex flex-grow flex-col py-5 px-20 relative'>
            <div className="absolute bottom-0 inset-x-0 px-20">
              <div className="flex flex-row items-center justify-between">
                {Array.from({length : 2}).map((_, indexC) =>
                  <div key={indexC} className='flex'>
                    {Array.from({length : 5}).map((_, indexE) => (
                      <img
                        title={`${indexE < 3 ? "Première" : "Seconde"} Rotation`} 
                        src={data["ban"][indexC * 5 + indexE] != "None" ? `https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/${formatString(data["ban"][indexC * 5 + indexE])}.png` : Champ} 
                        key={indexE}
                        className={`w-[35px] h-[35px] ${indexE == 2 ? `mr-3` : ''}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='flex text-2xl pb-6 font-bold items-center justify-around text-3xl'>
              <span className='text-emerald-400'>{props.data.opponents[0].opponent.acronym} {props.data.winner.acronym === props.data.opponents[0].opponent.acronym ? 'WIN' : 'LOSS'}</span>
              <span className='text-xl'>{data["time"]}</span>
              <span className='text-orange-600'>{props.data.opponents[1].opponent.acronym} {props.data.winner.acronym === props.data.opponents[1].opponent.acronym ? 'WIN' : 'LOSS'}</span>
            </div>
            <div className='flex text-2xl p-5 border-b items-center justify-around text-2xl'>
              <span>{sommeKda(data["kda"].slice(0, 5)).join('/')}</span>
              <LuSwords title='K/D/A' size={40}/>
              <span>{sommeKda(data["kda"].slice(5, 10)).join('/')}</span>
            </div>
            <div className='flex text-2xl p-5 border-b items-center justify-around text-2xl'>
              <span>{data["gold"][0]}</span>
              <FaCoins title='Gold' size={40} />
              <span>{data["gold"][1]}</span>
            </div>
            <div className='flex text-2xl p-5 border-b items-center justify-around text-2xl'>
              <span>{data["towers"][0]}</span>
              <TbTower title='Tours' size={40} />
              <span>{data["towers"][1]}</span>
            </div>
            <div className='flex text-2xl p-5 border-b items-center justify-around text-2xl'>
              <span>{data["dragons"][0]}</span>
              <GiSpikedDragonHead title='Dragons' size={40} />
              <span>{data["dragons"][1]}</span>
            </div>
            <div className='flex text-2xl p-5 border-b items-center justify-around text-2xl'>
              <span>{data["barons"][0]}</span>
              <img title='Baron Nashor' src={Nashor} className='w-10' alt="" />
              <span>{data["barons"][1]}</span>
            </div>
          </div>
          <div className={`grid grid-rows-5 gap-4 mr-auto`}>
            {Array.from({length : 5}).map((_, index) => (
              <div key={index} className='flex flex-col'>
                <div className='relative flex ml-auto w-[70px] h-[70px]' onMouseEnter={() => setIsHovered(!isHovered)} onMouseLeave={() => setIsHovered(false)}>
                  <img 
                    title={data["pick"][index + 5]} 
                    src={`https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/${formatString(data["pick"][index + 5])}.png`} 
                    className={`${isHovered && 'grayscale blur-xs'} absolute`}
                  />
                  {isHovered && (
                    <span className='z-5 flex m-auto text-lg text-red-400 font-semibold bg-black'>{data["kda"][index + 5]}</span>
                  )}
                </div>
                <span>{data["players"][index + 5]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => ref.current.close()} className='cursor-default'>Close</button>
      </form>
    </dialog>
  )
})

Modal.displayName = "Modal"

export default Modal