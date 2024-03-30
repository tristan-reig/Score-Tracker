import React, { useState } from 'react'

const RugbyField = (props) => {
  const [isHoveredHome, setIsHoveredHome] = useState(false)
  const [isHoveredAway, setIsHoveredAway] = useState(false)
  const homeNum = [3, 2, 1, 5, 4, 7, 8, 6, 10, 9, 14, 13, 12, 11, 15];
  const awayNum = [1, 2, 3, 6, 4, 8, 5, 7, 0, 11, 9, 12, 10, 13, 15, 14, 0];

  const closeHover = () => {
    setIsHoveredAway(false);
    setIsHoveredHome(false);
  }
  
  return (
    <div className="flex w-full h-[400px] border" onMouseLeave={() => closeHover()}>
      <div className="w-[10%] flex">
        <span className="flex my-auto ml-auto -rotate-90 text-5xl text-white">H</span>
      </div>
      <div className="field flex w-full">
        <div className="flex border border-y-0 w-full">
          <div className="flex w-full">
            <div className="flex w-full">
              {[1,4,2].map((value, indexO) => (
                <div key={indexO} className="grid grid-cols-1 w-full">
                  {Array.from({length: value}).map((_, indexI) => (
                    <span key={indexI} className="flex flex-col items-center m-auto text-center" onMouseOver={() => setIsHoveredHome(true)}>
                      <div className='relative'>
                        <img className="w-14" src={props.jersey1} alt=""/>
                        {isHoveredHome && <span className='absolute bg-black text-white bottom-0 w-6 h-6 rounded-full animate-duration-500 animate-spin animate-once'>{indexO === 0 ? awayNum[14] : awayNum[8 + 2 * indexI + indexO]}</span>}
                      </div>
                      <span className='text-xs font-semibold text-gray-100'>{props.player1[indexO === 0 ? awayNum[14] - 1 : awayNum[8 + 2 * indexI + indexO] - 1]}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex border border-y-0 w-full">
              <div className="flex border border-y-0 w-[60%] relative border-dashed border-2 border-l-0">
                <div className="w-full flex">
                  {[3,2].map((value, indexO) => (
                    <div key={indexO} className="grid grid-cols-1 w-full">
                      {Array.from({length: value}).map((_, indexI) => (
                        <span key={indexI} className="flex flex-col items-center m-auto text-center" onMouseOver={() => setIsHoveredHome(true)}>
                          <div className='relative'>
                            <img className="w-14" src={props.jersey1} alt=""/>
                            {isHoveredHome && <span className='absolute bg-black text-white bottom-0 w-6 h-6 rounded-full animate-duration-500 animate-spin animate-once'>{awayNum[3 + indexO + indexI * 2]}</span>}
                          </div>
                          <span className='text-xs font-semibold text-gray-100'>{props.player1[awayNum[3 + indexO + indexI * 2] - 1]}</span>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex w-[40%]">
                <div className="grid grid-cols-1 w-full mx-auto">
                  {Array.from({length: 3}).map((_, index) => (
                    <span key={index} className="flex flex-col items-center m-auto text-center" onMouseOver={() => setIsHoveredHome(true)}>
                      <div className="relative">
                        <img className="w-14" src={props.jersey1} alt="" />
                        {isHoveredHome && <span className='absolute bg-black text-white bottom-0 w-6 h-6 rounded-full animate-duration-500 animate-spin animate-once'>{awayNum[index]}</span>}
                      </div>
                      <span className='text-xs font-semibold text-gray-100'>{props.player1[awayNum[index] - 1]}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex w-full">
              <div className="flex w-[40%]">
                <div className="grid grid-cols-1 w-full mx-auto">
                  {Array.from({length: 3}).map((_, index) => (
                    <span key={index} className="flex flex-col items-center m-auto text-center" onMouseOver={() => setIsHoveredAway(true)}>
                      <div className="relative">
                        <img className="w-14" src={props.jersey2} alt="" />
                        {isHoveredAway && <span className='absolute bg-white text-black bottom-0 w-6 h-6 rounded-full animate-duration-500 animate-spin animate-once font-bold'>{homeNum[index]}</span>}
                      </div>
                      <span className='text-xs font-semibold text-gray-100'>{props.player2[homeNum[index] - 1]}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex border border-y-0 w-[60%] border-dashed border-2 border-r-0">
                <div className="flex w-full">
                  {[2,3].map((value, indexO) => (
                    <div key={indexO} className="grid grid-cols-1 w-full">
                      {Array.from({length: value}).map((_, indexI) => (
                        <span key={indexI} className="flex flex-col items-center m-auto text-center" onMouseOver={() => setIsHoveredAway(true)}>
                          <div className="relative">
                            <img className="w-14" src={props.jersey2} alt="" />
                            {isHoveredAway && <span className='absolute bg-white text-black bottom-0 w-6 h-6 rounded-full animate-duration-500 animate-spin animate-once font-bold'>{homeNum[3 + 2 * indexO + indexI]}</span>}
                          </div>
                          <span className='text-xs font-semibold text-gray-100'>{props.player2[homeNum[3 + 2 * indexO + indexI] - 1]}</span>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex w-full border border-y-0 border-r-0">
              {[2,4,1].map((value, indexO) => (
                <div key={indexO} className="grid grid-cols-1 w-full">
                  {Array.from({length: value}).map((_, indexI) => (
                    <span key={indexI} className="flex flex-col items-center m-auto text-center" onMouseOver={() => setIsHoveredAway(true)}>
                      <div className="relative">
                        <img className="w-14" src={props.jersey2} alt="" />
                        {isHoveredAway && <span className='absolute bg-white text-black bottom-0 w-6 h-6 rounded-full animate-duration-500 animate-spin animate-once font-bold'>{indexO === 2 ? homeNum[14] : homeNum[8 + 2 * indexO + indexI]}</span>}
                      </div>
                      <span className='text-xs font-semibold text-gray-100'>{props.player2[indexO === 2 ? homeNum[14] - 1 : homeNum[8 + 2 * indexO + indexI] - 1]}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[10%] flex">
        <span className="flex my-auto mr-auto -rotate-90 text-5xl text-white">H</span>
      </div>
    </div>
  )
}

export default RugbyField