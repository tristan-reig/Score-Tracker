import axios from "axios";
import { useState, useEffect } from "react"

const Bracket = () => {
  const [dataBracket, setdataBracket] = useState(null)
  var res = []

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            authorization: 'Bearer Cp6oCLvXNKWhRpgG-hl2J9eGviiUpGANvTOLm8_mejbH72Z3zes'
          }
        };
        options['url'] = `https://api.pandascore.co/tournaments/10993/brackets`
        var response = await axios.request(options);
        setdataBracket(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[]);

  if (!dataBracket) {
    return <div></div>
  }

  console.log(dataBracket)

  for (let i=0; i<12; i++) {
    res.push(dataBracket[i/2])
  }

  console.log(res)

  return (
    <div className="grid grid-cols-4">
      {Array.from({length : 32}).map((_, index) => (
        <div
          key={index} 
          className={
            `${[1, 5, 8, 12, 24, 28, 17, 21, 26, 30, 15, 19].includes(index) && "border"}
            ${[1, 8, 15, 17, 24, 26].includes(index) && "border-b-0"}
            ${[5, 12, 19, 21, 28, 30].includes(index) && "border-t-0"}
            ${[6].includes(index) && "border-t"}
            ${[7, 13, 22, 23].includes(index) && "border-t border-r w-[50%]"}
            ${[11, 25, 27].includes(index) && "border-b border-r w-[50%]"}
            h-[62.5px] flex`} 
          title={index}
        >
          {[1, 5, 8, 12, 24, 28, 17, 21, 26, 30, 15, 19].includes(index) && (
            <span className="flex w-full m-2 items-center justify-between p-2 hover:bg-gray-700 cursor-pointer rounded-md">
              <div className="flex flex-row items-center gap-3">              
                <span>Team GO</span>
                <img className="w-10 h-10" src="https://cdn.pandascore.co/images/team/image/131000/team_g_ologo_square.png" alt="" />
              </div>
              <span className="text-xl">2</span>
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default Bracket