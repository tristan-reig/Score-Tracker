import axios from "axios";
import { useState, useEffect } from "react"

const Bracket = () => {
  const [dataBracket, setdataBracket] = useState(null)
  const cases = [15, 19, 26, 30, 17, 21, 1, 5, 24, 28, 8, 12]
  var res = {}

  useEffect(() => {
    const fetchData = async () => {
      try {
        var response = await axios.get(`http://localhost:3001/league/10993/bracket`)
        setdataBracket(response.data.message);
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[]);

  if (!dataBracket) {
    return <div></div>
  }

  for (let i=0; i<12; i++) {
    var somme = 0
    var idTeam = dataBracket[Math.floor(i / 2)].opponents[i%2].opponent.id
    for (let j=0; j<dataBracket[Math.floor(i / 2)].games.length; j++) {
      if (idTeam == dataBracket[Math.floor(i / 2)].games[j].winner.id) {
        somme += 1
      }
    }
    res[i] = [dataBracket[Math.floor(i / 2)].opponents[i%2].opponent.name, dataBracket[Math.floor(i / 2)].opponents[i%2].opponent.image_url, somme]
  }

  return (
    <div className="grid grid-cols-4">
      {Array.from({length : 32}).map((_, index) => (
        <div
          key={index} 
          className={
            `${cases.includes(index) ? "border" : ""}
            ${[1, 8, 15, 17, 24, 26].includes(index) ? "border-b-0" : ""}
            ${[5, 12, 19, 21, 28, 30].includes(index) ? "border-t-0" : ""}
            ${[6].includes(index) ? "border-t" : ""}
            ${[7, 13, 22, 23].includes(index) ? "border-t border-r w-[50%]" : ""}
            ${[11, 25, 27].includes(index) ? "border-b border-r w-[50%]" : ""}
            ${index % 4 == 3 ? "w-80" : ""}
            h-[62.5px] flex`} 
        >
          {cases.includes(index) && (
            <span className="flex w-full m-2 items-center justify-between p-2 hover:bg-gray-700 cursor-pointer rounded-md">
              <div className="flex flex-row items-center gap-3">              
                <span>{res[cases.findIndex((element) => element === index)][0]}</span>
                <img className="w-lg h-10" src={`${res[cases.findIndex((element) => element === index)][1]}`} alt="" />
              </div>
              <span className="text-xl">{res[cases.findIndex((element) => element === index)][2]}</span>
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default Bracket