import axios from 'axios';
import { useEffect, useState } from 'react';

const Draft = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options1 = {
          method: 'GET',
          url: `https://api.pandascore.co/lol/champions?sort=name&page=1&per_page=100`,
          headers: {
            accept: 'application/json',
            authorization: 'Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes'
          }
        };
        const options2 = {
          method: 'GET',
          url: `https://api.pandascore.co/lol/champions?sort=name&page=2&per_page=100`,
          headers: {
            accept: 'application/json',
            authorization: 'Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes'
          }
        };
        const response1 = await axios.request(options1);
        const response2 = await axios.request(options2)
        setData(response1.data.concat(response2.data));
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[]);
  
  if (!data) {
    return <div className='loading loading-ring loading-lg'></div>;
  }
  
  const updateBox = (event) => {
    event.target.src = data[event.dataTransfer.getData('index')].big_image_url
    event.target.parentNode.children[0].innerHTML = data[event.dataTransfer.getData('index')].name
  }

  console.log(data)

  return (
    <div className="container-fluid">
      {Array.from({length: 2}).map((_, index1) => (
        <div key={index1} className={`w-80 h-[90vh] ${index1 === 0 ? 'float-left' : 'float-right'}`}>
        {Array.from({length : 5}).map((_, index2) => (
          <div key={index2} className='relative'>
            <span className={`absolute font-semibold bottom-0 ${index1 === 0 ? 'right-0' : 'left-0'} p-2`}></span>
            <img
              draggable='false'
              className={`border w-full h-[18vh] object-cover ${index2 === 3 && 'mt-6'}`} 
              style={{ objectPosition: `50% ${5 + Math.floor(Math.random() * 10)}%` }}
              src={index1 === 0 ? 'https://img.freepik.com/photos-premium/texture-fond-tissu-armure-large-bleu_165545-2126.jpg' : "https://e1.pxfuel.com/desktop-wallpaper/559/22/desktop-wallpaper-deep-red-backgrounds-plain-red.jpg"}
              onDragOver={(event) => event.preventDefault()} 
              onDrop={(event) => updateBox(event)}
            />
          </div>
        ))}
      </div>
      ))}
      <div className="flex flex-col justify-center items-center">
        <div className="mt-4">
          {Array.from({length : 166 / 15 }).map((_, index1) => (
            <div key={index1} className="flex flex-row">
              {Array.from({length : 15}).map((_, index2) => (
                <img 
                  draggable='true' 
                  onDragStart={(event) => event.dataTransfer.setData('index', event.target.alt)} 
                  alt={15 * index1 + index2} 
                  title={data[15 * index1 + index2].name} 
                  src={data[15 * index1 + index2].image_url} 
                  key={index2} 
                  className='w-10 h-10 m-2 cursor-pointer hover:border'
                />
              ))}
          </div>
          ))}
          {Array.from({length : 166 % 15}).map((_, index1) => (
            <div key={index1} className="flex flex-row justify-center">
              {Array.from({length : 166 % 15}).map((_, index2) => (
                <img 
                  draggable='true'
                  onDragStart={(event) => event.dataTransfer.setData('index', event.target.alt)}
                  alt={165 - 15 * index1 + index2}
                  title={data[165 - 15 * index1 + index2].name} 
                  src={data[165 - 15 * index1 + index2].image_url} 
                  key={index2} 
                  className='w-10 h-10 m-2 cursor-pointer hover:border'/>
              ))}
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Draft;
